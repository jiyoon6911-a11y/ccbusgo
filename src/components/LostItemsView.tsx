import React, { useState } from "react";
import { INITIAL_LOST_ITEMS } from "../data";
import { LostItem } from "../types";
import { Search, MapPin, Grid, Plus, Calendar, PackageOpen, ArrowLeft, HeartHandshake } from "lucide-react";

interface LostItemsViewProps {
  onClose?: () => void;
}

export default function LostItemsView({ onClose }: LostItemsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<LostItem[]>(INITIAL_LOST_ITEMS);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Registration Dialog States
  const [newRoute, setNewRoute] = useState("300");
  const [newCategory, setNewCategory] = useState("무선 이어폰");

  const filteredItems = items.filter((item) => {
    return (
      item.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleRegisterLost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoute.trim() || !newCategory.trim()) return;

    const newItem: LostItem = {
      id: `L_${Date.now()}`,
      routeName: newRoute,
      category: newCategory,
      date: "26.05.25" // current system year
    };

    setItems([newItem, ...items]);
    setIsRegisterOpen(false);
    setNewCategory("");
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col justify-between font-sans relative">
      <div>
        
        {/* Banner header top bar */}
        <div className="bg-[#0c70d4] text-white p-4 text-center select-none relative">
          <h2 className="text-[17px] font-extrabold tracking-tight flex items-center justify-center gap-1.5">
            <PackageOpen className="w-5 h-5" />
            <span>분실물 보관 센터</span>
          </h2>
          <p className="text-[10px] text-white/80 font-semibold tracking-tight mt-0.5">
            춘천 버스 내 습득물 상시 리스트 조회
          </p>
        </div>

        {/* 1. Header Search Area (screenshot 14) */}
        <div className="p-4 bg-white border-b border-gray-100/80">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="분실물 종류, 노선 번호 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-gray-800 rounded-full py-3 pl-11 pr-5 text-sm font-semibold outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-400"
              id="search-lost-input"
            />
          </div>

          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-xs font-black text-slate-800 tracking-tight">최근 등록순</span>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-all"
              id="report-lost-btn"
            >
              <Plus className="w-3 h-3" />
              <span>직접 찾은 물건 접수</span>
            </button>
          </div>
        </div>

        {/* 2. Grid items listing (screenshot 14) */}
        <div className="p-4 max-h-[420px] overflow-y-auto no-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <PackageOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs font-bold font-sans">"${searchTerm}" 관련 분실물이 목록에 없습니다.</p>
              <p className="text-[10px] text-gray-300 mt-1">철자나 노선번호가 올바른지 재조정해보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pb-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border border-gray-150 hover:border-blue-400 transition-all shadow-xs flex items-center gap-2.5 hover:shadow-sm"
                >
                  {/* Gray circular thumbnail matching image 14 */}
                  <div className="w-11 h-11 bg-gray-100/80 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                    <Grid className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Right data columns */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 tracking-tight">노선 번호</span>
                    <span
                      className={`text-[12px] font-extrabold ${
                        item.routeName === "한림대학교"
                          ? "text-amber-500"
                          : item.routeName === "12"
                          ? "text-emerald-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.routeName}
                    </span>
                    <span className="text-[11px] font-black text-gray-800 truncate mt-0.5">{item.category}</span>
                    <span className="text-[9px] text-gray-450 mt-1 font-mono">{item.date}</span>
                  </div>
                </div>
              ))}
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

      {/* Register lost modal */}
      {isRegisterOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-40">
          <div className="bg-white text-gray-800 rounded-3xl w-full max-w-sm p-5 shadow-2xl animate-scale-up">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 border-b pb-2.5">
              <HeartHandshake className="w-5 h-5 text-blue-500" />
              <span>주운 물건 습득물 등록</span>
            </h3>

            <form onSubmit={handleRegisterLost} className="flex flex-col gap-3.5 mt-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">습득 버스 노선</label>
                <input
                  type="text"
                  required
                  placeholder="예: 300, 12, 한림대학교 등"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">분실물 종류</label>
                <input
                  type="text"
                  required
                  placeholder="예: 안경 케이스, 아이패드 등"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="flex gap-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all"
                >
                  보관물품 등록대기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
