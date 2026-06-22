import React, { useState } from "react";
import { INITIAL_BUS_ARRIVALS, INACTIVE_BUS_ARRIVALS, SHUTTLE_BUS_ARRIVALS, HIGHWAY_BUS_ARRIVALS } from "../data";
import { BusArrival } from "../types";
import { MapPin, Search, Star, CloudSun, CloudRain, ChevronUp, ChevronDown, Check, Info, Bus, Pin, AlertTriangle } from "lucide-react";

interface MainMapViewProps {
  onSelectBus: (busNumber: string) => void;
  onSearchOpen: () => void;
  currentStation: string;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  pinned: string[];
  setPinned: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MainMapView({
  onSelectBus,
  onSearchOpen,
  currentStation,
  favorites,
  setFavorites,
  pinned,
  setPinned
}: MainMapViewProps) {
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["city"]);
  const [weatherMode, setWeatherMode] = useState<"sunny" | "extreme">("sunny");
  const [showHapticToast, setShowHapticToast] = useState(false);

  const toggleWeather = () => {
    const nextMode = weatherMode === "sunny" ? "extreme" : "sunny";
    setWeatherMode(nextMode);
    if (nextMode === "extreme") {
      // Short and strong double haptic burst (200ms on, 100ms gap, 200ms on)
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      setShowHapticToast(true);
      setTimeout(() => {
        setShowHapticToast(false);
      }, 3500);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinned(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [id, ...prev]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Helper mapping 3-stage congestion with custom borders, glows and color codes from user guidelines
  const getCongestionStyles = (status?: string) => {
    switch (status) {
      case "smooth":
        return {
          border: "border-2 border-[#0066CC]",
          glow: "shadow-[0_4px_16px_rgba(0,102,204,0.18)]",
          bgColor: "bg-blue-50/50",
          text: "text-[#0066CC]",
          dotColor: "bg-[#0066CC]"
        };
      case "normal":
        return {
          border: "border-2 border-[#FF8000]",
          glow: "shadow-[0_4px_16px_rgba(255,128,0,0.18)]",
          bgColor: "bg-amber-50/50",
          text: "text-[#FF8000]",
          dotColor: "bg-[#FF8000]"
        };
      case "crowded":
      case "very_crowded":
      default:
        return {
          border: "border-2 border-[#FF0000]",
          glow: "shadow-[0_4px_16px_rgba(255,0,0,0.18)]",
          bgColor: "bg-rose-50/50",
          text: "text-[#FF0000]",
          dotColor: "bg-[#FF0000]"
        };
    }
  };

  // Compile top active/pinned buses dynamically as requested
  // "자주타는 버스를 표시하고 고정하면 위에 뜨는거임! 없으면 기본 300, 2"
  // 최대 2개까지 고정하도록 제안되었으며, 상단 카드에 최대 2개 노출합니다.
  const activeTopBuses = [...pinned].slice(0, 2);
  if (activeTopBuses.length === 0) {
    // 핀 고정이 없으면 기본 fallback 버스 노출
    activeTopBuses.push("300", "2");
  } else if (activeTopBuses.length === 1) {
    // 핀 고정이 1개만 있으면 2 또는 300으로 보조 fallback 1개 노출 (총 2개 수준 맞추기)
    const fallback = activeTopBuses[0] === "2" ? "300" : "2";
    activeTopBuses.push(fallback);
  }

  const getBusObj = (num: string): BusArrival => {
    return (
      INITIAL_BUS_ARRIVALS.find(b => b.routeNumber === num) || {
        id: num,
        routeNumber: num,
        destination: num === "한림대셔틀" ? "CLC 희망터" : "춘천역방면",
        minutesLeft: "운행정보 없음",
        minutesValue: 9999,
        congestion: "smooth",
        type: "city",
        color: "green"
      }
    );
  };

  // General listing showing only favorited buses of selected types
  const getBuses = (): BusArrival[] => {
    const list = INITIAL_BUS_ARRIVALS.filter(
      b => favorites.includes(b.routeNumber) && selectedTypes.includes(b.type)
    );
    return list.sort((a, b) => {
      const aPinned = pinned.includes(a.routeNumber);
      const bPinned = pinned.includes(b.routeNumber);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      const valA = a.minutesValue ?? 9999;
      const valB = b.minutesValue ?? 9999;
      return valA - valB;
    });
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none z-10 font-sans">
      
      {/* ⚠️ High-urgency alert banner: Spawns at the absolute top of the 0-Depth 메인 대시보드 upon weather degradation */}
      {weatherMode === "extreme" && (
        <div className="absolute top-4 left-4 right-4 pointer-events-auto z-50 animate-bounce" style={{ animationDuration: "1.2s" }}>
          <div className="bg-red-600 border border-red-500 text-white rounded-2xl p-3 shadow-2xl flex items-start gap-2.5 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-700/25 animate-pulse" />
            <AlertTriangle className="w-5 h-5 text-white shrink-0 mt-0.5 animate-pulse z-10" />
            <div className="flex-1 space-y-0.5 z-10">
              <div className="flex items-center gap-1.5">
                <span className="text-[9.5px] font-black uppercase bg-red-800 text-red-100 px-1.5 py-0.5 rounded tracking-wide">기상정체 경고</span>
                <span className="text-[9px] font-bold text-red-200">배차 교차 보정 지연율 +42.4%</span>
              </div>
              <p className="text-[11.5px] font-extrabold tracking-tight leading-snug mt-1 text-white">
                춘천 집중호우로 인해 시내·대학로 구간 연착이 누적되었습니다.
              </p>
              <p className="text-[10px] text-red-100/95 leading-none mt-1">
                ※ 타임어택 보정이 적용되었습니다. 방 안에서 따뜻하게 대기하다 출발하세요!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 📳 Simulated haptic vibration on-screen pulse notification */}
      {showHapticToast && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fade-in">
          <div className="bg-slate-900/95 border border-slate-800 text-slate-100 text-[10px] font-black font-sans px-3 py-2 rounded-xl shadow-xl flex items-center gap-1.5 backdrop-blur-xs">
            <span className="animate-ping text-rose-500">●</span>
            <span>📳 [스마트폰 햅틱 진동 피드백 작동 완료]</span>
          </div>
        </div>
      )}

      {/* 1. Left Weather Float Button (screenshot 2) - Clickable to toggle real-time delay delay rate */}
      <div className="absolute bottom-[350px] left-4 pointer-events-auto flex flex-col items-center gap-1.5 z-10">
        <button
          onClick={toggleWeather}
          className={`w-13 h-13 rounded-full shadow-lg flex flex-col justify-center items-center text-white border transition-all cursor-pointer text-center ${
            weatherMode === "extreme"
              ? "bg-red-600 border-red-400 hover:bg-red-700 animate-pulse"
              : "bg-[#127be5] border-blue-400 hover:bg-blue-600 active:scale-95"
          }`}
          title="날씨/실시간 기상 지연 보정 시뮬레이터 (클릭)"
        >
          {weatherMode === "extreme" ? (
            <CloudRain className="w-5 h-5 animate-bounce" />
          ) : (
            <CloudSun className="w-5 h-5" />
          )}
          <span className="text-[9px] font-black mt-0.5">
            {weatherMode === "extreme" ? "7°C 폭우" : "20°C 맑음"}
          </span>
        </button>
      </div>

      {/* 2. Right Floating Search magnifying glass Button (screenshot 2) */}
      <div className="absolute bottom-[350px] right-4 pointer-events-auto z-10">
        <button
          onClick={onSearchOpen}
          className="w-13 h-13 bg-[#0a5fc2] hover:bg-[#074ea3] active:scale-95 text-white rounded-full shadow-xl flex items-center justify-center border border-blue-500 transition-all cursor-pointer"
          id="floating-search-btn"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* 3. Bottom Information Sheet Container */}
      <div
        className={`w-full bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 pointer-events-auto transition-all duration-300 ease-in-out flex flex-col ${
          isSheetExpanded ? "h-[390px]" : "h-[195px]"
        }`}
        id="bottom-arrival-sheet"
      >
        {/* Toggle Bar Area */}
        <div
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          className="w-full flex flex-col items-center py-2.5 cursor-pointer hover:bg-slate-50 border-b border-gray-100 rounded-t-3xl"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          <div className="flex items-center gap-1 mt-1 text-gray-400">
            {isSheetExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            <span className="text-[10px] uppercase font-bold tracking-wider">
              {currentStation} 버스 도착 정보 {isSheetExpanded ? "접기" : "열기"}
            </span>
          </div>
        </div>

        {/* Scrollable Container inside sheet */}
        <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
          
          {/* Quick Real-Time Highlight Info (Always Visible cards - Horizontal Stack layout from user image) */}
          <div className="flex flex-col gap-2.5 mb-3 select-none">
            {activeTopBuses.map((busNum, idx) => {
              const bus = getBusObj(busNum);
              const isCity = bus.type === "city";
              const cong = getCongestionStyles(bus.congestion);
              const isStarredInTop = favorites.includes(bus.routeNumber);
              const isPinnedInTop = pinned.includes(bus.routeNumber);
              
              // Color styles matching the types:
              const colorClass = bus.color === "blue" ? "text-blue-500" :
                                 bus.color === "green" ? "text-emerald-500" :
                                 bus.color === "yellow" ? "text-amber-500" : "text-purple-500";
              const borderGlow = isCity
                ? `${cong.border} ${cong.glow}`
                : "border border-gray-200 shadow-sm";

              return (
                <div
                  key={`top-card-${idx}`}
                  onClick={() => onSelectBus(bus.routeNumber)}
                  className={`bg-white rounded-2xl py-2 px-3 flex items-center justify-between hover:bg-slate-50 active:scale-99 transition-all cursor-pointer relative overflow-hidden ${
                    weatherMode === "extreme" ? "bg-red-50/20 border-red-200" : ""
                  } ${borderGlow}`}
                >
                  {/* Left Controls & Bus Badge */}
                  <div className="flex items-center gap-1.5 min-w-[125px]">
                    {/* Favorite button */}
                    <button
                      onClick={(e) => toggleFavorite(bus.routeNumber, e)}
                      className="text-gray-300 hover:text-yellow-500 transition-colors p-0.5"
                      title="즐겨찾기 추가/해제"
                    >
                      <Star className={`w-4 h-4 ${isStarredInTop ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </button>

                    {/* Pin button */}
                    <button
                      onClick={(e) => togglePin(bus.routeNumber, e)}
                      className={`p-1 rounded-full transition-all cursor-pointer ${
                        isPinnedInTop 
                          ? "text-amber-600 bg-amber-50 hover:bg-amber-100" 
                          : "text-gray-300 hover:text-amber-500 hover:bg-gray-100"
                      }`}
                      title="상단 고정 해제"
                    >
                      <Pin className={`w-3.5 h-3.5 ${isPinnedInTop ? "fill-amber-500 text-amber-500 rotate-45" : ""}`} />
                    </button>

                    <div className="flex items-center gap-1 ml-0.5">
                      <Bus className={`w-4 h-4 ${colorClass}`} />
                      <span className={`text-[13px] font-black tracking-tight ${colorClass}`}>
                        {bus.routeNumber}
                      </span>
                    </div>

                    {/* Congestion Circle for City Buses */}
                    {isCity && (
                      <span
                        className={`w-2.5 h-2.5 rounded-full border border-white shadow-xs ml-1 shrink-0 ${cong.dotColor}`}
                        title="시내버스 실시간 혼잡도"
                      />
                    )}
                  </div>

                  {/* Center: destination name */}
                  <div className="flex-1 text-center text-xs font-bold text-slate-800 px-2 truncate">
                    {bus.destination}
                  </div>

                  {/* Right: remaining time in standard blue as requested */}
                  <div className="text-right min-w-[65px]">
                    {typeof bus.minutesLeft === "number" ? (
                      <div className="flex flex-col items-end">
                        <span className={`text-xs font-black animate-pulse-subtle ${weatherMode === "extreme" ? "text-red-600" : "text-[#0066CC]"}`}>
                          {weatherMode === "extreme" ? `${bus.minutesLeft + 5}분 전` : `${bus.minutesLeft}분 전`}
                        </span>
                        {weatherMode === "extreme" && (
                          <span className="text-[8px] font-black text-red-500 tracking-tight leading-none mt-0.5 animate-pulse">지연보정 +5분</span>
                        )}
                      </div>
                    ) : (
                      <span className={`text-xs font-extrabold ${weatherMode === "extreme" ? "text-red-500" : "text-[#0066CC]"} animate-pulse-subtle`}>
                        {bus.minutesLeft}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conditional detailed listings */}
          {isSheetExpanded && (
            <div className="animate-fade-in-up mt-2">
              
              {/* Bus Type Multi-Select Filters */}
              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-100 rounded-2xl p-2.5 mb-3 select-none">
                <span className="text-[10px] font-black text-slate-500 shrink-0">운행 구분 필터</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleTypeFilter("city")}
                    className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-[10.5px] font-extrabold transition-all border shadow-xs cursor-pointer ${
                      selectedTypes.includes("city")
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("city") ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                    시내버스
                  </button>
                  <button
                    onClick={() => toggleTypeFilter("shuttle")}
                    className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-[10.5px] font-extrabold transition-all border shadow-xs cursor-pointer ${
                      selectedTypes.includes("shuttle")
                        ? "bg-amber-50 text-amber-700 border-amber-300"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("shuttle") ? "bg-amber-500 animate-pulse" : "bg-slate-300"}`} />
                    셔틀버스
                  </button>
                  <button
                    onClick={() => toggleTypeFilter("highway")}
                    className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-[10.5px] font-extrabold transition-all border shadow-xs cursor-pointer ${
                      selectedTypes.includes("highway")
                        ? "bg-purple-50 text-purple-700 border-purple-300"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedTypes.includes("highway") ? "bg-purple-500 animate-pulse" : "bg-slate-300"}`} />
                    고속버스
                  </button>
                </div>
              </div>
              
              {/* Table labels & filters */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-b pb-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span>노선 번호</span>
                </div>
                <span>인접 정류장 위치 및 혼잡도</span>
                <span>현 정류소까지 남은 시간</span>
              </div>

              {/* General Bus List */}
              <div className="flex flex-col">
                {getBuses().map((bus) => {
                  const isStarred = favorites.includes(bus.routeNumber);
                  const isPinned = pinned.includes(bus.routeNumber);
                  const cStyles = getCongestionStyles(bus.congestion);
                  return (
                    <div
                      key={bus.id}
                      onClick={() => onSelectBus(bus.routeNumber)}
                      className="flex items-center justify-between py-3.5 border-b border-gray-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      {/* Left Block */}
                      <div className="flex items-center gap-1.5 min-w-[125px]">
                        {/* Star/Favorite Button (floating on map) */}
                        <button
                          onClick={(e) => toggleFavorite(bus.routeNumber, e)}
                          className="text-gray-300 hover:text-yellow-500 transition-colors p-0.5"
                          title="즐겨찾기 (지도 표시)"
                        >
                          <Star className={`w-4 h-4 ${isStarred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                        </button>

                        {/* Pin Button (pin to top cards) */}
                        <button
                          onClick={(e) => togglePin(bus.routeNumber, e)}
                          className={`p-1 rounded-full transition-all cursor-pointer ${
                            isPinned 
                              ? "text-amber-600 bg-amber-50 hover:bg-amber-100" 
                              : "text-gray-300 hover:text-amber-500 hover:bg-gray-100"
                          }`}
                          title="상단 고정 (자주타는 버스)"
                        >
                          <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-amber-500 text-amber-500 rotate-45" : ""}`} />
                        </button>
                        
                        {/* Bus Badge circle */}
                        <div
                          className={`w-11 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white ml-0.5 ${
                            bus.color === "blue" ? "bg-blue-500" :
                            bus.color === "green" ? "bg-emerald-500" :
                            bus.color === "yellow" ? "bg-amber-500 text-gray-950" :
                            bus.color === "purple" ? "bg-purple-500" : "bg-gray-400"
                          }`}
                        >
                          {bus.routeNumber}
                        </div>

                        {/* Congestion indicator (Only for City Buses) - Just color, no text */}
                        {bus.type === "city" && (
                          <span
                            className={`w-2.5 h-2.5 rounded-full border border-white shadow-xs ml-1 shrink-0 ${cStyles.dotColor}`}
                            title="시내버스 혼잡도"
                          />
                        )}
                      </div>

                      {/* Middle Station block */}
                      <div className="flex-1 text-center pr-3 flex flex-col items-center">
                        <span className="text-xs text-slate-700 font-bold tracking-tight">{bus.destination}</span>
                      </div>

                      {/* Right minutes left block */}
                      <div className="text-right min-w-[70px]">
                        {typeof bus.minutesLeft === "number" ? (
                          <div className="flex flex-col items-end">
                            <span className={`text-xs font-black ${weatherMode === "extreme" ? "text-red-600 font-extrabold" : "text-blue-500"}`}>
                              {weatherMode === "extreme" ? `${bus.minutesLeft + 5}분` : `${bus.minutesLeft}분`}
                            </span>
                            {weatherMode === "extreme" && (
                              <span className="text-[7.5px] font-black leading-none text-red-500 mt-0.5 animate-pulse">지연+5m</span>
                            )}
                          </div>
                        ) : (
                          <span
                            className={`text-xs font-extrabold ${
                              bus.minutesLeft === "곧 도착"
                                ? "text-red-500 animate-pulse-subtle"
                                : bus.minutesLeft === "운행정보 없음"
                                ? "text-gray-400 font-normal"
                                : "text-purple-600"
                            }`}
                          >
                            {bus.minutesLeft === "곧 도착" && weatherMode === "extreme" ? "곧도착(정체)" : bus.minutesLeft}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {getBuses().length === 0 && (
                  <div className="py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-xs font-bold text-slate-400 flex flex-col items-center justify-center gap-1.5 mt-2">
                    <span>⭐</span>
                    <span>즐겨찾기한 버스가 없습니다.</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      우측 하단 [더보기]에서 노선을 검색하고 즐겨찾기를 추가해보세요.
                    </span>
                  </div>
                )}
              </div>

              {/* End status footnote */}
              <div className="w-full text-center py-4 bg-gray-50 rounded-xl mt-3 border border-dashed border-gray-200">
                <span className="text-[10px] text-gray-400 tracking-tight font-sans flex items-center justify-center gap-1">
                  <Info className="w-3.5 h-3.5 text-gray-300" />
                  <span>실시간 데이터는 춘천시 대중교통 BIS와 연계하여 제공됩니다.</span>
                </span>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
