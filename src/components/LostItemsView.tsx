import React, { useState } from "react";
import { INITIAL_LOST_ITEMS } from "../data";
import { LostItem } from "../types";
import { Search, MapPin, Grid, Plus, Calendar, PackageOpen, ArrowLeft, HeartHandshake, Phone, ExternalLink, X } from "lucide-react";

interface ExtendedLostItem extends LostItem {
  type?: "found" | "lost";
}

interface LostItemsViewProps {
  onClose?: () => void;
}

const getCategoryImageUrl = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("우산")) {
    return "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&auto=format&fit=crop&q=60";
  }
  if (cat.includes("카드")) {
    return "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?w=150&auto=format&fit=crop&q=60";
  }
  if (cat.includes("휴대폰") || cat.includes("폰")) {
    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60";
  }
  if (cat.includes("지갑")) {
    return "https://images.unsplash.com/photo-1627124314140-bc4ef262fe78?w=150&auto=format&fit=crop&q=60";
  }
  if (cat.includes("팔찌") || cat.includes("시계") || cat.includes("악세서리") || cat.includes("반지")) {
    return "https://images.unsplash.com/photo-1602752275513-4752557dec13?w=150&auto=format&fit=crop&q=60";
  }
  if (cat.includes("이어폰") || cat.includes("에어팟") || cat.includes("버즈") || cat.includes("헤드폰")) {
    return "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&auto=format&fit=crop&q=60";
  }
  // Default fallback beautiful lost/found concept image
  return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&auto=format&fit=crop&q=60";
};

