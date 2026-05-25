import React, { useState, useEffect } from "react";
import { Search, MapPin, Compass, ArrowLeft, Loader2, Sparkles, AlertCircle, Bus, Info } from "lucide-react";
import { PlaceRecommendation } from "../types";

interface SearchViewProps {
  onClose: () => void;
  onSelectBus?: (busNumber: string) => void;
  onSelectStation?: (stationName: string) => void;
}

interface BusRouteSearchItem {
  number: string;
  name: string;
  destination: string;
  color: string;
  type: string;
}

interface StationSearchItem {
  name: string;
  desc: string;
}

const LOCAL_BUS_ROUTES: BusRouteSearchItem[] = [
  { number: "300", name: "300번 시내버스", destination: "한림대학교 방면", color: "blue", type: "city" },
  { number: "7-2", name: "7-2번 지선버스", destination: "동산A 방면", color: "green", type: "city" },
  { number: "10-1", name: "10-1번 지선버스", destination: "강동농협장학지점 방면", color: "green", type: "city" },
  { number: "18", name: "18번 지선버스", destination: "동광오거리 방면", color: "green", type: "city" },
  { number: "12", name: "12번 지선버스", destination: "장학LH정문 방면", color: "green", type: "city" },
  { number: "2", name: "2번 지선버스", destination: "장학교차로 방면", color: "green", type: "city" },
  { number: "10", name: "10번 지선버스", destination: "상공회의소 방면", color: "green", type: "city" },
];

const LOCAL_STATIONS: StationSearchItem[] = [
  { name: "한림대학교", desc: "강원특별자치도 춘천시 한림대학길 1 (정문 앞)" },
  { name: "춘천역", desc: "강원특별자치도 춘천시 평화로 1 (경춘선 역사 앞)" },
  { name: "명동입구", desc: "강원특별자치도 춘천시 중앙로 (시청사 사거리)" },
  { name: "동산A입구", desc: "강원특별자치도 춘천시 후평동 동산아파트 앞" },
  { name: "남춘천역", desc: "강원특별자치도 춘천시 충열로 1 (철도교 교각 하부)" },
  { name: "소양동행정복지센터", desc: "강원특별자치도 춘천시 소양고개길 4-1" },
  { name: "강원도청", desc: "강원특별자치도 춘천시 중앙로 1 (도청 버스정차대)" },
];

type SearchTab = "transit" | "place";

