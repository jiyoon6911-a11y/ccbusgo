import React, { useState } from "react";
import { ArrowLeft, Check, Calendar, HelpCircle, Edit3, MessageSquare, Trash2 } from "lucide-react";

interface MyPageViewProps {
  username: string;
  station: string;
  onLogout: () => void;
  onAnnouncementsClick: () => void;
  onBackClick?: () => void;
  onUpdateUser?: (newUsername: string) => void;
  onUpdateStation?: (newStation: string) => void;
}

export default function MyPageView({
  username,
  station,
  onLogout,
  onAnnouncementsClick,
  onBackClick,
  onUpdateUser,
  onUpdateStation
}: MyPageViewProps) {
  // Option toggles - local state with live interactive switches
  const [isAutoLogin, setIsAutoLogin] = useState(true);
  const [isBusArriveAlert, setIsBusArriveAlert] = useState(true);
  const [isCivilResultAlert, setIsCivilResultAlert] = useState(false);
  const [isAiPlaceSuggest, setIsAiPlaceSuggest] = useState(true);
  const [selectedLang, setSelectedLang] = useState("한국어");

  // Profile editing mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(username);
  const [editStation, setEditStation] = useState(station);

  // In-app FAQ/Inquiry custom modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser && editName.trim()) {
      onUpdateUser(editName.trim());
    }
    if (onUpdateStation && editStation.trim()) {
      onUpdateStation(editStation.trim());
    }
    setIsEditing(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryText("");
      setInquirySuccess(false);
      setIsInquiryOpen(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#1172E1] to-[#259DFF] text-white flex flex-col justify-between font-sans relative select-none">
      
      {/* Scrollable Container */}
      <div className="overflow-y-auto flex-1 no-scrollbar px-5 py-6 pb-24">
        
        {/* Profile Card Header Component */}
        <div className="flex flex-col items-center justify-center mt-2 mb-6">
          {/* Circular avatar - Pristine White layout placeholder directly matching the uploaded screenshot */}
          <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 border-4 border-white/20">
            {/* Visual content inside profile circle */}
            <div className="w-full h-full bg-gradient-to-tr from-sky-100 to-white flex items-center justify-center text-[#1172E1] font-black text-2xl font-mono">
              {username[0] || "김"}
            </div>
          </div>

          {!isEditing ? (
            <div className="text-center mt-4">
              <span className="text-[10px] text-white/50 tracking-wider font-extrabold uppercase block">
                사용자 명
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight leading-none mt-1 mb-3.5">
                {username}
              </h2>

              <span className="text-[10px] text-white/50 tracking-wider font-extrabold uppercase block">
                주 이용 정류장
              </span>
              <p className="text-base font-black text-white tracking-tight leading-none mt-1 mb-3.5">
                {station}
              </p>

              <button
                onClick={() => {
                  setEditName(username);
                  setEditStation(station);
                  setIsEditing(true);
                }}
                className="text-xs text-blue-100/90 hover:text-white underline cursor-pointer transition-all flex items-center gap-1 mx-auto mt-2"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>프로필 편집</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="w-full max-w-[240px] mt-4 bg-[#094aa5]/30 p-4.5 rounded-2xl border border-white/10 text-left">
              <span className="text-[10px] text-white/60 tracking-wider font-extrabold block mb-1">사용자명 수정</span>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={8}
                className="w-full bg-white text-gray-800 text-xs font-black rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 mb-3"
              />

              <span className="text-[10px] text-white/60 tracking-wider font-extrabold block mb-1">주 이용 정류소 수정</span>
              <input
                type="text"
                value={editStation}
                onChange={(e) => setEditStation(e.target.value)}
                maxLength={14}
                className="w-full bg-white text-gray-800 text-xs font-black rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-300 mb-4"
              />

              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-black cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-yellow-400 hover:bg-yellow-300 rounded-lg text-blue-900 font-black cursor-pointer"
                >
                  저장
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Timeline Progress Bar Widget Container */}
        <div className="flex flex-col mb-6">
          <div className="flex">
            <span className="bg-[#093d7c]/30 border border-white/15 px-3.5 py-1 text-[10.5px] font-extrabold text-white rounded-full tracking-tight mb-3">
              타임라인
            </span>
          </div>

          <div className="relative pt-10 pb-6">
            {/* Timeline Horizontal Line Track Background */}
            <div className="h-1 bg-white/20 rounded-full w-full relative" />
            
            {/* Connected glowing cyan indicator representing progress (70.4% representing 704km scale) */}
            <div 
              className="absolute h-1 bg-cyan-300 rounded-full left-0 top-[44px] shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300"
              style={{ width: "70.4%" }}
            />

            {/* Current progress user knob/handle positioned at 70.4% exactly */}
            <div 
              className="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-cyan-300 -mt-2 top-[44px] transform -translate-x-1/2 transition-all duration-300 cursor-grab active:cursor-grabbing z-20"
              style={{ left: "70.4%" }}
            />

            {/* Custom interactive current km indicator bubble */}
            <div 
              className="absolute -top-1 px-2.5 py-1 rounded-lg bg-cyan-300 text-blue-900 font-black text-[9.5px] leading-none transform -translate-x-1/2 shadow-md flex items-center gap-1 z-20 transition-all duration-300 hover:scale-105"
              style={{ left: "70.4%" }}
            >
              <span>704km</span>
            </div>

            {/* Timeline Ticks with Milestone Annotations */}
            <div className="absolute top-[44px] left-0 right-0 flex justify-between px-0.5 pointer-events-none">
              
              {/* Point 1: Journey Start */}
              <div className="flex flex-col items-center -translate-x-1.5">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-[9px] text-white/90 font-black text-center mt-2.5 whitespace-nowrap bg-teal-500/25 px-1 py-0.5 rounded">
                  여정의 시작
                </span>
                <span className="text-[8.5px] text-white/50 font-mono mt-0.5">2026.03.10</span>
              </div>

              {/* Point 2: 100km */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-[9px] text-white/90 font-black text-center mt-2.5 whitespace-nowrap bg-indigo-500/25 px-1 py-0.5 rounded">
                  100km 이동
                </span>
                <span className="text-[8.5px] text-white/50 font-mono mt-0.5">2026.05.10</span>
              </div>

              {/* Point 3: 500km */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-[9px] text-white/90 font-black text-center mt-2.5 whitespace-nowrap bg-sky-500/25 px-1 py-0.5 rounded">
                  500km 이동
                </span>
                <span className="text-[8.5px] text-white/50 font-mono mt-0.5">2026.05.10</span>
              </div>

              {/* Point 4: 1,000km */}
              <div className="flex flex-col items-center translate-x-1.5">
                <div className="w-1 h-1 rounded-full bg-white/40" />
                <div className="relative mt-2">
                  <span className="text-[9.5px] text-cyan-300 font-extrabold text-center block whitespace-nowrap bg-white/10 backdrop-blur-xs px-1.5 py-0.5 rounded">
                    1,000km 이동
                  </span>
                  <span className="text-[8.5px] text-yellow-300 font-black tracking-tight text-center mt-0.5 block">진행 중</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Statistics section: Cards corresponding to MyPage screenshot */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          
          {/* Box 1: Total Distance */}
          <div className="flex flex-col">
            <div className="flex">
              <span className="bg-[#093d7c]/30 border border-white/15 px-3 py-0.5 rounded-full text-[10px] font-extrabold mb-1.5">
                총 이동 거리
              </span>
            </div>
            <div className="bg-gradient-to-br from-[#126cc1] to-[#1facff] border border-white/15 rounded-2xl p-4 shadow-md flex flex-col justify-center min-h-[92px] transition-all duration-300 hover:shadow-lg">
              <span className="text-2xl font-black text-white leading-none tracking-tight">
                704km
              </span>
              <p className="text-[9.5px] text-white/80 font-bold leading-tight mt-2.5">
                유류비 5만원 이상을 절약했어요
              </p>
            </div>
          </div>

          {/* Box 2: Challenge accomplishment badges */}
          <div className="flex flex-col">
            <div className="flex">
              <span className="bg-[#093d7c]/30 border border-white/15 px-3 py-0.5 rounded-full text-[10px] font-extrabold mb-1.5">
                도전 과제
              </span>
            </div>
            <div className="bg-gradient-to-br from-[#126cc1] to-[#1facff] border border-white/15 rounded-2xl p-4 shadow-md flex flex-col items-center justify-center min-h-[92px] relative overflow-hidden transition-all duration-300 hover:shadow-lg">
              {/* Two overlapping blue fluorescent glowing circles inside graphic panel */}
              <div className="flex -space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-cyan-300/30 border border-cyan-400/50 flex items-center justify-center shadow-inner">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#1070e0]/40 border border-sky-300/50 flex items-center justify-center shadow-inner">
                  <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
                </div>
              </div>
              <span className="text-xs font-black text-white tracking-tight">
                유류 절약왕
              </span>
            </div>
          </div>

        </div>

        {/* Mid-center Logout underline action link */}
        <div className="mb-7 mt-2 text-center">
          <button
            onClick={onLogout}
            className="text-white/80 hover:text-white transition-colors duration-200 underline text-xs font-black py-1 cursor-pointer"
          >
            로그아웃
          </button>
        </div>

        {/* White Settings Box Form Component Rows from screenshot */}
        <div className="flex flex-col gap-2.5 pb-4">
          
          {/* Row 1: Language */}
          <div className="bg-white text-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-white/10 select-none">
            <span className="text-[13px] font-black tracking-tight text-gray-700">언어 설정</span>
            <span className="text-[12px] text-gray-400 font-extrabold">{selectedLang}</span>
          </div>

          {/* Row 2: Auto Login switch */}
          <div className="bg-white text-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-white/10 select-none">
            <span className="text-[13px] font-black tracking-tight text-gray-700">자동 로그인</span>
            <button
              onClick={() => setIsAutoLogin(!isAutoLogin)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all flex items-center shrink-0 cursor-pointer ${
                isAutoLogin ? "bg-[#34C759]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isAutoLogin ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Row 3: Bus Arrival Notification Switch */}
          <div className="bg-white text-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-white/10 select-none">
            <span className="text-[13px] font-black tracking-tight text-gray-700">버스 도착 알림</span>
            <button
              onClick={() => setIsBusArriveAlert(!isBusArriveAlert)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all flex items-center shrink-0 cursor-pointer ${
                isBusArriveAlert ? "bg-[#34C759]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isBusArriveAlert ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Row 4: Civil Complaint Result Alert Switch */}
          <div className="bg-white text-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-white/10 select-none">
            <span className="text-[13px] font-black tracking-tight text-gray-700">민원 처리 결과 알림</span>
            <button
              onClick={() => setIsCivilResultAlert(!isCivilResultAlert)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all flex items-center shrink-0 cursor-pointer ${
                isCivilResultAlert ? "bg-[#34C759]" : "bg-[#FF3B30] border border-red-500/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isCivilResultAlert ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Row 5: AI Place Suggest Switch */}
          <div className="bg-white text-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-white/10 select-none">
            <span className="text-[13px] font-black tracking-tight text-gray-700">통합 검색 AI 장소 추천</span>
            <button
              onClick={() => setIsAiPlaceSuggest(!isAiPlaceSuggest)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all flex items-center shrink-0 cursor-pointer ${
                isAiPlaceSuggest ? "bg-[#34C759]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  isAiPlaceSuggest ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Row 6: Inquiry button */}
          <button
            onClick={() => {
              setIsInquiryOpen(true);
            }}
            className="w-full bg-white text-gray-800 rounded-2xl px-5 py-4 shadow-sm border border-white/10 font-black text-[13px] hover:bg-sky-50 transition-colors cursor-pointer text-center"
          >
            문의하기
          </button>

        </div>

      </div>

      {/* Footer Area with Delete account links and floating back navigation element */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center pointer-events-none z-30">
        
        {/* Account Deletion action linked on the bottom-left */}
        <button
          onClick={() => {
            const ok = window.confirm("춘천 버스GO에서 정말 모든 기록을 지우고 탈퇴하시겠습니까?");
            if (ok) {
              onLogout();
            }
          }}
          className="text-[11px] text-white/50 hover:text-white underline font-semibold tracking-tight transition-all cursor-pointer pointer-events-auto"
        >
          계정 삭제 및 탈퇴
        </button>

        {/* Blue Rounded Back Navigation Button with white Left Arrow on the bottom-right */}
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="w-12 h-12 rounded-full bg-[#094aa5] hover:bg-blue-900 text-white flex items-center justify-center shadow-lg transform active:scale-95 transition-all pointer-events-auto cursor-pointer border border-white/10"
            title="홈 화면으로"
          >
            <ArrowLeft className="w-5 h-5 font-black" />
          </button>
        )}

      </div>

      {/* Inquiry modal overlay box */}
      {isInquiryOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 z-[200]">
          <div className="bg-white text-gray-800 rounded-3xl p-5 w-full max-w-[280px] shadow-2xl animate-scale-up">
            <h3 className="text-sm font-black text-gray-800 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-650" />
              <span>문의사항 접수</span>
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mb-3">전화민원 접수를 원하시면 챗봇 기능을 활용해 주세요.</p>
            
            {inquirySuccess ? (
              <div className="py-6 text-center text-xs font-bold text-emerald-600 flex flex-col items-center gap-1.5">
                <Check className="w-8 h-8 text-emerald-500 animate-bounce" />
                <span>성공적으로 접수되었습니다.</span>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit}>
                <textarea
                  value={inquiryText}
                  onChange={(e) => setEditName(e.target.value)} // Keep a standard local typing state safely
                  onInput={(e) => setInquiryText((e.target as HTMLTextAreaElement).value)}
                  placeholder="춘천 버스GO 사용 시 개선할 점이나 에러가 느껴지신 부분을 자세히 작성해주세요."
                  className="w-full h-24 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 resize-none"
                  required
                />
                
                <div className="flex gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(false)}
                    className="flex-1 py-2 bg-slate-100 text-gray-500 rounded-xl hover:bg-slate-200 cursor-pointer"
                  >
                    닫기
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                  >
                    제출 완료
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
