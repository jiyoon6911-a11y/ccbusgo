import React, { useState, useRef } from "react";
import { Compass, ZoomIn, ZoomOut, Navigation } from "lucide-react";

interface FakeMapProps {
  onSelectStation?: (stationName: string) => void;
  selectedStation?: string;
  favorites?: string[];
}

// Preset mapping coordinates for active favorited buses on the simulated map
const busMapPositions: { [key: string]: { x: number; y: number; colorHex: string } } = {
  "300": { x: 500, y: 440, colorHex: "bg-blue-600" },
  "15": { x: 450, y: 320, colorHex: "bg-emerald-600" },
  "11": { x: 340, y: 640, colorHex: "bg-emerald-600" },
  "6": { x: 620, y: 580, colorHex: "bg-emerald-600" },
  "7-2": { x: 670, y: 410, colorHex: "bg-emerald-600" },
  "10-1": { x: 740, y: 250, colorHex: "bg-emerald-600" },
  "18": { x: 830, y: 480, colorHex: "bg-emerald-600" },
  "12": { x: 320, y: 680, colorHex: "bg-emerald-600" },
  "2": { x: 380, y: 560, colorHex: "bg-emerald-600" },
  "10": { x: 480, y: 380, colorHex: "bg-emerald-600" },
  "한림대셔틀": { x: 540, y: 480, colorHex: "bg-amber-500" },
  "동서울고속": { x: 300, y: 720, colorHex: "bg-purple-600" },
  "인천공항고속": { x: 380, y: 760, colorHex: "bg-purple-600" },
};

