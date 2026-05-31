import React, { useState } from "react";
import { INITIAL_BUS_ARRIVALS } from "../data";
import { BusArrival } from "../types";
import { Star, Bus, Search, Info, SlidersHorizontal, Pin } from "lucide-react";

interface BusMoreViewProps {
  onSelectBus: (busNumber: string) => void;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  pinned: string[];
  setPinned: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BusMoreView({
  onSelectBus,
  favorites,
  setFavorites,
  pinned,
  setPinned
}: BusMoreViewProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["city", "shuttle", "highway"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? (prev.length > 1 ? prev.filter(t => t !== type) : prev)
        : [...prev, type]
    );
  };

  const toggleFavorite = (routeNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(routeNumber)
        ? prev.filter(x => x !== routeNumber)
        : [...prev, routeNumber]
    );
  };

  const togglePin = (routeNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinned(prev =>
      prev.includes(routeNumber)
        ? prev.filter(x => x !== routeNumber)
        : [routeNumber, ...prev]
    );
  };

  const getProcessedBuses = (): BusArrival[] => {
    let list = [...INITIAL_BUS_ARRIVALS];

    list = list.filter(b => selectedTypes.includes(b.type));

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        b =>
          b.routeNumber.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q)
      );
    }

    // Sort strategy: Pinned and Starred/Favorites go to the top, then by minutes Left
    return list.sort((a, b) => {
      const aPinned = pinned.includes(a.routeNumber);
      const bPinned = pinned.includes(b.routeNumber);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      const aStarred = favorites.includes(a.routeNumber);
      const bStarred = favorites.includes(b.routeNumber);
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;

      const valA = a.minutesValue ?? 9999;
      const valB = b.minutesValue ?? 9999;
      return valA - valB;
    });
  };

  const busesToShow = getProcessedBuses();

  const getCongestionStyles = (status?: string) => {
    switch (status) {
      case "smooth":
        return {
          border: "border-2 border-[#0066CC]",
          dotColor: "bg-[#0066CC]",
          glow: "shadow-[0_4px_12px_rgba(0,102,204,0.12)]"
        };
      case "normal":
        return {
          border: "border-2 border-[#FF8000]",
          dotColor: "bg-[#FF8000]",
          glow: "shadow-[0_4px_12px_rgba(255,128,0,0.12)]"
        };
      case "crowded":
      case "very_crowded":
      default:
        return {
          border: "border-2 border-[#FF0000]",
          dotColor: "bg-[#FF0000]",
          glow: "shadow-[0_4px_12px_rgba(255,0,0,0.12)]"
        };
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full p-4 overflow-y-auto no-scrollbar bg-slate-50 flex flex-col gap-4 font-sans play-enter">
      
      {/* Search and Filters Segment */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 tracking-wide uppercase">Interactive Bus Console</span>
            <h3 className="text-sm font-black text-gray-800">춘천 버스더보기 대시보드</h3>
          </div>
        </div>

        {/* Real-time search in console */}
        <div className="relative">
          <input
            type="text"
            placeholder="노선번호 또는 목적지로 신속 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-4 pr-10 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-800"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
        </div>

        {/* Bus Type Multi-Select Filters */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            버스 종류 필터 (복수 선택 가능)
          </span>
          <div className="grid grid-cols-3 gap-1.5 self-stretch">
            <button
              onClick={() => toggleType("city")}
              className={`py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10.5px] font-black border transition-all cursor-pointer ${
                selectedTypes.includes("city")
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs"
                  : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("city") ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
              시내버스
            </button>
            <button
              onClick={() => toggleType("highway")}
              className={`py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10.5px] font-black border transition-all cursor-pointer ${
                selectedTypes.includes("highway")
                  ? "bg-purple-50 text-purple-700 border-purple-300 shadow-xs"
                  : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("highway") ? "bg-purple-500 animate-pulse" : "bg-slate-300"}`} />
              시외 / 고속
            </button>
            <button
              onClick={() => toggleType("shuttle")}
              className={`py-2 px-1 flex flex-col items-center justify-center gap-1 rounded-xl text-[10.5px] font-black border transition-all cursor-pointer ${
                selectedTypes.includes("shuttle")
                  ? "bg-amber-50 text-amber-700 border-amber-300 shadow-xs"
                  : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("shuttle") ? "bg-amber-500 animate-pulse" : "bg-slate-300"}`} />
              셔틀버스
            </button>
          </div>
        </div>
      </div>

      {/* Traffic Legend Widget */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 rounded-2xl p-3 flex items-center justify-between text-[10px]">
        <span className="font-extrabold text-blue-700">혼잡도 색상 기준 안내:</span>
        <div className="flex gap-2.5">
          <span className="flex items-center gap-1 font-bold text-gray-650">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 원활 (파랑)
          </span>
          <span className="flex items-center gap-1 font-bold text-gray-650">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 보통 (오렌지)
          </span>
          <span className="flex items-center gap-1 font-bold text-gray-650">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> 혼잡 (빨강)
          </span>
        </div>
      </div>

      {/* Core Lists Section (Showing up to 14 items in a vertical list layout) */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-[10.5px] font-black text-gray-400 px-1 uppercase tracking-wider">
          실시간 운행 버스 목록
        </h4>

        {/* Vertical List Area */}
        <div className="flex flex-col gap-2">
          {busesToShow.map((bus) => {
            const isStarred = favorites.includes(bus.routeNumber);
            const isPinned = pinned.includes(bus.routeNumber);
            const isCity = bus.type === "city";
            const cong = getCongestionStyles(bus.congestion);
            
            const colorClass =
              bus.color === "blue" ? "bg-blue-500" :
              bus.color === "green" ? "bg-emerald-500" :
              bus.color === "yellow" ? "bg-amber-500 text-slate-900" : "bg-purple-600";

            return (
              <div
                key={bus.id}
                onClick={() => onSelectBus(bus.routeNumber)}
                className={`bg-white rounded-2xl p-3.5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer active:scale-[0.99] select-none border border-slate-200/80 shadow-xs`}
              >
                {/* Left Controls & Bus Badge */}
                <div className="flex items-center gap-1.5 min-w-[125px]">
                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(bus.routeNumber, e)}
                    className="text-gray-300 hover:text-yellow-500 transition-colors p-0.5"
                    title="즐겨찾기 추가"
                  >
                    <Star className={`w-4 h-4 ${isStarred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                  </button>

                  {/* Pin button */}
                  <button
                    onClick={(e) => togglePin(bus.routeNumber, e)}
                    className={`p-1 rounded-full transition-all cursor-pointer ${
                      isPinned 
                        ? "text-amber-600 bg-amber-50 hover:bg-amber-100" 
                        : "text-gray-300 hover:text-amber-500 hover:bg-gray-100"
                    }`}
                    title="상단 고정"
                  >
                    <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-amber-500 text-amber-500 rotate-45" : ""}`} />
                  </button>

                  <div className={`w-11 h-6.5 rounded-full flex items-center justify-center font-black text-white text-[11px] ml-0.5 shadow-xs ${colorClass}`}>
                    {bus.routeNumber}
                  </div>

                  {/* Congestion Circle (Only for City Buses) - Color indicator only, no text */}
                  {isCity && (
                    <span
                      className={`w-2.5 h-2.5 rounded-full border border-white shadow-xs ml-1 shrink-0 ${cong.dotColor}`}
                      title="시내버스 실시간 혼잡도"
                    />
                  )}
                </div>

                {/* Center Destination */}
                <div className="flex-1 text-center font-bold text-xs text-gray-700 px-3 truncate">
                  {bus.destination}
                </div>

                {/* Right Arrival Time */}
                <div className="text-right min-w-[65px]">
                  <span className="text-[12px] font-extrabold text-[#0066CC] antialiased">
                    {typeof bus.minutesLeft === "number" ? `${bus.minutesLeft}분 전` : bus.minutesLeft}
                  </span>
                </div>
              </div>
            );
          })}

          {busesToShow.length === 0 && (
            <div className="bg-white border w-full rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <span className="text-lg">🔍</span>
              <p className="text-xs font-bold text-gray-400 mt-2">일치하는 실시간 노선이 존재하지 않습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full text-center py-4 bg-gray-100 rounded-xl border border-dashed border-gray-250 mt-1 mb-6">
        <span className="text-[10px] text-gray-400 tracking-tight font-sans flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-gray-400" />
          <span>목록에서 노선 터치 시, 해당 시간표 및 위치도 정보가 즉시 오픈됩니다.</span>
        </span>
      </div>

    </div>
  );
}
