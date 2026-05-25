import React, { useState } from "react";
import { INITIAL_BUS_ARRIVALS, INACTIVE_BUS_ARRIVALS } from "../data";
import { MapPin, ArrowLeft, Bus, Star, Calendar, Clock, Navigation } from "lucide-react";

interface BusDetailViewProps {
  busNumber: string;
  onClose: () => void;
}

interface BusStationInfo {
  name: string;
  isCompleted: boolean;
  isActive?: boolean;
}

export default function BusDetailView({ busNumber, onClose }: BusDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"route" | "timetable">("route");
  const [direction, setDirection] = useState<"chuncheon" | "namchuncheon">("chuncheon");
  const [isStarred, setIsStarred] = useState(true);
  const [shuttleRouteIndex, setShuttleRouteIndex] = useState<1 | 2 | 3 | 4>(1);
  const [selectedShuttleTrip, setSelectedShuttleTrip] = useState<number>(0);

  const changeShuttleRoute = (idx: 1 | 2 | 3 | 4) => {
    setShuttleRouteIndex(idx);
    setSelectedShuttleTrip(0);
  };

  // Dynamic route configurations so that all routes look completely different and accurate
  const getRouteStationsForBus = (busNo: string, dir: "chuncheon" | "namchuncheon"): BusStationInfo[] => {
    let list: BusStationInfo[] = [];
    switch (busNo) {
      case "300":
        list = [
          { name: "춘천역 경춘선", isCompleted: true },
          { name: "춘천역환승센터", isCompleted: true },
          { name: "소양동행정복지센터", isCompleted: true },
          { name: "명동입구", isCompleted: true },
          { name: "강원도청", isCompleted: true },
          { name: "한림대학교 후문", isCompleted: true },
          { name: "한림대학교 정문 (현재)", isCompleted: true, isActive: true },
          { name: "동산A입구", isCompleted: false },
          { name: "동광오거리 교람", isCompleted: false },
          { name: "남춘천역 경춘선", isCompleted: false }
        ];
        break;
      case "15":
        list = [
          { name: "소양담길 시역", isCompleted: true },
          { name: "소양다리 입구", isCompleted: true },
          { name: "소양 담길 (현재)", isCompleted: true, isActive: true },
          { name: "소양초등학교", isCompleted: false },
          { name: "장학지구 입구", isCompleted: false }
        ];
        break;
      case "11":
        list = [
          { name: "후평동 종점", isCompleted: true },
          { name: "춘천소방서 (현재)", isCompleted: true, isActive: true },
          { name: "강원대 삼거리", isCompleted: false },
          { name: "남춘천역 교각아래", isCompleted: false }
        ];
        break;
      case "6":
        list = [
          { name: "춘천댐 공원", isCompleted: true },
          { name: "우두동 현대A", isCompleted: true },
          { name: "남춘천역 앞 (현재)", isCompleted: true, isActive: true },
          { name: "퇴계남부교", isCompleted: false }
        ];
        break;
      case "7-2":
        list = [
          { name: "동산A입구", isCompleted: true },
          { name: "팔호광장 교차로", isCompleted: true },
          { name: "중앙시장 사거리", isCompleted: true },
          { name: "명동 닭갈비골목", isCompleted: true },
          { name: "한림대정문 (현재)", isCompleted: true, isActive: true },
          { name: "소양동사무소", isCompleted: false },
          { name: "춘천역 종점", isCompleted: false }
        ];
        break;
      case "10-1":
        list = [
          { name: "강동교 삼거리", isCompleted: true },
          { name: "강동농협장학지점 (현재)", isCompleted: true, isActive: true },
          { name: "장학국민임대단지", isCompleted: false },
          { name: "장학초교 사거리", isCompleted: false }
        ];
        break;
      case "18":
        list = [
          { name: "동광오거리 회차", isCompleted: true },
          { name: "퇴계주공 2단지", isCompleted: true },
          { name: "남춘천역 성심삼거리 (현재)", isCompleted: true, isActive: true },
          { name: "춘천종합체육관", isCompleted: false }
        ];
        break;
      case "12":
        list = [
          { name: "터널 입구 삼거리", isCompleted: true },
          { name: "장학LH정문 (현재)", isCompleted: true, isActive: true },
          { name: "우두사거리 교량", isCompleted: false },
          { name: "사농동종점", isCompleted: false }
        ];
        break;
      case "2":
        list = [
          { name: "우두지구 공원", isCompleted: true },
          { name: "장학교차로 (현재)", isCompleted: true, isActive: true },
          { name: "춘천한방병원앞", isCompleted: false },
          { name: "강원도청 입구", isCompleted: false }
        ];
        break;
      case "10":
        list = [
          { name: "후평주공 힐스테이트", isCompleted: true },
          { name: "상공회의소 (현재)", isCompleted: true, isActive: true },
          { name: "종합운동장 입구", isCompleted: false },
          { name: "남춘천역종점", isCompleted: false }
        ];
        break;
      case "한림대셔틀":
        list = [
          { name: "남춘천역 셔틀승강장", isCompleted: true },
          { name: "춘천역 시티투어 입구", isCompleted: true },
          { name: "한림대 정문 (현재)", isCompleted: true, isActive: true },
          { name: "일송기념도서관 로터리", isCompleted: false },
          { name: "산학협력관", isCompleted: false }
        ];
        break;
      case "동서울고속":
        list = [
          { name: "춘천시외버스터미널 시점", isCompleted: true },
          { name: "설악 IC 쉼터", isCompleted: true },
          { name: "강촌 요금소 (현재)", isCompleted: true, isActive: true },
          { name: "가평 터미널 교량", isCompleted: false },
          { name: "동서울종합터미널 종점", isCompleted: false }
        ];
        break;
      case "인천공항고속":
        list = [
          { name: "춘천시외버스터미널 시점", isCompleted: true },
          { name: "인천대교 영업소 (현재)", isCompleted: true, isActive: true },
          { name: "인천국제공항 제1여객터미널", isCompleted: false },
          { name: "인천국제공항 제2여객터미널 종합", isCompleted: false }
        ];
        break;
      default:
        list = [
          { name: "춘천역 시점", isCompleted: true },
          { name: `${busNo}번 버스 거치소 (현재)`, isCompleted: true, isActive: true },
          { name: "종점 대기소", isCompleted: false }
        ];
    }

    if (dir === "namchuncheon") {
      // Reverse direction simulator
      const reversed = [...list].reverse();
      const activeIdx = reversed.findIndex(item => item.isActive);
      return reversed.map((item, index) => ({
        ...item,
        isCompleted: index <= activeIdx,
      }));
    }
    return list;
  };

  const currentStations = getRouteStationsForBus(busNumber, direction);

  // Dynamic timetable mapping based on route number
  const getTimetableForBus = (busNo: string) => {
    const isSpecial = busNo.includes("셔틀") || busNo.includes("고속");
    const intervalK = isSpecial ? "상시 30분" : "평일 15분";
    return [
      { seq: 1, dep: "06:30", arr: "07:12", interval: intervalK },
      { seq: 2, dep: "07:15", arr: "07:58", interval: intervalK },
      { seq: 3, dep: "08:00", arr: "08:45", interval: intervalK },
      { seq: 4, dep: "08:40", arr: "09:25", interval: intervalK },
      { seq: 5, dep: "09:20", arr: "10:05", interval: intervalK },
      { seq: 6, dep: "10:00", arr: "10:45", interval: intervalK },
      { seq: 7, dep: "10:40", arr: "11:25", interval: intervalK },
      { seq: 8, dep: "11:20", arr: "12:05", interval: intervalK },
      { seq: 9, dep: "12:00", arr: "12:45", interval: intervalK }
    ];
  };

  const timetable = getTimetableForBus(busNumber);

  // Identify matching destination description
  const matchedBus =
    INITIAL_BUS_ARRIVALS.find((b) => b.routeNumber === busNumber) ||
    INACTIVE_BUS_ARRIVALS.find((b) => b.routeNumber === busNumber);
  const destinationName = busNumber === "한림대셔틀"
    ? "CLC 희망터 승강장"
    : (matchedBus ? matchedBus.destination : "춘천 시외곽 노선");

  return (
    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[640px] flex flex-col pointer-events-auto z-20 font-sans animate-fade-in-up">
      
      {/* 1. Header Blue Card Block (screenshot 9) */}
      <div className="bg-[#0c70d4] text-white p-5 rounded-t-3xl relative flex flex-col items-center">
        {/* Decorative Top Accent line */}
        <div className="w-12 h-1 bg-white/20 rounded-full mb-3" />
        
        {/* Large Bus Identity Circle */}
        <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center p-1 shadow-md shrink-0 relative">
          <Bus className="w-7 h-7 text-[#0c70d4]" />
          <span className="text-[14px] font-black text-[#0c70d4] tracking-tighter leading-none -mt-0.5">{busNumber}</span>
          <button
            onClick={() => setIsStarred(!isStarred)}
            className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full text-white shadow-xs"
          >
            <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-current text-white" : "text-white/40"}`} />
          </button>
        </div>

        <h2 className="text-xl font-extrabold tracking-tight mt-3">{destinationName}</h2>
        <p className="text-xs text-blue-100 font-semibold mt-1 animate-pulse-subtle flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span>{busNumber === "한림대셔틀" ? `제${shuttleRouteIndex}노선 • 운행 상세 정보` : `${busNumber}번 시내버스 • 곧 도착 예정`}</span>
        </p>
      </div>

      {/* 2. Top Double Tabs Row: Route Info vs Timetable (screenshot 9) */}
      <div className="flex border-b border-gray-100 bg-gray-50/80">
        <button
          onClick={() => setActiveTab("route")}
          className={`w-1/2 py-3.5 text-xs font-black tracking-tight transition-all uppercase border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === "route"
              ? "text-blue-600 border-blue-600 bg-white"
              : "text-gray-400 border-transparent hover:text-gray-600"
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>노선 정보</span>
        </button>
        <button
          onClick={() => setActiveTab("timetable")}
          className={`w-1/2 py-3.5 text-xs font-black tracking-tight transition-all uppercase border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === "timetable"
              ? "text-blue-600 border-blue-600 bg-white"
              : "text-gray-400 border-transparent hover:text-gray-600"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>시간표</span>
        </button>
      </div>

      {/* 3. Sub Direction switches (screenshot 9) */}
      <div className="bg-white p-2.5 border-b border-gray-100 flex flex-col justify-center gap-1.5 md:flex-row md:items-center">
        {busNumber === "한림대셔틀" ? (
          <div className="w-full flex flex-col gap-1">
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => changeShuttleRoute(1)}
                className={`py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                  shuttleRouteIndex === 1
                    ? "bg-[#1d4ed8] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                1노선 (춘천역)
              </button>
              <button
                onClick={() => changeShuttleRoute(2)}
                className={`py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                  shuttleRouteIndex === 2
                    ? "bg-[#1d4ed8] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                2노선 (온의)
              </button>
              <button
                onClick={() => changeShuttleRoute(3)}
                className={`py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                  shuttleRouteIndex === 3
                    ? "bg-[#1d4ed8] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                3노선 (칠전)
              </button>
              <button
                onClick={() => changeShuttleRoute(4)}
                className={`py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer ${
                  shuttleRouteIndex === 4
                    ? "bg-[#1d4ed8] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                4노선 (신사우)
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2.5 justify-center w-full">
            <button
              onClick={() => setDirection("chuncheon")}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight transition-all cursor-pointer ${
                direction === "chuncheon"
                  ? "bg-[#1d4ed8] text-white shadow-xs"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              춘천역 방면
            </button>
            <button
              onClick={() => setDirection("namchuncheon")}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight transition-all cursor-pointer ${
                direction === "namchuncheon"
                  ? "bg-[#1d4ed8] text-white shadow-xs"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              남춘천역 방면
            </button>
          </div>
        )}
      </div>

      {/* 4. Scrollable Container for contents */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar bg-[#f8fafc]">
        {activeTab === "route" ? (
          /* VERTICAL ROUTE GRAPH (screenshot 9) */
          <div className="relative pl-6 py-2">
            
            {/* Timeline Vertical bar */}
            <div className="absolute top-4 bottom-4 left-2.5 w-1 bg-blue-400 rounded-full" />

            {/* Stations list nodes */}
            {currentStations.map((station, idx) => {
              const isCurrent = station.isActive;
              return (
                <div key={idx} className="relative mb-5 flex items-center gap-3.5 last:mb-0 group/node">
                  
                  {/* Circle Indicator on the timeline vector */}
                  <div
                    className={`absolute left-[-21px] w-4 h-4 rounded-full border-2 transform -translate-x-1/2 flex items-center justify-center z-10 transition-all ${
                      isCurrent
                        ? "bg-blue-600 border-white scale-125 shadow-md"
                        : station.isCompleted
                        ? "bg-blue-300 border-white"
                        : "bg-white border-blue-300"
                    }`}
                  >
                    {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  </div>

                  {/* Station Label & meta */}
                  <div
                    className={`flex-1 p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? "bg-blue-50/90 border-blue-300 shadow-xs"
                        : "bg-white border-gray-100 hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? "text-blue-800 text-[13px]" : "text-gray-700"
                        }`}
                      >
                        {station.name}
                      </span>
                      {isCurrent && (
                        <span className="bg-[#1d4ed8] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full tracking-tighter shrink-0 select-none animate-bounce">
                          현위치
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        ) : busNumber === "한림대셔틀" ? (
          /* HALLYM UNIVERSITY SHUTTLE TIMETABLE */
          <div className="flex flex-col gap-3 font-sans pb-8">
            {/* Header info card */}
            <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-800 font-extrabold text-xs">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>한림대 셔틀버스 운행 안내</span>
              </div>
              <p className="text-[10px] text-gray-500 font-bold mt-1 leading-relaxed">
                • 대학교 승하차 위치: <span className="text-blue-700 font-extrabold">CLC(희망터) 앞</span><br />
                • 승차 인원에 따라 운행대수를 탄력적으로 운영합니다.<br />
                • 1노선의 2~3회차는 많은 학생 수요로 배차 간격이 단축됩니다.
              </p>
            </div>

            {shuttleRouteIndex === 1 ? (
              /* Route 1 Table style */
              <div className="flex flex-col gap-2">
                <div className="bg-white rounded-xl p-3 border border-slate-200 flex flex-col gap-1">
                  <span className="text-[11px] font-black text-[#1d4ed8]">제1노선 (춘천역방면) 상세 시간표</span>
                  <span className="text-[9px] text-gray-400 font-bold">월~목요일과 금요일의 운행대수 현황</span>
                </div>

                <div className="overflow-hidden border rounded-xl bg-white shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-500 font-bold border-b text-[10.5px]">
                        <th className="p-2 text-center w-10">회차</th>
                        <th className="p-2">출발 시간</th>
                        <th className="p-2 text-center">월 ~ 목</th>
                        <th className="p-2 text-center">금</th>
                        <th className="p-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { seq: 1, dep: "08:05 출발", monThur: "1대", fri: "1대", note: "춘천역 출발" },
                        { seq: 2, dep: "08:25 출발", monThur: "1대", fri: "1대", note: "춘천역 출발" },
                        { seq: 3, dep: "08:30 출발", monThur: "2대", fri: "1대", note: "배차 간격 단축" },
                        { seq: 4, dep: "08:40 출발", monThur: "1대", fri: "1대", note: "춘천역 출발" },
                        { seq: 5, dep: "09:00 출발", monThur: "2대", fri: "1대", note: "춘천역 출발" },
                        { seq: 6, dep: "09:15 출발", monThur: "1대", fri: "0대", note: "금요일 미운행" },
                        { seq: 7, dep: "09:20 출발", monThur: "2대", fri: "1대", note: "춘천역 출발" },
                        { seq: 8, dep: "09:45 출발", monThur: "2대", fri: "2대", note: "춘천역 출발" },
                        { seq: 9, dep: "10:00 출발", monThur: "1대", fri: "0대", note: "금요일 미운행" },
                        { seq: 10, dep: "10:15 출발", monThur: "1대", fri: "0대", note: "금요일 미운행" },
                        { seq: 11, dep: "10:25 출발", monThur: "2대", fri: "1대", note: "춘천역 출발" },
                        { seq: 12, dep: "10:45 출발", monThur: "1대", fri: "1대", note: "춘천역 출발" },
                        { seq: 13, dep: "10:55 출발", monThur: "1대", fri: "1대", note: "춘천역 출발" },
                        { seq: 14, dep: "17:30 출발", monThur: "1대", fri: "1대", note: "대학→춘천역" },
                        { seq: 15, dep: "18:00 출발", monThur: "2대", fri: "1대", note: "대학→춘천역" },
                        { seq: 16, dep: "19:00 출발", monThur: "1대", fri: "1대", note: "대학→춘천역" },
                      ].map((row) => (
                        <tr key={row.seq} className="border-b last:border-0 hover:bg-slate-50 text-[11px] h-9">
                          <td className="p-2 text-center text-gray-400 font-bold">{row.seq}</td>
                          <td className="p-2 text-slate-800 font-extrabold">{row.dep}</td>
                          <td className="p-2 text-center text-slate-700 font-semibold">{row.monThur}</td>
                          <td className="p-2 text-center text-slate-700 font-semibold">{row.fri}</td>
                          <td className="p-2 text-slate-500 text-[10px] break-keep">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Route 2, 3, 4: Complex multi-stop routes with trip picker */
              <div className="flex flex-col gap-2.5">
                {/* Selector for Trip number */}
                <div className="flex flex-col gap-1 bg-white p-3 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-black text-[#1d4ed8]">시간표 조회할 회차 선택</span>
                  <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar">
                    {shuttleRouteIndex === 2 && [0, 1, 2, 3, 4, 5].map((idx) => {
                      const departs = ["07:40", "09:00", "10:00", "17:20", "18:20", "19:20"];
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedShuttleTrip(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                            selectedShuttleTrip === idx
                              ? "bg-blue-600 text-white"
                              : "bg-slate-50 text-gray-500 hover:bg-slate-100"
                          }`}
                        >
                          {idx + 1}회차 ({departs[idx]})
                        </button>
                      );
                    })}
                    {shuttleRouteIndex === 3 && [0, 1].map((idx) => {
                      const departs = ["08:50", "09:50"];
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedShuttleTrip(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                            selectedShuttleTrip === idx
                              ? "bg-blue-600 text-white"
                              : "bg-slate-50 text-gray-500 hover:bg-slate-100"
                          }`}
                        >
                          {idx + 1}회차 ({departs[idx]})
                        </button>
                      );
                    })}
                    {shuttleRouteIndex === 4 && [0, 1, 2, 3, 4, 5].map((idx) => {
                      const departs = ["07:20", "08:40", "09:40", "17:20", "18:30", "19:30"];
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedShuttleTrip(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                            selectedShuttleTrip === idx
                              ? "bg-blue-600 text-white"
                              : "bg-slate-50 text-gray-500 hover:bg-slate-100"
                          }`}
                        >
                          {idx + 1}회차 ({departs[idx]})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Display Station arrival timeline for selected trip */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 justify-between border-b pb-2 mb-2">
                    <span className="text-[11px] font-bold text-gray-700">각 경유 정류장 도착예정 시간</span>
                    <span className="text-[9px] bg-sky-50 border border-sky-200 text-[#0066CC] px-2 py-0.5 rounded-full font-black animate-pulse">
                      실시간 정보
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(() => {
                      let stations: string[] = [];
                      let times: string[] = [];
                      if (shuttleRouteIndex === 2) {
                        stations = [
                          "대학교 (출발)",
                          "온의 금호A",
                          "교원공제회관",
                          "KT&G 버스정류장",
                          "퇴계 우성A 버스정류장",
                          "퇴계 주공 5단지 505동앞",
                          "CGV 신협 맞은편",
                          "석사 삼익A 다리중간",
                          "교대 (버스정류장)",
                          "석사A (건너편 버스정류장)",
                          "효자성당 (버스정류장)",
                          "대학교 (CLC 종점)"
                        ];
                        const gr2 = [
                          ["07:40", "07:58", "08:00", "08:02", "08:03", "08:07", "08:10", "08:13", "08:18", "08:22", "08:25", "08:40"],
                          ["09:00", "09:13", "09:16", "09:17", "09:18", "09:21", "09:25", "09:30", "09:32", "09:34", "09:36", "09:45"],
                          ["10:00", "10:13", "10:16", "10:17", "10:18", "10:21", "10:25", "10:30", "10:32", "10:34", "10:36", "10:45"],
                          ["17:20", "17:33", "17:36", "17:37", "17:38", "17:41", "17:45", "17:50", "17:52", "17:54", "17:56", "18:05"],
                          ["18:20", "18:33", "18:36", "18:37", "18:38", "18:41", "18:45", "18:50", "18:52", "18:54", "18:56", "19:05"],
                          ["19:20", "19:33", "19:36", "19:37", "19:38", "19:41", "19:45", "19:50", "19:52", "19:54", "19:56", "20:05"]
                        ];
                        times = gr2[selectedShuttleTrip] || gr2[0];
                      } else if (shuttleRouteIndex === 3) {
                        stations = [
                          "대학교 (출발)",
                          "칠전동 (영화루 맞은편)",
                          "교원공제 회관",
                          "KT&G 버스정류장",
                          "퇴계 우성A",
                          "퇴계 주공 5단지 505동앞",
                          "교대 (버스정류장)",
                          "대학교 (CLC 종점)"
                        ];
                        const gr3 = [
                          ["08:50", "09:08", "09:14", "09:16", "09:17", "09:20", "09:27", "09:40"],
                          ["09:50", "10:08", "10:14", "10:16", "10:17", "10:20", "10:27", "10:40"]
                        ];
                        times = gr3[selectedShuttleTrip] || gr3[0];
                      } else if (shuttleRouteIndex === 4) {
                        stations = [
                          "대학교 (출발)",
                          "소양중 정문",
                          "소양 초등 건너편",
                          "명진학교 건너 버스정류장",
                          "롯데 인벤스A (정류장)",
                          "사농 우체국 위 정류장",
                          "삼운사 입구 (중간정류장)",
                          "4단지 (철물점)",
                          "세경4차A 정문",
                          "호반체육관 건너편",
                          "우석초교 건너 편의점",
                          "진흥A 후문",
                          "후평 우체국",
                          "CU 후평대로점",
                          "대학교 (CLC 종점)"
                        ];
                        const gr4 = [
                          ["07:20", "07:30", "07:35", "07:36", "07:37", "07:40", "07:45", "07:50", "07:53", "07:56", "07:58", "08:00", "08:01", "08:05", "08:30"],
                          ["08:40", "09:00", "09:05", "09:06", "09:07", "09:10", "09:15", "09:20", "09:23", "09:26", "09:28", "09:29", "09:30", "09:32", "09:40"],
                          ["09:40", "10:00", "10:05", "10:06", "10:07", "10:10", "10:15", "10:20", "10:23", "10:26", "10:28", "10:29", "10:30", "10:32", "10:40"],
                          ["17:20", "17:40", "17:45", "17:46", "17:47", "17:50", "17:55", "18:00", "18:03", "18:06", "18:08", "18:09", "18:10", "18:12", "18:20"],
                          ["18:30", "18:50", "18:55", "18:56", "18:57", "19:00", "19:05", "19:10", "19:13", "19:16", "19:18", "19:19", "19:20", "19:22", "19:30"],
                          ["19:30", "19:50", "19:55", "19:56", "19:57", "20:00", "20:05", "20:10", "20:13", "20:16", "20:18", "20:19", "20:20", "20:22", "20:30"]
                        ];
                        times = gr4[selectedShuttleTrip] || gr4[0];
                      }

                      return stations.map((st, sidx) => {
                        const arrTime = times ? times[sidx] : "--:--";
                        return (
                          <div key={sidx} className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-100 last:border-0 hover:bg-slate-50 rounded px-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                              <span className="text-xs text-gray-700 font-bold">{st}</span>
                            </div>
                            <span className="text-xs font-black text-blue-700 font-mono">{arrTime}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {shuttleRouteIndex === 2 && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-[9px] text-[#FF8000] font-bold text-center">
                    ※ 1회차는 학생 수요에 따라 월~목요일은 2대로 증차 운영됩니다.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* TIMETABLE VIEW (Alternative tab) */
          <div className="flex flex-col gap-2.5">
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center gap-2.5 mb-2">
              <Calendar className="w-4 h-4 text-[#1d4ed8]" />
              <span className="text-[11px] font-semibold text-gray-500">배차간격: 평일 15분 주말 25분 운행</span>
            </div>

            <table className="w-full text-xs font-sans text-left border-collapse bg-white rounded-xl overflow-hidden shadow-xs border">
              <thead>
                <tr className="bg-slate-100 text-slate-500 font-bold border-b">
                  <th className="p-3">순번</th>
                  <th className="p-3">기점출발</th>
                  <th className="p-3">회차예상</th>
                  <th className="p-3">운행구분</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((row) => (
                  <tr key={row.seq} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="p-3 text-gray-400 font-bold">{row.seq}</td>
                    <td className="p-3 text-slate-800 font-black">{row.dep}</td>
                    <td className="p-3 text-slate-800 font-bold">{row.arr}</td>
                    <td className="p-3 text-slate-500 text-[11px]">{row.interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Left Facing Float Back Circle Button (screenshot 9) */}
      <div className="absolute bottom-4 right-4 z-40">
        <button
          onClick={onClose}
          className="w-13 h-13 bg-[#0a5fc2] hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center border border-blue-400 cursor-pointer active:scale-95 transition-all"
          id="detailed-back-btn"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