export default function LostItemsView({ onClose }: LostItemsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<ExtendedLostItem[]>(() => {
    // Dynamically flag initial items to look realistic in both lost/found categories
    return INITIAL_LOST_ITEMS.map((item, idx) => ({
      ...item,
      type: idx % 3 === 0 ? "lost" : "found"
    }));
  });
  
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formType, setFormType] = useState<"found" | "lost">("found");
  const [selectedDetailItem, setSelectedDetailItem] = useState<ExtendedLostItem | null>(null);
  
  // Registration Dialog States
  const [newRoute, setNewRoute] = useState("300");
  const [newCategory, setNewCategory] = useState("");

  const filteredItems = items.filter((item) => {
    return (
      item.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRegisterLost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoute.trim() || !newCategory.trim()) return;

    const newItem: ExtendedLostItem = {
      id: `L_${Date.now()}`,
      routeName: newRoute,
      category: newCategory,
      date: "26.05.25", // current system year
      type: formType
    };

    setItems([newItem, ...items]);
    setIsRegisterOpen(false);
    setNewCategory("");
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col justify-between font-sans relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
        
        {/* Banner header top bar */}
        <div className="bg-[#0c70d4] text-white p-4 text-center select-none relative">
          <h2 className="text-[17px] font-extrabold tracking-tight flex items-center justify-center gap-1.5">
            <PackageOpen className="w-5 h-5 animate-pulse" />
            <span>분실물 보관 센터</span>
          </h2>
          <p className="text-[10px] text-white/80 font-semibold tracking-tight mt-0.5">
            춘천 버스 내 습득물 상시 리스트 조회
          </p>
        </div>

        {/* 1. Header Search Area */}
        <div className="p-4 bg-white border-b border-gray-100/80">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="분실물 종류, 노선 번호 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-gray-800 rounded-full py-2.5 pl-11 pr-5 text-xs font-semibold outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-400"
              id="search-lost-input"
            />
          </div>

          <div className="flex items-center justify-between mt-3.5 px-1 relative">
            <span className="text-xs font-black text-slate-800 tracking-tight">최근 등록 보관물</span>
            
            {/* Multi-action plus registration dropdown widget */}
            <div className="relative">
              <button
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-md hover:scale-103 active:scale-97 cursor-pointer transition-all"
                id="report-lost-btn"
              >
                <Plus className={`w-3.5 h-3.5 transition-transform duration-250 ${isOptionsOpen ? "rotate-45" : ""}`} />
                <span>분실물 접수</span>
              </button>

              {isOptionsOpen && (
                <div className="absolute right-0 top-9 bg-white border border-slate-200 rounded-2xl shadow-xl py-1 w-38 z-50 animate-scale-up">
                  <button
                    onClick={() => {
                      setFormType("found");
                      setIsRegisterOpen(true);
                      setIsOptionsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-705 hover:bg-slate-50 flex items-center gap-1.5 border-b border-slate-100"
                  >
                    <span className="text-xs">📥</span>
                    <span>찾은 분실물 접수</span>
                  </button>
                  <button
                    onClick={() => {
                      setFormType("lost");
                      setIsRegisterOpen(true);
                      setIsOptionsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-705 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <span className="text-xs">📤</span>
                    <span>잃어버린 분실물 접수</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Grid items listing with Images and click response */}
        <div className="p-4">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <PackageOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs font-bold font-sans">"{searchTerm}" 관련 분실물이 목록에 없습니다.</p>
              <p className="text-[10px] text-gray-300 mt-1">분실물 종류나 노선번호가 정확한지 확인해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-8">
              {filteredItems.map((item) => {
                const imgUrl = getCategoryImageUrl(item.category);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDetailItem(item)}
                    className="bg-white rounded-2xl p-2 px-2.5 border border-slate-150 hover:border-blue-400 focus:outline-hidden transition-all shadow-xs flex items-center gap-2 hover:shadow-sm cursor-pointer select-none active:scale-98"
                  >
                    {/* Dynamic Image Category Avatar replacing old placeholder */}
                    <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <img
                        src={imgUrl}
                        alt={item.category}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right data columns */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400 tracking-tight">노선 {item.routeName}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.type === "lost" ? "bg-rose-500" : "bg-emerald-500"}`} />
                      </div>
                      <span className="text-[11px] font-black text-slate-800 truncate leading-tight">{item.category}</span>
                      <span className="text-[8.5px] text-gray-450 font-mono mt-0.5">{item.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* 3. Left Facing Float Back Circle Button */}
      {onClose && (
        <div className="absolute bottom-4 right-4 z-40">
          <button
            onClick={onClose}
            className="w-13 h-13 bg-[#0a5fc2] hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center border border-blue-400 cursor-pointer active:scale-95 transition-all"
            id="lost-back-btn"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Interactive Detail Modal matching prompt requirements */}
      {selectedDetailItem && (
        <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 z-[60] animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 border border-slate-200/85 shadow-2xl flex flex-col items-center animate-scale-up">
            <div className="w-full flex justify-between items-center border-b pb-2.5 mb-3.5">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <PackageOpen className="w-4 h-4 text-blue-600" />
                분실물 처리 안내
              </span>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full flex gap-3.5 mb-4 items-center">
              <img
                src={getCategoryImageUrl(selectedDetailItem.category)}
                alt={selectedDetailItem.category}
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover rounded-2xl border border-slate-100 shadow-xs shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    selectedDetailItem.type === "lost"
                      ? "bg-rose-50 text-rose-600 border border-rose-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {selectedDetailItem.type === "lost" ? "잃어버린 분실물" : "찾은 습득물/보관중"}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-450 leading-none">버스 노선: {selectedDetailItem.routeName}</span>
                <span className="text-xs font-black text-slate-800 truncate mt-1">{selectedDetailItem.category}</span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">등록 정보일자: 20{selectedDetailItem.date}</span>
              </div>
            </div>

            {/* Custom guidance block with dynamic contact references */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-3 text-center text-[11px] text-slate-700 leading-relaxed font-semibold mb-4 w-full">
              <p className="text-blue-700 font-extrabold text-xs mb-1">📞 분실물 회수 및 신고 대기처 안내</p>
              <p>해당 습득물을 현재 보관하고 있으시거나,</p>
              <p>본인의 잃어버린 소유물로 확인되시는 경우엔,</p>
              <div className="p-1 px-3 bg-white border border-slate-200 rounded-xl inline-block mt-2 shadow-xs">
                <span>분실물 센터: </span>
                <a href="tel:033-254-4452" className="text-rose-600 hover:underline font-black">033-254-4452</a>
              </div>
              <p className="text-[9.5px] text-slate-400 mt-2 font-normal">
                또는 하단의 춘천시내버스 통합 홈페이지 게시판을 참조해 안전하게 문의하십시오.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <a
                href="http://www.ccbus.co.kr/contents.do?cid=6e882b5485ed4d0bb71bb772fedfb4e0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0a5fc2] hover:bg-[#074ea3] active:scale-98 text-white text-center font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>공식 홈페이지 바로가기</span>
              </a>
              <a
                href="tel:033-254-4452"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-center font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>분실물 센터 즉시 전화걸기</span>
              </a>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-center font-bold py-2 rounded-xl text-xs transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register lost modal */}
      {isRegisterOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white text-gray-800 rounded-3xl w-full max-w-sm p-5 shadow-2xl animate-scale-up">
            <h3 className="text-xs font-black text-gray-900 flex items-center gap-2 border-b pb-2.5">
              <HeartHandshake className="w-5 h-5 text-blue-500" />
              <span>{formType === "found" ? "찾은 분실물 (습득물) 접수" : "잃어버린 분실물 신고 접수"}</span>
            </h3>

            <form onSubmit={handleRegisterLost} className="flex flex-col gap-3.5 mt-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">상세 버스 노선</label>
                <input
                  type="text"
                  required
                  placeholder="예: 300, 12, 한림대학교 등"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-hidden focus:ring-2 focus:ring-blue-300 text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">분실물 명종 (물건 분류)</label>
                <input
                  type="text"
                  required
                  placeholder={formType === "found" ? "예: 무선 이어폰, 검정색 가방 등" : "예: 갈색 가죽 지갑, 회색 무산 등"}
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-hidden focus:ring-2 focus:ring-blue-300 text-slate-800"
                />
              </div>

              <div className="flex gap-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-all"
                >
                  물품 정보 등록완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
