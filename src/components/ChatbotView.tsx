import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, Send, PhoneCall, CheckCircle, HelpCircle, Loader, ArrowLeft } from "lucide-react";

interface ChatbotViewProps {
  onClose?: () => void;
}

export default function ChatbotView({ onClose }: ChatbotViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "wel",
      sender: "bot",
      text: "안녕하세요! 내 손안의 춘천 버스 매니저, '춘천 버스GO' AI 상담사입니다. 🚌✨\n\n춘천 시내버스 노선, 한림대 셔틀버스 정보, 분실물 신고 접수, 혹은 승차 중 불편하신 사항(민원)을 아래 양식에 적어 제출해주시면 신속히 답변해 드리겠습니다!",
      timestamp: "11:05"
    }
  ]);
  
  // Input fields matching image 16
  const [busRoute, setBusRoute] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [messageText, setMessageText] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [showFaqPopup, setShowFaqPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend = messageText) => {
    if (!textToSend.trim()) return;

    // Create User Message
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessageText("");
    setIsLoading(true);

    try {
      const resp = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          busRoute: busRoute,
          busNumber: busNumber,
          chatHistory: messages.slice(-5) // limit history for context optimization
        })
      });

      if (!resp.ok) {
        throw new Error("상담사 연결 실패");
      }

      const data = await resp.json();
      
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: data.responseText,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: "bot",
        text: "현재 실시간 춘천 버스GO AI 상담 지국에 연결할 수 없습니다. 잠시 후 재시도 부탁드립니다.",
        timestamp: "오류"
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFaq = (faqQuestion: string) => {
    setShowFaqPopup(false);
    handleSendMessage(faqQuestion);
  };

  const presetFaqs = [
    "실시간 버스 도착 시간표가 기상악화 시에도 정확한가요?",
    "주운 가방이나 소지품은 며칠 동안 보관소에 있나요?",
    "한림대학교 셔틀버스는 학생 외에 일반 시민도 탑승 가능하나요?",
    "춘천시내버스 파업이 실제로 정상 타결되었는지 궁금합니다."
  ];

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col justify-between font-sans relative">
      
      {/* Scrollable Upper Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 no-scrollbar flex flex-col gap-3" ref={scrollRef}>
        
        {/* 1. Header FAQ Notification Banner (screenshot 16) */}
        <div className="bg-white border rounded-2xl p-4.5 text-gray-800 shadow-xs text-xs leading-relaxed relative border-blue-100 mt-2 shrink-0">
          <p className="font-extrabold text-blue-800 flex items-center gap-1.5 mb-1.5 text-[13px]">
            <HelpCircle className="w-4.5 h-4.5 text-blue-500 fill-blue-50" />
            <span>AI 상담사 및 민원 처리 수칙</span>
          </p>
          <p className="text-gray-600 font-semibold text-[11px] leading-relaxed">
            FAQ 기능을 통해 AI와 대화하며 궁금한 점을 해결하실 수 있습니다.
            <br />
            춘천 버스GO의 민원 처리 결과는 하루 혹은 이틀 뒤에 확인 가능합니다.
          </p>
          <div className="border-t border-dashed border-gray-100 pt-2 mt-2 flex items-center justify-between text-[11px] font-bold text-gray-400">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
              <span>추가 문의사항: 02-XXXX-XXXX</span>
            </span>
          </div>
        </div>

        {/* FAQ Trigger Button Pill (screenshot 16) */}
        <div className="flex justify-center shrink-0">
          <button
            onClick={() => setShowFaqPopup(true)}
            className="bg-[#2563eb] text-white font-extrabold hover:bg-blue-700 font-sans tracking-widest uppercase px-5 py-2.5 rounded-full text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            id="faq-pill-btn"
          >
            <span>FAQ 자주 묻는 질문</span>
            <HelpCircle className="w-4 h-4 fill-blue-600" />
          </button>
        </div>

        {/* Message Feeds bubbles */}
        <div className="flex flex-col gap-3.5 mt-2">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div key={msg.id} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                <div className="flex items-end gap-1.5 max-w-[85%]">
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 shadow-xs font-mono">
                      GO
                    </div>
                  )}
                  
                  <div
                    className={`p-3.5 rounded-2xl text-[12px] leading-relaxed font-medium whitespace-pre-wrap shadow-xs ${
                      isBot
                        ? "bg-white text-gray-800 border rounded-tl-none border-gray-150"
                        : "bg-blue-600 text-white rounded-tr-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-gray-400 font-bold shrink-0 font-mono mb-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold mt-1">
              <Loader className="w-4 h-4 animate-spin text-blue-600" />
              <span>AI가 노선 분석 및 답변을 준비 중입니다...</span>
            </div>
          )}
        </div>

      </div>

      {/* 2. Chatbot Footer Input Panel (screenshot 16) */}
      <div className="bg-white border-t border-gray-200/80 p-3 shrink-0">
        
        {/* Upper mini input columns matching image 16 */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="노선 번호"
            value={busRoute}
            onChange={(e) => setBusRoute(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-gray-700 placeholder-gray-300 outline-hidden focus:ring-1 focus:ring-blue-500"
            id="bus-route-chat-input"
          />
          <input
            type="text"
            placeholder="버스 번호 (선택)"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-gray-700 placeholder-gray-300 outline-hidden focus:ring-1 focus:ring-blue-500"
            id="bus-num-chat-input"
          />
        </div>

        {/* Longer detail text input and submit button (screenshot 16) */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="민원 내용 입력 후 전송해주세요"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full py-3.5 px-4 text-xs font-semibold text-gray-700 placeholder-gray-300 outline-hidden focus:ring-1 focus:ring-blue-500 focus:bg-white"
            id="complain-context-input"
          />
          <button
            onClick={() => handleSendMessage()}
            className="text-white bg-[#0066cc] hover:bg-blue-700 font-black px-4.5 py-3 rounded-full text-xs tracking-tight shrink-0 flex items-center gap-1 hover:shadow-xs transition-all cursor-pointer"
            id="chat-submit-btn"
          >
            <span>전송하기</span>
          </button>
        </div>

      </div>

      {/* FAQ Selection Popup Modal Overlay */}
      {showFaqPopup && (
        <div className="absolute inset-x-0 bottom-0 top-0 bg-slate-900/40 backdrop-blur-xs flex items-end justify-center z-40">
          <div className="bg-white rounded-t-3xl p-6 w-full max-h-[70%] overflow-y-auto no-scrollbar shadow-2xl animate-fade-in-up flex flex-col">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100 shrink-0">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>자주 묻는 질문 FAQ 가이드</span>
              </h3>
              <button
                onClick={() => setShowFaqPopup(false)}
                className="text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                닫기
              </button>
            </div>

            <div className="flex flex-col gap-2.5 my-4 overflow-y-auto flex-1 no-scrollbar">
              {presetFaqs.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerFaq(faq)}
                  className="w-full text-left bg-blue-50/60 border border-blue-100 font-sans hover:bg-blue-100/60 text-slate-800 text-xs font-bold p-3.5 rounded-2xl transition-all cursor-pointer"
                >
                  {faq}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Return button if triggered independently */}
      {onClose && (
        <div className="absolute top-2.5 right-2.5 z-40">
          <button
            onClick={onClose}
            className="p-1 h-7 bg-slate-700/60 hover:bg-slate-700/80 text-white rounded-full flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
