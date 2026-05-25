import React, { useState } from "react";
import { Lock, User, Sparkles, HelpCircle, Check, MapPin } from "lucide-react";

interface LoginViewProps {
  onLogin: (username: string, mainStation: string) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  
  // Registration Form State
  const [regId, setRegId] = useState("");
  const [regPw, setRegPw] = useState("");
  const [regName, setRegName] = useState("김한림");
  const [regStation, setRegStation] = useState("한림대학교");

  // Error/Success state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNormalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      showToast("아이디를 입력해 주세요.");
      return;
    }
    if (!password.trim()) {
      showToast("비밀번호를 입력해 주세요.");
      return;
    }
    
    // Normal Login Success
    showToast("로그인 성공! 반가워요.");
    setTimeout(() => {
      onLogin(userId || "김한림", "한림대학교");
    }, 1000);
  };

  const handleEasyLogin = () => {
    // Quick Demo Login instantly matching image 17's name "김한림"
    showToast("김한림 님으로 간편 로그인을 진행합니다.");
    setTimeout(() => {
      onLogin("김한림", "한림대학교");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regId || !regPw || !regName) {
      showToast("모든 정보를 채워주세요.");
      return;
    }
    showToast(`가입 완료! ${regName}님 환영합니다.`);
    setIsRegisterOpen(false);
    setUserId(regId);
    setPassword(regPw);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0a74df] via-[#1286e9] to-[#25a6f2] flex flex-col items-center justify-between p-8 text-white overflow-hidden">
      
      {/* Top Graphic Accent Elements */}
      <div className="absolute top-[-50px] right-[-30px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-40px] w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Area */}
      <div className="w-full text-center mt-12 select-none animate-fade-in">
        <p className="text-[17px] font-medium tracking-tight text-white/90 leading-relaxed font-sans mt-2">
          내 손안의
        </p>
        <p className="text-[17px] font-medium tracking-tight text-white/90 leading-none font-sans">
          춘천 버스 매니저,
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4 font-sans drop-shadow-sm flex items-center justify-center gap-1.5">
          <span>춘천 버스Go</span>
          <Sparkles className="w-6 h-6 text-yellow-200 fill-yellow-200" />
        </h1>
      </div>

      {/* Login Credentials Form Container */}
      <form onSubmit={handleNormalLogin} className="w-full max-w-sm flex flex-col gap-4 mt-2">
        
        {/* Input: ID */}
        <div className="relative flex items-center">
          <User className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full bg-white text-gray-800 rounded-full py-3.5 pl-12 pr-4 text-sm font-semibold outline-hidden focus:ring-2 focus:ring-blue-300 placeholder-gray-300 shadow-lg transition-all"
            id="login-id-input"
          />
        </div>

        {/* Input: Password */}
        <div className="relative flex items-center">
          <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-800 rounded-full py-3.5 pl-12 pr-4 text-sm font-semibold outline-hidden focus:ring-2 focus:ring-blue-300 placeholder-gray-300 shadow-md transition-all"
            id="login-pw-input"
          />
        </div>

        {/* Links: Search Info */}
        <div className="w-full flex justify-end px-2">
          <button
            type="button"
            onClick={() => setIsForgotOpen(true)}
            className="text-[11px] font-semibold text-white/80 hover:text-white underline tracking-tight transition-colors"
            id="find-credentials-btn"
          >
            아이디/비밀번호 찾기
          </button>
        </div>

        {/* Button: Login */}
        <button
          type="submit"
          className="w-full bg-[#0a4896] hover:bg-[#073673] active:scale-98 text-white font-bold py-3.5 rounded-full text-md tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          id="login-submit-btn"
        >
          <span>로그인</span>
        </button>
      </form>

      {/* Supplementary Buttons (Bottom Stack) */}
      <div className="w-full max-w-sm flex flex-col gap-3.5 mb-8">
        {/* Button: Create Account */}
        <button
          type="button"
          onClick={() => setIsRegisterOpen(true)}
          className="w-full bg-[#0d7ce7] hover:bg-[#0c70d4] active:scale-98 border border-white/20 text-white font-bold py-3 rounded-full text-sm tracking-wide shadow-md transition-all cursor-pointer"
          id="open-register-btn"
        >
          계정 만들기
        </button>

        {/* Button: Easy Login with gradient matching image 1 */}
        <button
          type="button"
          onClick={handleEasyLogin}
          className="w-full bg-gradient-to-r from-[#32b0f8] to-[#4fc3ff] hover:from-[#2ca0e3] hover:to-[#40bbfb] active:scale-98 text-white font-bold py-3 rounded-full text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          id="easy-login-btn"
        >
          <span>간편 로그인</span>
        </button>
      </div>

      {/* Tiny Status Toast */}
      {toastMessage && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* POPUP MODAL: Register */}
      {isRegisterOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-40">
          <div className="bg-white text-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-scale-up">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3 border-gray-100">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>새로운 계정 만들기</span>
            </h3>

            <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">아이디</label>
                <input
                  type="text"
                  required
                  placeholder="예: hallym123"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">비밀번호</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPw}
                  onChange={(e) => setRegPw(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">사용자명 (기본값: 김한림)</label>
                <input
                  type="text"
                  required
                  placeholder="실명 혹은 닉네임"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>자주 쓰는 버스 정류장</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 한림대학교, 춘천역 등"
                  value={regStation}
                  onChange={(e) => setRegStation(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="flex gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="w-1/2 bg-gray-100 font-bold hover:bg-gray-200 text-gray-600 py-3 rounded-xl text-xs transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 font-bold hover:opacity-90 text-white py-3 rounded-xl text-xs shadow-md transition-all"
                >
                  가입 및 로그인 적용
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL: Forgot Creds */}
      {isForgotOpen && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-40">
          <div className="bg-white text-gray-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-scale-up">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b pb-2.5">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span>아이디/비밀번호 분실안내</span>
            </h3>

            <p className="text-xs text-gray-500 leading-relaxed mt-4">
              춘천 버스Go는 개인정보 보호를 위해 통합 간편 로그인 인터페이스를 제공하고 있습니다.
              <br />
              <strong className="text-blue-600">간편 로그인</strong> 버튼을 누르시면 준비된 프리셋 계정(<strong className="text-red-500">김한림</strong>님)으로 아무 가입 없이 즉각 앱의 모든 기능을 스마트하게 경험하실 수 있습니다!
            </p>

            <button
              onClick={() => {
                setIsForgotOpen(false);
                handleEasyLogin();
              }}
              className="w-full bg-[#1286e9] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs mt-6 transition-all"
            >
              간편 로그인으로 빠른 시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