export default function FakeMap({ onSelectStation, selectedStation, favorites = [] }: FakeMapProps) {
  // Setup minor dragging state to simulate genuine maps
  const [offset, setOffset] = useState({ x: -250, y: -290 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y
    });
  };

  // Preset stations matching user UI
  const landmarks = [
    { name: "한림대학교", x: 600, y: 380, isStation: true },
    { name: "생사학연구소", x: 580, y: 550, isStation: false },
    { name: "한림레크리에이션센터", x: 620, y: 450, isStation: false },
    { name: "일송기념도서관", x: 400, y: 350, isStation: false },
    { name: "춘천시외버스터미널1", x: 300, y: 780, isStation: true },
    { name: "의학관 정문", x: 340, y: 220, isStation: false },
    { name: "하늘천 온누리약국", x: 590, y: 640, isStation: true },
    { name: "세종약국 사거리", x: 350, y: 720, isStation: true },
    { name: "강동농협장학지점", x: 800, y: 200, isStation: true },
    { name: "동광오거리 정차장", x: 920, y: 500, isStation: true }
  ];

  return (
    <div
      className="absolute inset-0 bg-[#eef1f4] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
      id="map-container"
    >
      {/* Dynamic Grid Background with streets */}
      <div
        className="absolute w-[1800px] h-[1800px] transition-transform duration-75 ease-out origin-center"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`
        }}
      >
        {/* River */}
        <div className="absolute top-[20px] left-[10px] w-[500px] h-[180px] bg-[#96cee8] opacity-70 rounded-full blur-md transform -rotate-12" />
        
        {/* Street Lines */}
        <div className="absolute top-[350px] left-0 right-0 h-[50px] bg-[#f8f9fa] border-y border-gray-300 opacity-90 transform -rotate-6 flex items-center justify-around">
          <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">석사로</span>
        </div>
        <div className="absolute top-[600px] left-0 right-0 h-[65px] bg-[#f8f9fa] border-y border-gray-300 opacity-90 transform rotate-2 flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-semibold tracking-wider">삭주로 (한림대병원 삼거리)</span>
        </div>
        <div className="absolute top-0 bottom-0 left-[550px] w-[60px] bg-[#f8f9fa] border-x border-gray-300 opacity-90 flex flex-col justify-around items-center">
          <span className="text-[10px] text-gray-400 font-bold transform -rotate-90">한림 대학길</span>
        </div>

        {/* Outer green field (Hallym Campus Forest) */}
        <div className="absolute top-[180px] left-[650px] w-[450px] h-[350px] bg-[#e2f0d9] border border-[#c5e0b4] rounded-3xl opacity-80" />
        
        {/* Buildings blocks / Parking spaces matching UI screenshots */}
        <div className="absolute top-[320px] left-[700px] w-[180px] h-[70px] bg-[#e9ebef] border border-gray-300 rounded flex items-center justify-center shadow-xs">
          <span className="text-xs text-gray-500 font-medium font-sans">한림대학교 IT관</span>
        </div>
        <div className="absolute top-[420px] left-[720px] w-[150px] h-[80px] bg-[#e9ebef] border border-gray-300 rounded flex items-center justify-center shadow-xs">
          <span className="text-xs text-gray-500 font-medium text-center">한림레크리에이션센터</span>
        </div>
        <div className="absolute top-[280px] left-[420px] w-[120px] h-[80px] bg-[#f2e7e7] border border-[#dcb3b3] rounded-lg flex items-center justify-center shadow-xs">
          <span className="text-xs text-[#b85b5b] font-medium text-center">의학관</span>
        </div>
        <div className="absolute top-[510px] left-[520px] w-[120px] h-[55px] bg-[#fbfbfb] border border-[#cbd5e1] rounded-lg flex items-center justify-center shadow-xs">
          <span className="text-[11px] text-gray-500 font-medium text-center">생사학연구소</span>
        </div>
        <div className="absolute top-[260px] left-[840px] w-[110px] h-[65px] bg-[#f5f8fc] border border-blue-200 rounded-lg flex flex-col items-center justify-center shadow-xs">
          <span className="text-[10px] text-blue-500 font-semibold">주차장 2</span>
          <span className="text-[9px] text-gray-400">P (한림대 교직원)</span>
        </div>

        {/* Render Map Landmarks & Pinpoint Targets */}
        {landmarks.map((landmark, idx) => {
          const isSelected = selectedStation === landmark.name;
          return (
            <div
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
              style={{ left: landmark.x, top: landmark.y }}
              onClick={(e) => {
                e.stopPropagation();
                if (landmark.isStation && onSelectStation) {
                  onSelectStation(landmark.name);
                }
              }}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-md border font-sans text-[11px] font-bold transition-all duration-200 ${
                  isSelected
                    ? "bg-[#1d4ed8] text-white border-blue-700 scale-110 z-20"
                    : landmark.isStation
                    ? "bg-white text-gray-700 border-blue-400 group-hover:bg-blue-50"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                {landmark.isStation && (
                  <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-blue-500"}`} />
                )}
                <span>{landmark.name}</span>
              </div>
              
              {/* Little anchor pointer */}
              <div
                className={`w-2 h-2 rotate-45 -mt-1 shadow-sm ${
                  isSelected ? "bg-blue-700" : landmark.isStation ? "bg-white border-r border-b border-gray-200" : "bg-gray-100"
                }`}
              />
            </div>
          );
        })}

        {/* Dynamic Starred (Favorited) Buses Floating on Map */}
        {favorites.map((busNum) => {
          const pos = busMapPositions[busNum];
          if (!pos) return null;
          return (
            <div
              key={`starred-bus-${busNum}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all select-none pointer-events-none"
              style={{ left: pos.x, top: pos.y }}
            >
              {/* Downgraded to a simple informational plain text label to avoid mistouch/affordance errors */}
              <div className="flex items-center gap-1 font-sans text-[10px] font-bold text-slate-700">
                <span className="text-amber-500">★</span>
                <span className="text-slate-800 font-extrabold">{busNum}</span>
                <span className="text-slate-500 text-[9px] font-normal">(운행중)</span>
              </div>
            </div>
          );
        })}

      </div>

      {/* Map Interactive HUD controls */}
      <div className="absolute top-26 right-4 flex flex-col gap-2 z-10" id="map-controls">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={() => setOffset({ x: -250, y: -290 })}
          className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>


    </div>
  );
}
