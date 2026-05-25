import React, { useState } from "react";
import { INITIAL_ANNOUNCEMENTS } from "../data";
import { Announcement } from "../types";
import { Search, Megaphone, Calendar, ArrowLeft, Bookmark, BellRing } from "lucide-react";

interface AnnouncementsViewProps {
  onClose: () => void;
}

export default function AnnouncementsView({ onClose }: AnnouncementsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);

  const filteredNotices = INITIAL_ANNOUNCEMENTS.filter((n) => {
    return (
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 h-[640px] flex flex-col pointer-events-auto z-20 font-sans animate-fade-in-up">
      
      {/* Banner top bar */}
      <div className="bg-[#0c70d4] text-white p-4 text-center select-none rounded-t-3xl shrink-0">
        <h2 className="text-[16px] font-extrabold tracking-tight flex items-center justify-center gap-1.5">
          <BellRing className="w-5 h-5 text-yellow-200 fill-yellow-200" />
          <span>춘천 대중교통 새소식 공지</span>
        </h2>
        <p className="text-[10px] text-white/80 font-semibold tracking-tight mt-0.5">
          춘천시 버스 노선 변경 및 임시 파업 안내 알람 고지
        </p>
      </div>

      {/* 1. Address, Bus, Place Searching Box Layout (screenshot 15) */}
      <div className="p-4 bg-white border-b border-gray-100 flex flex-col gap-2 shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="제목 · 내용 · 작성자 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-gray-800 rounded-full py-3.5 pl-11 pr-5 text-xs font-semibold outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-400"
            id="search-announcements-input"
          />
        </div>
        <div className="flex items-center gap-1.5 px-1 mt-1">
          <Bookmark className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
          <span className="text-[10px] font-extrabold text-[#1d4ed8]">최신순 고정 기준</span>
        </div>
      </div>

      {/* 2. List (screenshot 15) */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 no-scrollbar">
        {filteredNotices.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-bold font-sans">"${searchTerm}" 관련 공지글이 존재하지 않습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="bg-white border rounded-2xl p-4.5 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col gap-2 cursor-pointer relative group"
              >
                {/* Notice Date Indicator matching image 15 */}
                <span className="text-[10px] text-gray-400 font-mono tracking-wider flex items-center gap-1 font-semibold">
                  <Calendar className="w-3 h-3 text-gray-300" />
                  <span>{notice.date}</span>
                </span>
                
                <h4 className="text-sm font-black text-gray-900 leading-snug tracking-tight group-hover:text-blue-600 group-hover:underline">
                  {notice.title}
                </h4>

                <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5 leading-relaxed font-medium">
                  {notice.summary}
                </p>

                {/* Micro badge indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#ef4444]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Left Facing Float Back Circle Button (screenshot 15) */}
      <div className="absolute bottom-4 right-4 z-40">
        <button
          onClick={onClose}
          className="w-13 h-13 bg-[#0a5fc2] hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center border border-blue-400 cursor-pointer active:scale-95 transition-all"
          id="announcements-back-btn"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* DETAILED DIALOG OVERLAY */}
      {selectedNotice && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center z-50 rounded-t-3xl">
          <div className="bg-white rounded-t-3xl w-full h-[85%] p-6 flex flex-col justify-between shadow-2xl animate-fade-in-up">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold font-mono">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>등록일: {selectedNotice.date} • 춘천시 대중교통과</span>
              </div>
              
              <h3 className="text-base font-black text-gray-900 tracking-tight mt-3 leading-snug border-b pb-4">
                {selectedNotice.title}
              </h3>

              <div className="mt-5 text-xs text-gray-650 leading-relaxed font-medium font-sans">
                {selectedNotice.summary}
                <div className="mt-4 p-4.5 bg-sky-50 rounded-2xl border border-sky-100 text-sky-800 text-[11px] leading-relaxed">
                  <strong>[춘천 버스Go 안내수칙]</strong>
                  <br className="mb-1" />
                  본 공지는 춘천시 실시간 BIS의 가이드와 통학 혼잡지 예측 노선을 기반으로 자동 배포되는 AI 뉴스피드입니다. 문의사항은 버스 안내 민원센터 혹은 마이페이지 [문의하기]를 활용하여 제출해주세요.
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full bg-[#0c70d4] hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md mt-4 cursor-pointer"
            >
              공지글 숙지 완료 (닫기)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