export default function SearchView({ onClose, onSelectBus, onSelectStation }: SearchViewProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("transit");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("디저트");
  const [recommendations, setRecommendations] = useState<PlaceRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Trigger Gemini API Recommendation fetch (used for the Place tab)
  const fetchRecommendations = async (customKeyword = keyword, customCategory = category) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const resp = await fetch("/api/recommend-places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword: customKeyword || "춘천역",
          category: customCategory
        })
      });

      if (!resp.ok) {
        throw new Error("추천 목록을 받아오는데 실패했습니다.");
      }

      const data = await resp.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations([]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("추천 정보를 가져오는 중 오류가 발생했거나 원격을 활성화하는 중입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount with default tag
  useEffect(() => {
    fetchRecommendations("춘천역", "디저트");
  }, []);

  const handleTagClick = (tag: string) => {
    setCategory(tag);
    fetchRecommendations(keyword || "춘천역", tag);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "place") {
      fetchRecommendations(keyword || "춘천역", category);
    }
  };

  // Live filter for transit lists
  const getFilteredBuses = () => {
    if (!keyword.trim()) return LOCAL_BUS_ROUTES.slice(0, 4); // Default trending
    return LOCAL_BUS_ROUTES.filter(b => 
      b.number.includes(keyword) || 
      b.name.includes(keyword) || 
      b.destination.includes(keyword)
    );
  };

  const getFilteredStations = () => {
    if (!keyword.trim()) return LOCAL_STATIONS.slice(0, 4); // Default nearby
    return LOCAL_STATIONS.filter(s => s.name.toLowerCase().includes(keyword.toLowerCase()));
  };

  const filteredBuses = getFilteredBuses();
  const filteredStations = getFilteredStations();
  const hasTransitResults = filteredBuses.length > 0 || filteredStations.length > 0;

  return (
    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[640px] flex flex-col pointer-events-auto z-20 font-sans animate-fade-in-up">
      
      {/* Upper Drag Indicator Bar */}
      <div className="w-full flex items-center justify-center py-2 border-b border-gray-100">
        <div className="w-10 h-1 bg-gray-200 rounded-full" />
      </div>

      {/* Main Mode Tabs Switcher */}
      <div className="grid grid-cols-2 border-b border-gray-100 bg-slate-50/50 p-1 mx-4 mt-3 rounded-2xl">
        <button
          onClick={() => {
            setActiveTab("transit");
            setKeyword("");
          }}
          className={`py-2 px-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "transit" 
              ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          <span>버스 & 정류소 검색</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("place");
            setKeyword("");
          }}
          className={`py-2 px-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "place" 
              ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI 추천 장소 가이드</span>
        </button>
      </div>

      {/* 1. Address, Bus, Place Searching Box Layout (screenshot 12) */}
      <div className="px-4 pt-3.5 pb-2 flex flex-col gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            placeholder={
              activeTab === "transit" 
                ? "버스 노선번호(300, 7-2) 또는 정류소 검색" 
                : "장소 · 주소 · 버스 검색"
            }
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-gray-800 rounded-full py-3.5 pl-5 pr-12 text-sm font-semibold outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-400 font-sans"
            id="search-places-input"
          />
          <button
            type="submit"
            className="absolute right-3.5 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* 2. Horizontal Category Badges (Only matching the original spec for AI place recommendations) */}
        {activeTab === "place" && (
          <div className="flex gap-2 py-0.5 overflow-x-auto no-scrollbar justify-center">
            {["디저트", "데이트코스", "イ색카페", "인기맛집", "인근명소"].map((tag) => {
              // We map "イ색카페" to "이색카페" for tag matching
              const displayTag = tag === "イ색카페" ? "이색카페" : tag;
              const isSelected = category === displayTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(displayTag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight border shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#2563eb] text-white border-blue-600 shadow-sm"
                      : "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100"
                  }`}
                >
                  #{displayTag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Outer Heading Label */}
      <div className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {activeTab === "transit" ? (
            <>
              <Bus className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-extrabold text-[#1d4ed8]">실시간 버스 및 정류소 매칭</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span className="text-xs font-extrabold text-[#1d4ed8]">AI 추천 장소 가이드</span>
            </>
          )}
        </div>
        <span className="text-[10px] text-gray-400 font-medium">춘천 버스GO 검색엔진</span>
      </div>

      {/* 4. Results Section */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 no-scrollbar">
        {activeTab === "transit" ? (
          /* ================== BUS & STATION SEARCH TAB ================== */
          <div className="flex flex-col gap-4">
            {/* Bus Routes Sub-section */}
            {filteredBuses.length > 0 && (
              <div>
                <h4 className="text-[11px] font-black text-gray-400 mb-2 px-1 flex items-center gap-1">
                  <span>●</span> 춘천 시내버스 노선 ({filteredBuses.length})
                </h4>
                <div className="flex flex-col gap-2">
                  {filteredBuses.map((bus) => (
                    <div
                      key={bus.number}
                      onClick={() => onSelectBus?.(bus.number)}
                      className="bg-white border rounded-2xl p-3.5 hover:border-blue-400 shadow-xs flex items-center justify-between cursor-pointer active:scale-99 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-6 rounded-full flex items-center justify-center text-[10.5px] font-black text-white ${
                          bus.color === "blue" ? "bg-blue-500" : "bg-emerald-500"
                        }`}>
                          {bus.number}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-800">{bus.name}</span>
                          <span className="text-[10px] text-gray-450 mt-0.5">{bus.destination}</span>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        노선상세 정보 ▶
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stations Sub-section */}
            {filteredStations.length > 0 && (
              <div className="mt-2">
                <h4 className="text-[11px] font-black text-gray-400 mb-2 px-1 flex items-center gap-1">
                  <span>●</span> 추천 정류소 검색 결과 ({filteredStations.length})
                </h4>
                <div className="flex flex-col gap-2">
                  {filteredStations.map((station) => (
                    <div
                      key={station.name}
                      onClick={() => onSelectStation?.(station.name)}
                      className="bg-white border rounded-2xl p-3.5 hover:border-blue-400 shadow-xs flex items-center justify-between cursor-pointer active:scale-99 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-800">{station.name} 정류장</span>
                          <span className="text-[10px] text-gray-450 mt-0.5">{station.desc}</span>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        위치조회 🧭
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasTransitResults && (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 py-16">
                <Compass className="w-8 h-8 text-gray-300 mb-2 animate-bounce-subtle" />
                <p className="text-xs font-bold">"${keyword}" 관련 매칭 결과가 존재하지 않습니다.</p>
                <p className="text-[10px] text-gray-350 text-center mt-1">
                  노선번호(예: 300, 7-2)나 한림대학교, 춘천역 등<br />접촉하고 싶은 키워드를 다시 한 번 입력해 주세요.
                </p>
              </div>
            )}

            <div className="w-full text-center py-3 bg-gray-50 rounded-xl mt-2 border border-dashed border-gray-250">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1 font-sans">
                <Info className="w-3.5 h-3.5 text-gray-300" />
                <span>시내버스 노선 및 정류소를 터치 시 홈지도로 즉시 포커싱 연동됩니다.</span>
              </span>
            </div>
          </div>
        ) : (
          /* ================== AI RECO_SYSTEM PLACE TAB ================== */
          <div>
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-xs text-gray-500 font-bold mt-3 animate-pulse-subtle">
                  Gemini AI 가 최고의 추천 명소를 엄선하는 중입니다...
                </p>
              </div>
            ) : errorMsg ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs flex flex-col items-center text-center mt-6">
                <AlertCircle className="w-6 h-6 text-rose-500 mb-2" />
                <p className="font-bold">{errorMsg}</p>
                <p className="text-gray-400 text-[10px] mt-1">네트워크 환경이나 API Key 설정상태를 확인해주세요.</p>
                <button
                  type="button"
                  onClick={() => fetchRecommendations()}
                  className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700"
                >
                  재시도
                </button>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 py-12">
                <Compass className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-xs font-bold">"${keyword}" 관련 장소 검색 결과가 비어있습니다.</p>
                <p className="text-[10px] text-gray-300">검색창에 역이나 주소명을 올바르게 적고 돋보기 단추를 눌러주세요.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recommendations.map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-white border rounded-2xl p-4 hover:border-blue-400 hover:shadow-md transition-all flex flex-col gap-2 relative group"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-sm font-black text-gray-900 leading-tight tracking-tight group-hover:text-blue-600 group-hover:underline">
                        {place.name}
                      </span>
                      <span className="text-[11px] font-black shrink-0 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {place.distance}
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-gray-400 font-medium tracking-tight flex items-center gap-1 mt-0.5 animate-pulse-subtle">
                      <MapPin className="w-3.5 h-3.5 text-gray-450 shrink-0" />
                      <span>{place.address}</span>
                    </p>

                    <div className="border-t border-gray-100 pt-2.5 mt-1">
                      <p className="text-xs text-gray-650 leading-relaxed font-sans mt-0.5">
                        {place.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Left Facing Float Back Circle Button (screenshot 12) */}
      <div className="absolute bottom-4 right-4 z-40">
        <button
          onClick={onClose}
          className="w-13 h-13 bg-[#0a5fc2] hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center border border-blue-400 cursor-pointer active:scale-95 transition-all"
          id="search-back-btn"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
