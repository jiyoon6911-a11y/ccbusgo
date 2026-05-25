import React, { useState } from "react";
import { User, Settings, Bell, RefreshCw, LogOut, ChevronRight, Inbox, Milestone, ExternalLink } from "lucide-react";

interface MyPageViewProps {
  username: string;
  station: string;
  onLogout: () => void;
  onAnnouncementsClick: () => void;
}

export default function MyPageView({ username, station, onLogout, onAnnouncementsClick }: MyPageViewProps) {
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  
  return (
    <div className="w-full h-full bg-slate-50 flex flex-col justify-between font-sans relative">
      <div className="overflow-y-auto flex-1 no-scrollbar">
        
        {/* 1. Profile banner gradient block (screenshot 17) */}
        <div className="bg-gradient-to-r from-[#0c70d4] to-blue-500 text-white p-6 pb-8 rounded-b-[32px] shadow-md relative overflow-hidden select-none shrink-0">
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-4.5 mt-2">
            {/* Custom human avatar profile icon */}
            <div className="w-16 h-16 rounded-full bg-white/15 border border-white/20 flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#094aa5] font-black text-xl font-mono">
                {username.slice(0, 1) || "김"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-blue-100 font-bold tracking-tight">춘천 버스Go 우등회원</span>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">{username} 님</h2>
              <span className="text-[11px] font-mono text-white/70 font-semibold tracking-tight mt-0.5">ID: jiyoon6911</span>
            </div>
          </div>

          {/* Quick info badges below */}
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5 mt-4.5 flex justify-between items-center text-xs">
            <span className="text-blue-100 font-bold flex items-center gap-1">
              <Milestone className="w-4 h-4" />
              <span>자주 쓰는 정류소:</span>
            </span>
            <span className="font-extrabold text-white text-[13px] bg-blue-700/55 px-3 py-1 rounded-full border border-blue-400/30">
              {station}
            </span>
          </div>
        </div>

        {/* 2. Civil Complaint Status widget (my tickets) */}
        <div className="p-4 mt-1.5">
          <div className="bg-white rounded-2xl border border-gray-150 p-4.5 shadow-sm">
            <h3 className="text-[12.5px] font-black text-slate-800 tracking-tight flex items-center gap-2 mb-3">
              <Inbox className="w-4.5 h-4.5 text-blue-600" />
              <span>나의 대중교통 불편 민원 접수함</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mt-1.5 text-center">
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-[10px] font-bold text-amber-600">처리 진행 중</p>
                <p className="text-lg font-black text-amber-800 mt-1">1 건</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-gray-150">
                <p className="text-[10px] font-semibold text-gray-500">완료 내역</p>
                <p className="text-lg font-black text-gray-400 mt-1">0 건</p>
              </div>
            </div>
            
            <p className="text-[9.5px] text-gray-400 font-semibold tracking-tight leading-relaxed mt-2.5 text-center">
              ※ 제출하신 건은 춘천시 대중교통과 인계 후 완료 시 알람 및 챗봇 피드가 발생합니다.
            </p>
          </div>
        </div>

        {/* 3. Lower settings options list & toggles */}
        <div className="p-4 pt-1">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col">
            
            {/* Sync toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <RefreshCw className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-800 tracking-tight">실시간 BIS 자동 동기화</span>
                  <span className="text-[10px] text-gray-400 font-medium">30초 주기 도착 시간표 백그라운드 갱신</span>
                </div>
              </div>
              
              {/* iOS style custom toggle button */}
              <button
                onClick={() => setIsSyncEnabled(!isSyncEnabled)}
                className={`w-11 h-6 rounded-full p-1 transition-all flex items-center shrink-0 cursor-pointer ${
                  isSyncEnabled ? "bg-[#10b981]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    isSyncEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Notification toggle */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-800 tracking-tight">푸시 알림 수신 설정</span>
                  <span className="text-[10px] text-gray-400 font-medium">버스 곧도착 근접 진동 및 안내 전송알람</span>
                </div>
              </div>

              {/* iOS style custom toggle button */}
              <button
                onClick={() => setIsNotifEnabled(!isNotifEnabled)}
                className={`w-11 h-6 rounded-full p-1 transition-all flex items-center shrink-0 cursor-pointer ${
                  isNotifEnabled ? "bg-[#10b981]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    isNotifEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Link bulletin list */}
            <div
              onClick={onAnnouncementsClick}
              className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-[#ebf4ff]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0c70d4] flex items-center justify-center">
                  <Settings className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col animate-pulse-subtle">
                  <span className="text-xs font-black text-gray-800 tracking-tight group-hover:text-[#0c70d4]">
                    공지사항 및 긴급 파업 속보
                  </span>
                  <span className="text-[10px] text-red-500 font-bold">노선 우회 및 동계단축안내 확인요망</span>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Link to external chuncheon traffic BIS in layout */}
            <a
              href="https://bis.chuncheon.go.kr"
              target="_blank"
              rel="noreferrer referrer"
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <ExternalLink className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-800 tracking-tight">춘천시 버스정보시스템 공식 홈페이지</span>
                  <span className="text-[10px] text-gray-400 font-medium">bis.chuncheon.go.kr 로 직접이동</span>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-gray-300 group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

          </div>
        </div>

      </div>

      {/* 4. Bottom Logout Row */}
      <div className="p-4 shrink-0">
        <button
          onClick={onLogout}
          className="w-full bg-rose-50 border border-rose-100 hover:bg-rose-100/60 active:scale-98 text-rose-600 font-extrabold py-3.5 rounded-2xl text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          id="logout-btn"
        >
          <LogOut className="w-4 h-4" />
          <span>안전하게 로그아웃</span>
        </button>
      </div>

    </div>
  );
}
