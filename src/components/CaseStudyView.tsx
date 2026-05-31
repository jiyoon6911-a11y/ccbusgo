import React, { useState } from "react";
import { 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Compass, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  MapPin, 
  Clock, 
  Smartphone, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  ShieldAlert, 
  MessageSquare, 
  Award,
  Sparkles,
  CloudLightning,
  Sun,
  GitBranch
} from "lucide-react";

export default function CaseStudyView() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  
  // Interactive Journey Map state
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);

  // IA user flow tab state
  const [iaFlowTab, setIaFlowTab] = useState<"before" | "after" | "compare">("compare");

  // Custom Data visualizer stats
  const surveyResults = [
    { 
      category: "시장 현황", 
      title: "기존 앱 인지도 제로 및 포털 쏠림", 
      percent: 80.5, 
      color: "bg-red-500", 
      desc: "기존 '춘천버스GO' 존재를 '처음 알았다'는 응답이 80.5%로 심각 수준. 반면 63.4%는 익숙함과 통합검색 이유로 '네이버 지도'를 이용해 포털 쏠림이 뚜렷합니다." 
    },
    { 
      category: "행동 패턴", 
      title: "정류소 이전 가상 대기 선호", 
      percent: 70.7, 
      color: "bg-blue-600", 
      desc: "유저의 70.7%는 정류장에 나가기 전 '집이나 건물 방 안에서 나가기 직전' 앱을 가장 먼저 실행합니다. 물리적 낙오 및 추위에 무방비한 노출 차단 니즈가 극명합니다." 
    },
    { 
      category: "Pain Point", 
      title: "UI 클릭 조작 단계 저항 저항층", 
      percent: 41.5, 
      color: "bg-amber-600", 
      desc: "불편 원인 1순위는 '과도한 클릭 깊이/단계(41.5%)'입니다. 번거로움에 도크되는 저항선은 3회(34.1%), 4회(39%)로 3-Touch 내 도달 설계가 필수적임이 증명됩니다." 
    },
    { 
      category: "Needs", 
      title: "대학 셔틀 연동 니즈 (킬러 피처)", 
      percent: 48.8, 
      color: "bg-teal-500", 
      desc: "대형 맵에서의 미충족 공백 1위는 '대학 셔틀버스 실시간 위치(48.8%)'. 신규 서비스 유치 시 최고 트리거 또한 '대학교 셔틀 연동(41.5%)'으로 독보적인 1위를 점했습니다." 
    }
  ];

  const journeySteps = [
    {
      title: "1. 탐색",
      icon: <Search className="w-4 h-4" />,
      action: "인스타 핫플 검색 후 버스 노선 탐색 (기쁜 마음에 맛집 찾았으나 이동 고민)",
      emotion: "neutral",
      emotionText: "평온/기대 (😐)",
      painPoint: "포털 지도 앱은 대략적인 '분' 단위만 띄워 상세 배차 흐름 파악 불가. 휴일 데이터 증발 시 대안 안내 부재.",
      solution: "목적지 중심 자연어 역검색 도입: 정류소 명칭을 몰라도 장소 명칭 검색 시 주변 역 자동 매핑."
    },
    {
      title: "2. 세팅",
      icon: <Smartphone className="w-4 h-4" />,
      action: "초 단위 배차 시간 확인을 위한 로컬 버스 앱 실행",
      emotion: "annoyed",
      emotionText: "짜증 (😠)",
      painPoint: "최초 진입 시 가입/즐겨찾기 지정을 '강제'하여 목적지가 매번 바뀌는 대학생에게 피로감 유발.",
      solution: "Frictionless UI 설계: 팝업 및 복잡한 세팅 유도를 전면 제거하고 3-Touch 내 목표 정보 즉시 도달."
    },
    {
      title: "3. 대기",
      icon: <Clock className="w-4 h-4" />,
      action: "정류장에 도착해 실시간으로 버스 기다리는 대기 흐름",
      emotion: "anxious",
      emotionText: "불안/초조 (😨)",
      painPoint: "양방향 정류장 이름이 동일하여 방향 혼동 발생. 악천후(눈, 비) 시 도로 정체 지연이 미반영됨.",
      solution: "직관적 방면 라벨링(ㅇㅇ 방면 랜드마크 명시) 및 실시간 기상 정보 연동에 가중치를 둔 버스 출발 보정 시간 표기."
    },
    {
      title: "4. 탑승",
      icon: <Compass className="w-4 h-4" />,
      action: "실제 승차 완료 후 목적지 및 하차 정류장 모니터링",
      emotion: "relieved",
      emotionText: "안도 (😮💨)",
      painPoint: "버스 탑승 후 내 위치 중심이 아닌 노선 전체가 정적 노출되어, 내 주변 정류장을 찾으려 끊임없는 수크롤 수고 발생.",
      solution: "스마트 동적 스냅 뷰포트: 실시간 GPS 탑승 판정 시 현재 및 인접 하차 정류장 중심의 수직 타임라인 자동 전개."
    }
  ];

  return (
    <div className="w-full h-full bg-slate-900 text-slate-100 font-sans flex flex-col overflow-hidden">
      
      {/* Case Study Header Dashboard Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 text-[10.5px] font-black uppercase tracking-wider">UX/UI Case Study</span>
            <span className="text-[11px] text-slate-500 font-semibold">• 리디자인 프로젝트 리포트</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight mt-1">
            춘천버스GO : 대학생 밀착형 버티컬 모빌리티
          </h1>
        </div>
        <div className="text-[11.5px] text-slate-400 font-medium bg-slate-900 border border-slate-800/80 rounded-full px-3.5 py-1 flex items-center gap-1.5 self-stretch sm:self-auto justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>분석 데이터 시각화 라이브 작동 중</span>
        </div>
      </div>

      {/* Main Content Area: Tab Navigation + Scroll Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side Quick Rail - Desktop only */}
        <aside className="hidden md:flex flex-col w-56 border-r border-slate-850 bg-slate-950/40 p-4 gap-1.5 shrink-0 select-none">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase px-2 mb-2 block">목차 탐색</span>
          
          <button
            onClick={() => setActiveSection("overview")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "overview" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>01. 프로젝트 개요</span>
          </button>

          <button
            onClick={() => setActiveSection("background")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "background" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>02. 배경 및 문제 정의</span>
          </button>

          <button
            onClick={() => setActiveSection("research")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "research" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>03. 유저 & 개발자 리서치</span>
          </button>

          <button
            onClick={() => setActiveSection("persona")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "persona" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>04. 페르소나 및 여정</span>
          </button>

          <button
            onClick={() => setActiveSection("ia")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "ia" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>05. 정보 구조(IA) & 흐름</span>
          </button>

          <button
            onClick={() => setActiveSection("strategy")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "strategy" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>06. 핵심 솔루션 & 피처</span>
          </button>

          <button
            onClick={() => setActiveSection("ut")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "ut" 
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 font-black" 
                : "text-slate-400 hover:bg-slate-850 hover:text-white"
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>07. UT 사용성 평가 설계</span>
          </button>
        </aside>

        {/* Content Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Mobile Tab Swiper Actions */}
          <div className="flex md:hidden bg-slate-950 overflow-x-auto border-b border-slate-850 no-scrollbar select-none py-2 px-3 gap-1.5 shrink-0">
            {[
              { id: "overview", label: "개요" },
              { id: "background", label: "배경" },
              { id: "research", label: "분석" },
              { id: "persona", label: "여정" },
              { id: "ia", label: "정보구조" },
              { id: "strategy", label: "솔루션" },
              { id: "ut", label: "평가" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeSection === tab.id 
                    ? "bg-blue-600 text-white" 
                    : "text-slate-400 bg-slate-900 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrolling Report Canvas */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar bg-slate-900/40">
            
            {/* 01. Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">01. Overview</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">프로젝트 개요</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    대형 지도 앱의 피로감 주는 과포화 인터페이스와 기존 공공 버스 앱의 파편화되고 노후화된 UI 사이에서 극렬한 교통 환경의 변화를 겪는 <strong className="text-slate-200">'대학생'의 이동 맥락</strong>에만 완벽히 밀착해 제안하는 <strong className="text-blue-400">초-버티컬 대중교통 플랫폼 리디자인</strong> 프로젝트입니다. 
                  </p>
                </div>

                <div className="p-5.5 bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-[10px] text-blue-400 font-extrabold tracking-tight uppercase">SLOGAN</span>
                  <p className="text-lg font-black text-white leading-snug mt-1 text-sky-200">
                    "나의 5분을 아끼는 방 안에서의 타임어택, <br />내 손안의 춘천 버스 매니저 🚌"
                  </p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed border-t border-slate-800 pt-3">
                    춘천은 시내 중심가 대비 시외 배차가 원활하지 않은 전형적인 지방 소도시의 특성을 공유하나, 여러 대학교가 응집하여 학생 통학 인구수가 상재하는 <strong>고고도 대학 도시</strong>입니다. 대학생이라는 단일 코어 사용자의 이동 양상(시내버스 점거, 대학 셔틀 시간표 교차 조회, 눈·비 올 때의 연착 불안)을 관통하는 서비스 솔루션을 구축하는 데 목적이 있습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl">
                    <h3 className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      프로젝트 핵심 목표 (Goal)
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      시내버스와 대학 셔틀 데이터를 한 화면에서 상호 교차 조회하고, 춘천 대중교통의 누락 노선 문제를 보정할 <strong className="text-slate-200">대학생 맞춤형 4탭(홈/노선·도로/버스 토크/마이페이지) 버티컬 모빌리티 서비스</strong>를 완결성 높게 구현합니다.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl">
                    <h3 className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      타겟 고객층 (Audience)
                    </h3>
                    <ul className="text-xs text-slate-400 leading-relaxed mt-2.5 space-y-1.5">
                      <li className="flex items-center gap-1.5">
                        <span className="text-teal-400 font-bold">•</span> 춘천 소재 한림대, 강원대 등 기숙사 거주 재학생
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-teal-400 font-bold">•</span> 매주 주말 수도권 및 타 지점과 춘천을 오가는 통학생
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-teal-400 font-bold">•</span> 정류장명이 서툰 춘천 거주 초보 대학생 여행군
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 02. Background Section */}
            {activeSection === "background" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">02. Background & Problem Definition</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">대중교통 고밀도 집중 현상과 한계</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    춘천은 학기 개강 여부에 따라 대중교통 인프라 전체의 가해지는 부하와 수요가 약 2배 가까이 편향되는 지역입니다. 
                  </p>
                </div>

                {/* VISUALIZATION CHART 1: Ridership Comparative Surge */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5.5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9.5px] font-black uppercase tracking-wider">교통 정량 지표</span>
                      <h3 className="text-xs font-black text-slate-200 mt-1">방학 vs 개강 시즌 일평균 버스 승하차 변화량 (2024-2025)</h3>
                    </div>
                    <span className="text-xs text-red-400 font-black tracking-tight">+97.6% 폭증</span>
                  </div>

                  {/* Gorgeous Custom SVG Bar Chart */}
                  <div className="relative pt-2">
                    <div className="grid grid-cols-2 gap-4 h-36 items-end border-b border-slate-800 pb-2 relative">
                      
                      {/* Bar 1: Vacation */}
                      <div className="flex flex-col items-center group cursor-pointer">
                        <span className="text-[10px] text-slate-500 font-mono mb-1.5">51,506 건</span>
                        <div className="w-full max-w-[56px] rounded-t-xl bg-slate-800 h-16 group-hover:bg-slate-700 transition-all duration-300 relative">
                          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-slate-600 rounded-b-none" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black mt-2">방학 시즌 (8월 일평균)</span>
                      </div>

                      {/* Bar 2: Semester */}
                      <div className="flex flex-col items-center group cursor-pointer">
                        <span className="text-[10.5px] text-emerald-400 font-black font-mono mb-1.5">101,756 건</span>
                        <div className="w-full max-w-[56px] rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 h-32 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300 relative">
                          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-cyan-500 rounded-b-none" />
                        </div>
                        <span className="text-[10px] text-white font-black mt-2">개강 시즌 (6월 일평균)</span>
                      </div>

                      {/* Background grid lines */}
                      <div className="absolute left-0 right-0 top-1/3 border-t border-dashed border-slate-900 pointer-events-none" />
                      <div className="absolute left-0 right-0 top-2/3 border-t border-dashed border-slate-900 pointer-events-none" />
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-500 mt-3 leading-relaxed">
                    * 데이터 출처: 춘천시 대중교통 인프라 승하차 교통카드 빅데이터 분석계 가늠 추이치. 개강 시즌 전역 인구가 버스로 집중되며, 특히 오전 9~12시 주 통학 노선은 <strong>수요가 최대 +134% 폭등</strong>하는 것으로 관측되었습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pain Point 1 */}
                  <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-200">로컬 API 누락 현상 (API 이 빠짐)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                        춘천시 영내 BIS API는 수시로 주말/공휴일 배차 데이터가 증발하거나 연착 추산 데이터가 유실되어, 유저들은 버스가 오는지 알 수 없어 정류소에서 하염없이 시간 소실을 유발합니다.
                      </p>
                    </div>
                  </div>

                  {/* Pain Point 2 */}
                  <div className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-200">구식 유저 경험 환경 (즐겨찾기 강제)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                        기존 춘천 대중교통 서비스는 강제 회원가입, 초행자에 부가적인 북마크 세팅 의무화 등 경직된 허들을 장착하고 있어, 타 대학에서 전입해 온 대학생 초심자는 적응이 단절되는 상황을 빚어왔습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 03. Discover & Research Section */}
            {activeSection === "research" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">03. Discover: Research</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">유저 및 공급자 심층 연구</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    단순 추정에 의존하지 않기 위해, 춘천버스GO의 이전 구축 개발자와의 공급자 심층 대면 인터뷰 및 대규모 대학생 설문(N=41)을 병행하였습니다.
                  </p>
                </div>

                {/* Developer Interview Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5.5 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[9.5px] font-black uppercase tracking-wider">공급자 대면 인터뷰</span>
                    <span className="text-[10.5px] text-slate-500 font-extrabold">"데이터 한계를 UX 기획으로 덮다"</span>
                  </div>
                  <blockquote className="text-xs text-slate-300 border-l-2 border-blue-500 pl-3 leading-relaxed italic">
                    "국내 대형 포털 맵 서비스는 모든 정보를 조작하는 범용 기획에 치우쳤고, 시 공용 앱은 심미적으로 부재 상태였습니다. 춘천은 주말 배차가 가변적이고 API 상에서 데이터가 툭툭 끊길 때가 잦아, 실시간 버스 정보가 사라지더라도 <strong>차고지 시간표와 운행 노선 랜드마크 방면(ㅇㅇ방면)을 직관적인 탭으로 보강</strong>해 해결해야만 했습니다."
                  </blockquote>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-slate-900 text-[10.5px]">
                    <div className="bg-slate-900/60 p-2.5 rounded-xl">
                      <strong className="text-sky-300 block mb-0.5">💡 차고지 시간표 연동</strong>
                      데이터가 끊기더라도 대용으로 활용 가능한 시간표를 배치해 깜깜이 대기 완화.
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-xl">
                      <strong className="text-indigo-300 block mb-0.5">📍 양방향 텍스트 구분</strong>
                      동일 정류장명의 혼선을 방지하기 위해 상하행 랜드마크 탭 분리 적용.
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-xl">
                      <strong className="text-teal-300 block mb-0.5">🔎 장소 기반 역검색</strong>
                      고유한 노선번호를 모르는 생소한 신입생도 약속 장소 이름을 치면 주변 맵 정보를 교차 안내.
                    </div>
                  </div>
                </div>

                {/* Quantitative Survey Results Dashboard */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="border-b border-slate-900 pb-3 mb-4">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-wider">Research Metric</span>
                    <h3 className="text-[13px] font-black text-slate-100 mt-1">정량적 설문조사 정밀 분석 (N=41)</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                      <strong>조사 개요:</strong> 춘천 내 대중교통 앱 사용 경험이 있는 20대 대학생 및 통학/자취생 중심 (<span className="text-blue-400 font-bold">85.4%</span>)
                    </p>
                  </div>
                  
                  <div className="space-y-5">
                    {surveyResults.map((stat, i) => (
                      <div key={i} className="space-y-1.5 p-3.5 bg-slate-900/40 rounded-2xl border border-slate-850/60 hover:border-slate-800 transition-all">
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{stat.category}</span>
                            <span className="text-xs font-black text-slate-200">{stat.title}</span>
                          </div>
                          <span className="text-sm font-black text-white font-mono shrink-0 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850">
                            {stat.percent}%
                          </span>
                        </div>
                        
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900/80">
                          <div 
                            className={`h-full ${stat.color} rounded-full transition-all duration-1000`} 
                            style={{ width: `${stat.percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Behavioral safari profiling */}
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-400 block uppercase">실제 관찰형 서비스 사파리 (Behavioral Safari)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <strong className="text-xs text-white">행동 가상 [권예소 님] 21세 / 기숙사 거주</strong>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">간헐적 이동자</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        네이버 지도로 노선을 가볍게 체크하나 춘천 버스의 색상 명도와 노선 화살표 구분이 서투름. <br />
                        <strong className="text-slate-300">"매번 초행인데, 쓰기 전에 즐겨찾기 폴더 그룹과 이름을 억지 설정하는 진입 절차가 번거로워 탈출 욕구가 컸습니다."</strong>
                      </p>
                    </div>

                    <div className="p-4.5 bg-slate-950/40 border border-slate-850 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <strong className="text-xs text-white">행동 가상 [김세영 님] 22세 / 매일 통학</strong>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">출퇴근 데일리족</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        동일 정류장명인데 길 하나를 두고 정반대 방면 노선 카드가 공존해 반대 낭패 경험 상재. <br />
                        <strong className="text-slate-300">"갑자기 폭설이나 폭우가 내리면 버스 정보가 다 멎는데, 셔틀버스와 날씨에 연동된 도착 보정 예측치가 절실합니다."</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 04. Persona Section */}
            {activeSection === "persona" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">04. Core Persona & User Journey Map</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">사용자 퍼소나 및 행동 저항성 지도</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    리서치를 구조화하여 정의한 핵심 사용자와 각 사용 영역 단계별 감정 가치 피로선을 가시화했습니다.
                  </p>
                </div>

                {/* Persona card */}
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 p-5.5 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-850/80">
                    <div className="w-12 h-12 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-black text-base shrink-0 border border-blue-500/20">
                      지은
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-black text-white">민지은 (21세 / 여)</h3>
                        <span className="text-[9.5px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">한림대학교 2학년, 타지 통학생</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">핫플레이스 모임 위주 이동 성향 • 방구석 타임어택형 기숙생</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <strong className="text-sky-300 block mb-1">행동 성향 및 맥락</strong>
                      <p className="text-slate-400 leading-relaxed">
                        수차례 모바일로 출발 전 잔여 분초를 스캔한 직후 방 전실에서 이탈, 신속히 계단 활강 및 승차하는 리듬. 즐겨찾기 수동 지정 과정을 번거로워해서 즉각적 뷰잉 갈망.
                      </p>
                    </div>
                    <div>
                      <strong className="text-teal-300 block mb-1">핵심 미션과 과업 목표</strong>
                      <p className="text-slate-400 leading-relaxed">
                        초기 복잡한 절차 없이, 명확성이 낮은 장소 이름(ex- 육림고개 등)만 검색창의 직접 타격해도 주변 경유 소통 버스를 곧바로 추천해 편히 승차 및 안전 회귀.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Journey Map Dashboard */}
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5.5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black text-slate-200">인터랙티브 유저 여정 지도 (User Journey Map)</h3>
                    <span className="text-[10px] text-slate-500 font-semibold font-mono">가이드 탭 클릭 시 핵심 상세 노출</span>
                  </div>

                  {/* Horizontal visual line of steps */}
                  <div className="grid grid-cols-4 gap-2 mb-4 relative z-10 select-none">
                    {journeySteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveJourneyStep(idx)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          activeJourneyStep === idx 
                            ? "bg-blue-650/20 border-blue-500 text-white shadow-md shadow-blue-500/5 scale-[1.02]" 
                            : "bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`p-1.5 rounded-lg shrink-0 ${activeJourneyStep === idx ? "bg-blue-600 text-white" : "bg-slate-850/80 text-slate-400"}`}>
                            {step.icon}
                          </div>
                          <span className={`text-[10px] font-black ${activeJourneyStep === idx ? "text-blue-400" : "text-slate-500"}`}>
                            Step {idx+1}
                          </span>
                        </div>
                        <span className="text-[11px] font-black tracking-tight block max-w-full truncate">{step.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Vertical Progress Connector Line Layer representation */}
                  <div className="bg-slate-900/60 p-4.5 rounded-2xl border border-slate-850 shadow-inner">
                    <div className="flex flex-col gap-3 text-xs leading-relaxed">
                      
                      <div className="flex justify-between items-center border-b border-slate-850/60 pb-2.5">
                        <span className="text-[11.5px] font-extrabold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>현재 영역: {journeySteps[activeJourneyStep].title}</span>
                        </span>
                        
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          activeJourneyStep === 0 ? "bg-teal-500/10 text-teal-400" :
                          activeJourneyStep === 1 ? "bg-red-500/10 text-red-400" :
                          activeJourneyStep === 2 ? "bg-amber-500/10 text-amber-400" :
                          "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          감정 상태: {journeySteps[activeJourneyStep].emotionText}
                        </span>
                      </div>

                      <div>
                        <strong className="text-slate-300 block mb-1">유저의 행동 가이드</strong>
                        <p className="text-slate-400 text-[11px] bg-slate-950/20 p-2 rounded-lg border border-slate-850/35">
                          {journeySteps[activeJourneyStep].action}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1.5">
                        <div className="p-3 bg-red-950/15 border border-red-500/10 rounded-xl">
                          <strong className="text-red-400 flex items-center gap-1.5 font-black text-[11px]">
                            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                            <span>Pain Point (한계)</span>
                          </strong>
                          <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
                            {journeySteps[activeJourneyStep].painPoint}
                          </p>
                        </div>

                        <div className="p-3 bg-blue-950/15 border border-blue-500/10 rounded-xl">
                          <strong className="text-blue-400 flex items-center gap-1.5 font-black text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            <span>춘천버스GO 솔루션 (UX)</span>
                          </strong>
                          <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
                            {journeySteps[activeJourneyStep].solution}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 05. IA & Flow Section */}
            {activeSection === "ia" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">05. Information Architecture & User Flow</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">이전 vs 리디자인 정보 구조(IA) 및 흐름 비교</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    기존의 복잡하고 강제적인 절차투성이 흐름을 극복하기 위해, 가벼운 즉각 탐색이 가능하고 유수의 서브 단계들이 터치 몇 번으로 자동 해결되는 <strong className="text-emerald-400">초간결 Frictionless 핵심 순환 정보 구조</strong>를 구축하였습니다.
                  </p>
                </div>

                {/* Flow State Control Tab */}
                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-805 gap-1 select-none shrink-0">
                  <button
                    onClick={() => setIaFlowTab("compare")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      iaFlowTab === "compare" 
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>🔄 전체 흐름 1:1 비교</span>
                  </button>
                  <button
                    onClick={() => setIaFlowTab("before")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      iaFlowTab === "before" 
                        ? "bg-red-950/40 text-red-400 border border-red-500/10" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>😠 기존 앱 IA (실패/이탈)</span>
                  </button>
                  <button
                    onClick={() => setIaFlowTab("after")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      iaFlowTab === "after" 
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>✨ 바뀐 앱 IA (초고속 탑승)</span>
                  </button>
                </div>

                {/* Flow Display Area */}
                <div className="space-y-6">
                  {/* CMP: COMPARE FLOW CHART */}
                  {(iaFlowTab === "compare" || iaFlowTab === "before") && (
                    <div className={iaFlowTab === "compare" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "max-w-xl mx-auto"}>
                      
                      {/* BEFORE IA MODULE */}
                      <div className="bg-slate-950 border border-red-950/30 p-5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-xl pointer-events-none" />
                        <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <strong className="text-xs text-white font-extrabold uppercase">기존 춘천 버스Go IA</strong>
                          </div>
                          <span className="text-[10px] text-red-405 font-extrabold bg-red-500/10 px-2 py-0.5 rounded">장벽 상재 • 잦은 이탈</span>
                        </div>

                        {/* Vertically Aligned Flow Blocks with linking arrows */}
                        <div className="space-y-3 relative before:absolute before:inset-y-2 before:left-[19px] before:w-0.5 before:bg-slate-900">
                          
                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-850 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">1</div>
                            <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-slate-500 font-bold block">출발 준비</span>
                              <strong className="text-xs text-slate-300">주말에 명동으로 놀러 가기 위해 기숙사에서 출발 준비</strong>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-850 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">2</div>
                            <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-slate-500 font-bold block">앱 실행</span>
                              <strong className="text-xs text-slate-300">기존 춘천 버스Go 앱 실행</strong>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#1e1e24] border border-slate-850 text-red-400 text-[10.5px] font-bold flex items-center justify-center">3</div>
                            <div className="bg-red-950/10 border border-red-900/20 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-red-400 font-bold block">정보 과부하</span>
                              <strong className="text-xs text-slate-200">0Depth: 복잡한 상단 3개 탭 화면 진입</strong>
                              <p className="text-[10.5px] text-slate-400 mt-1">흩어지고 파편화되어 한눈에 파악 불가</p>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-850 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">4</div>
                            <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-slate-500 font-bold block">탐색 개시</span>
                              <strong className="text-xs text-slate-300">명동 가는 버스 검색 시도</strong>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#201d1d] border border-slate-850 text-amber-400 text-[10.5px] font-bold flex items-center justify-center">?</div>
                            <div className="bg-amber-950/5 border border-amber-900/10 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-amber-500 font-bold block">조건 분기 (낯선 인지도)</span>
                              <strong className="text-xs text-slate-300">로컬 지리가 낯선가?</strong>
                              <div className="bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 mt-1.5 space-y-1 text-[11px]">
                                <p className="text-red-400 font-bold">⚠️ Yes (어두움)</p>
                                <p className="text-slate-300">
                                  <strong>불편함 발생:</strong> 매번 네이버 지도를 수동으로 켜서 정류장명을 확인 후 복사하여 앱에 수동 입력
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#201d1d] border border-slate-850 text-amber-400 text-[10.5px] font-bold flex items-center justify-center">?</div>
                            <div className="bg-amber-950/5 border border-amber-900/10 p-2.5 rounded-xl flex-1">
                              <span className="text-[10px] text-amber-500 font-bold block">조건 분기 2 (강제성)</span>
                              <strong className="text-xs text-slate-300">매번 목적지가 바뀜에도 즐겨찾기 강제 유도?</strong>
                              <div className="bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 mt-1.5 text-[11px] space-y-1">
                                <p className="text-red-400 font-black">😡 피로도 급증 (Yes)</p>
                                <p className="text-slate-300 leading-relaxed font-medium">별명 가상 설정, 필수 색상 수동 지정 등 대단히 번거롭고 거친 세팅 요구</p>
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-sm bg-red-650 border border-red-500 text-white text-[10.5px] font-bold flex items-center justify-center">❌</div>
                            <div className="bg-red-950/30 border border-red-900/40 p-3 rounded-2xl flex-1">
                              <span className="text-[9.5px] text-red-400 font-bold block">Critical Drop Off</span>
                              <strong className="text-xs text-white">번거로움과 비직관적인 UI ➔ 스트레스 누적으로 인해 앱 삭제 및 이탈</strong>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">5</div>
                            <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1 space-y-1.5 text-[11px] text-slate-400">
                              <p className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span> 대안으로 네이버 지도 앱에 상시 의존</p>
                              <p className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span> 단순히 ‘분’ 단위의 대략적인 수치만 안내</p>
                              <p className="flex items-center gap-1.5"><span className="text-red-500 font-bold">•</span> 눈, 비 올 때의 도로 수치 지연 미반영</p>
                            </div>
                          </div>

                          <div className="relative pl-10 flex gap-2.5 items-start">
                            <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-rose-950 border border-rose-800 text-rose-450 text-[11px] font-black flex items-center justify-center">💀</div>
                            <div className="bg-rose-950/30 border border-rose-900 p-3.5 rounded-2xl flex-1">
                              <span className="text-[10px] text-rose-400 font-bold block">최종 대기 결과</span>
                              <strong className="text-xs text-white leading-relaxed block mt-0.5">방구석 타임어택 실패, 도로 정체 미반영 및 실시간 지연으로 버스 놓침</strong>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* AFTER IA MODULE (In Compare view) */}
                      {iaFlowTab === "compare" && (
                        <div className="bg-slate-950 border border-emerald-950/30 p-5 rounded-3xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-xl pointer-events-none" />
                          <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                              <strong className="text-xs text-white font-extrabold uppercase">새로운 춘천버스GO IA</strong>
                            </div>
                            <span className="text-[10px] text-emerald-405 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded">Frictionless • 3-Touch</span>
                          </div>

                          {/* Vertically Aligned Flow Blocks with linking arrows */}
                          <div className="space-y-3 relative before:absolute before:inset-y-2 before:left-[19px] before:w-0.5 before:bg-slate-900">
                            
                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">1</div>
                              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-slate-500 font-bold block">출발 준비</span>
                                <strong className="text-xs text-slate-300">주말에 명동/핫플로 가기 위해 기숙사에서 출발 준비</strong>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">2</div>
                              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-slate-500 font-bold block">앱 실행</span>
                                <strong className="text-xs text-slate-300">최신 춘천 버스Go 앱 실행</strong>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#1b2520] border border-emerald-900/30 text-emerald-450 text-[10.5px] font-bold flex items-center justify-center">3</div>
                              <div className="bg-emerald-950/5 border border-emerald-900/10 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-emerald-400 font-bold block">메인 진입</span>
                                <strong className="text-xs text-white">[메인 화면] 진입 (흩어져 있는 정보를 한눈에 통합)</strong>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10.5px] font-bold flex items-center justify-center">4</div>
                              <div className="bg-slate-900/40 border border-slate-850 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-slate-500 font-bold block">기상 인지</span>
                                <strong className="text-xs text-slate-300">날씨 위젯 확인 (실시간 위치 연동으로 눈/비 지연 정보 인지)</strong>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#1b2320] border border-emerald-900/20 text-amber-400 text-[10.5px] font-bold flex items-center justify-center">?</div>
                              <div className="bg-emerald-950/5 border border-emerald-900/10 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-amber-500 font-bold block">조건 분기 (가시성 검토)</span>
                                <strong className="text-xs text-slate-300">원하는 목적지나 버스가 대시보드에 바로 보이는가?</strong>
                                
                                <div className="mt-2 space-y-2 text-[11px]">
                                  <div className="bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/20">
                                    <p className="text-emerald-400 font-bold">🟢 Yes ➔ 버스 요약탭 (기본 홈 화면)</p>
                                    <ul className="text-slate-350 space-y-0.5 mt-1 list-disc pl-3.5">
                                      <li>근접 버스 순 최대 2개 즉시 표시</li>
                                      <li>혼잡도 색상별 단계 표시 (원활/보통/혼잡)</li>
                                      <li>노선 번호, 현 정류장 잔여 시간 직접 파악</li>
                                    </ul>
                                  </div>

                                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                                    <p className="text-slate-400 font-bold">⚫ No ➔ 통합 검색창 활용</p>
                                    <p className="text-slate-400 mt-1">
                                      장소-버스-목적지 자연어 통합 검색 자동완성 ➔ 노선 터치 시 실시간 위치, 교통 혼잡, 시간표 직접 파리
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#1b2320] border border-emerald-900/20 text-amber-400 text-[10.5px] font-bold flex items-center justify-center">?</div>
                              <div className="bg-emerald-950/5 border border-emerald-900/10 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-amber-500 font-bold block">조건 분기 2 (정보 밀도 확장)</span>
                                <strong className="text-xs text-slate-300">더 풍족한 정보나 대체제(셔틀 등)가 필요한가?</strong>
                                
                                <div className="bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 mt-1.5 text-[11px] space-y-1">
                                  <p className="text-emerald-400 font-black">✨ Yes ➔ 버스 정보탭 확장 (스와이프)</p>
                                  <p className="text-slate-300 leading-relaxed font-semibold">
                                    근접 버스 최대 7개 노출 ➔ 시내/고속/셔틀 동적 필터링 ➔ 기숙사 전용 흐름 필요시 '더보기탭' 최대 14개 일괄 전개
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-emerald-900 text-white text-[10.5px] font-bold flex items-center justify-center">✓</div>
                              <div className="bg-emerald-950/10 border border-emerald-900/20 p-2.5 rounded-xl flex-1">
                                <span className="text-[10px] text-emerald-400 font-bold block">계산 완료</span>
                                <strong className="text-xs text-slate-200">정확한 잔여 분/초 예측 및 악천후 혼잡도 보정 가중치 완료</strong>
                              </div>
                            </div>

                            <div className="relative pl-10 flex gap-2.5 items-start">
                              <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-emerald-600 border border-emerald-500 text-white text-[11px] font-black flex items-center justify-center">🚀</div>
                              <div className="bg-emerald-950/30 border border-emerald-900 p-3.5 rounded-2xl flex-1">
                                <span className="text-[10px] text-emerald-400 font-bold block">최종 대기 결과</span>
                                <strong className="text-xs text-white leading-relaxed block mt-0.5">복잡한 사전 세팅과 가입 피로 없이 초고속 3-Touch 완료, 완벽한 타임어택 성공 ➔ 정시 승차!</strong>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* SINGLE MODULE ONLY: AFTER REDESIGN DETAIL */}
                  {iaFlowTab === "after" && (
                    <div className="max-w-xl mx-auto bg-slate-950 border border-emerald-950/20 p-6 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <strong className="text-xs text-white font-extrabold uppercase">리디자인 춘천버스GO 세부 흐름</strong>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">고객 중심 최적 노선</span>
                      </div>

                      <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[19px] before:w-0.5 before:bg-slate-900">
                        
                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-800">1</div>
                          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                            <span className="text-[10px] text-slate-500 font-bold block">통학 준비</span>
                            <span className="text-xs font-black text-white">주말에 명동/핫플레이스 가기 위해 기숙사 이탈전 출발 준비</span>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-800">2</div>
                          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                            <span className="text-[10px] text-slate-500 font-bold block">원탭 트리거</span>
                            <span className="text-xs font-black text-white">최신 춘천 버스Go 앱 즉시 실행</span>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-[#132d20] text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-900/30">3</div>
                          <div className="bg-emerald-950/10 p-3.5 rounded-xl border border-emerald-900/25">
                            <span className="text-[10px] text-emerald-400 font-bold block">통합 허브 메인화면</span>
                            <span className="text-xs font-black text-slate-105">단일 0Depth 진입 (과포화되던 정보를 한눈에 응집)</span>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-800">4</div>
                          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                            <span className="text-[10px] text-slate-500 font-bold block">스마트 기상 상태</span>
                            <span className="text-xs font-black text-white">날씨 위젯 확인 (실시간 위치 기반 강풍/폭우/지연 정보 자동 감지)</span>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-900/20">?</div>
                          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                            <span className="text-[10px] text-amber-500 font-bold block">핵심 목적 판명</span>
                            <strong className="text-xs text-slate-200">원하는 목적지나 자주 타는 버스가 대시보드 메인에 바로 보이는가?</strong>
                            
                            <div className="space-y-2 pt-1.5 text-[11px]">
                              <div className="p-3 bg-emerald-950/20 border border-emerald-550/10 rounded-lg">
                                <span className="text-emerald-400 font-black block">🟢 YES: 버스 요약탭 활용</span>
                                <p className="text-slate-450 mt-1">
                                  근접 버스 최대 2개 직접 표기 ➔ 혼잡 지표 색상 체크 ➔ 잔여 분초 직접 입수
                                </p>
                              </div>
                              <div className="p-3 bg-blue-950/20 border border-blue-550/10 rounded-lg">
                                <span className="text-blue-400 font-black block">🔵 NO: 자연어 통합 검색 창</span>
                                <p className="text-slate-450 mt-1">
                                  장소/목적지 직접 검색 ➔ 주변 연계 정류장 맵 연동 ➔ 상세 노선 팝업 수용
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-900/20">?</div>
                          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                            <span className="text-[10px] text-amber-500 font-bold block">정보의 수직 확장 필요성</span>
                            <strong className="text-xs text-slate-200">다음 버스 정보 또는 대학 셔틀 등의 복수 연계 리스트 수색?</strong>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                              가볍게 위로 스와이프 이행 ➔ <strong>‘버스 정보탭(최대 7개 노선)’</strong> 확장 ➔ 정렬 옵션을 통해 대학 셔틀버스 한눈에 교차 확인 ➔ 기숙사 출발 버스티드 폭탄 출차 확인 시 <strong>‘정보 더보기(최대 14개)’</strong> 일괄 노출 활용.
                            </p>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-900">✓</div>
                          <div className="bg-emerald-950/20 border border-emerald-900/10 p-3 rounded-lg">
                            <span className="text-[10px] text-emerald-440 font-bold block">정합성 달성</span>
                            <span className="text-xs text-white">동적 배차 교차 계산 반영 완료 ➔ 기상 도로 정체 지연 완벽 보정</span>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">🚀</div>
                          <div className="bg-gradient-to-tr from-emerald-950/60 to-slate-950 border border-emerald-500/30 p-4.5 rounded-2xl">
                            <span className="text-[10px] text-emerald-440 font-bold block">최종 사용자 경험 결과</span>
                            <strong className="text-xs text-white leading-relaxed block mt-1">
                              억지 가입, 즐겨찾기 폴더명 및 가상 별명 수동 입력 단계를 과감히 전적 삭제 ➔ 3-Touch 내에 목표 통학 버스 및 셔틀 정보 득득 성공 ➔ 칼 같은 타임어택 성공 및 정시 안착!
                            </strong>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 06. Strategy Section */}
            {activeSection === "strategy" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">06. UX Strategy & Killer Features</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">리디자인 전략 및 핵심 기능 설계</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    리서치와 페르소나 분석 결과에 근간한 3대 중심축 설계 전략(Frictionless UX • All-in-One 모빌리티 • Fallback UI)을 안내합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Strategy Vector 1 */}
                  <div className="p-5.5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
                    <span className="text-[28px] font-black text-blue-500/30 leading-none">01</span>
                    <h3 className="text-xs font-black text-white tracking-tight mt-1.5">초기 진입장벽 최소화 (Frictionless UX)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                      방을 나가기 직전 시간과 타오르는 통학 버스 시간표 확인이 필요한 타목적 대화형 구도를 배려해, 팝업 간섭을 완전 차단하고 메인 진입 후 즉시 <strong>3-Touch 이내 타겟 노선에 도달</strong>하도록 단축하였습니다.
                    </p>
                  </div>

                  {/* Strategy Vector 2 */}
                  <div className="p-5.5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-teal-500/30 transition-all duration-300">
                    <span className="text-[28px] font-black text-teal-500/30 leading-none">02</span>
                    <h3 className="text-xs font-black text-white tracking-tight mt-1.5">흩어진 인프라 모빌리티 All-In-One</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                      공용 시내버스는 물론이고 매 시기 공지가 달라 교조 조회가 불가했던 **대학 등교 셔틀버스 및 시외/고속 버스 유형의 가용한 전역 데이터**를 모바일 탑바에 병렬 수용시켰습니다.
                    </p>
                  </div>

                  {/* Strategy Vector 3 */}
                  <div className="p-5.5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                    <span className="text-[28px] font-black text-indigo-500/30 leading-none">03</span>
                    <h3 className="text-xs font-black text-white tracking-tight mt-1.5">공공 버스 한계 보정 (Fallback UI)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                      API 이 빠짐 유실 사태 시 빈 창 표기를 전면 배격하고 **'과거 차고지 출발 시간 스케줄러 기반 예측 시분 타임라인'**을 띄움과 동시에, 실시간 악천후 기상 예측 보정 가중치를 할당 예측하였습니다.
                    </p>
                  </div>
                </div>

                {/* Killer Feature Showcases */}
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-400 block uppercase">초-버티컬 킬러 피처 (Killer Feature)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature 1 */}
                    <div className="bg-gradient-to-br from-[#126cc1]/25 to-slate-950 border border-blue-500/15 p-5 rounded-2xl">
                      <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                        커뮤니티 민원 연계
                      </span>
                      <h4 className="text-xs font-black text-white">원스톱 대중교통 불편 신고 (민원)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-2">
                        어디에 민원 전화를 넣어야 할지 모르는 신입 타지역 대학생들을 위해, 노선 리스트에서 클릭 한 번으로 불편 사항 유형(무정차 통과, 승하차 거부, 미소)을 선택 시 **현재 기기 GPS 좌표를 공정 추출해 시청 대중교통과 신고 규격 포맷에 맞춤식 연동 접수**하는 편리함을 갖췄습니다.
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gradient-to-br from-indigo-500/10 to-slate-950 border border-indigo-500/15 p-5 rounded-2xl">
                      <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                        분실물 골든타임 확보
                      </span>
                      <h4 className="text-xs font-black text-white">동적 버스톡 기반 빠른 분실물 센터 추적</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-2">
                        소지품 유실 시 일주일 뒤 경찰서 이첩 전 **습득 골든타임 초기(당일)**에 버스기사 및 연계 운수회사(한일여행, 대한교통 등)와 직접 전화를 매핑하는 빠른 분실물 안내 채널을 도입하여, 대학생들의 유실 지갑·전자기기 안전 회수율을 방어합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 07. UT Plan Section */}
            {activeSection === "ut" && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-black tracking-widest text-blue-500 uppercase block">07. Usability Testing Plan</span>
                  <h2 className="text-2xl font-black text-white tracking-tight mt-1">사용성 평가 (Usability Testing) 분석 설계</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    구축된 초간결 핵심 3-Touch 프로세스와 새로운 올인원 기능군의 효용성을 실체적 행동 검증 형태로 측정하는 설계안입니다.
                  </p>
                </div>

                <div className="p-5.5 bg-slate-950 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9.5px] font-black uppercase tracking-wider">UT METHOD</span>
                    <h3 className="text-xs font-black text-slate-200">Moderated UT with Think Aloud (조정자 대면 + 싱크얼라우드 기법)</h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    대상 유저군이 평소 학교 건물 방 전실에서 외출 이행까지 밟는 물리적 도식 동선을 유사히 연출하고, 앱을 직접 입수 조작하는 동안의 독백(Think Aloud)을 기록하여 조작 저항 한계(3-Touch 이내가 완성되었는지)의 여부를 추척 검정합니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60">
                      <strong className="text-sky-300 text-[11px] block mb-1">Group A (사전경험군 비교군)</strong>
                      <p className="text-[11px] text-slate-400">
                        기존 춘천 BIS 앱의 올드한 즐겨찾기 강요 단계와 상/하행 방향 혼선으로 인한 낭패 경험이 있는 재학생 유저 ➔ <strong>"기억 속의 스트레스 가치가 신규 인터페이스에서 얼마나 유연히 증발하였는지"</strong> 비교 조사.
                      </p>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60">
                      <strong className="text-purple-300 text-[11px] block mb-1">Group B (완전 신입 비경험군)</strong>
                      <p className="text-[11px] text-slate-400">
                        춘천 버스노선 체계를 단 한 번도 습득하지 못한 신생 타지 유입 재학생 ➔ <strong>"매뉴얼 없이 3초 안에 목적지 명동 검색 및 대학 등교 셔틀버스 위치 정보를 오착 없이 도달하는가"</strong> 직관력 분석.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Task Scenarios List */}
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-400 block uppercase">핵심 과업 시나리오 (Core Task Scenarios)</span>

                  <div className="space-y-2.5">
                    <div className="border border-slate-850 bg-slate-950/20 p-4 rounded-2xl flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="text-xs font-black text-white block">시나리오 A: 초행 정류장 자연어 돌파</strong>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mt-1">
                          "지금 자취방에 있습니다. 정밀 역 이름을 알지 못하는 상황에서 '명동'으로 무작정 향하기 위한 최단 탑승 가능 버스 노선을 즐겨찾기 회원 등업 절차 없이 즉석 검색 검출하세요."
                        </p>
                      </div>
                    </div>

                    <div className="border border-slate-850 bg-slate-950/20 p-4 rounded-2xl flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="text-xs font-black text-white block">시나리오 B: 파편화 대체제 검색 (셔틀 연동)</strong>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mt-1">
                          "방금 일반 시내버스를 놓쳤습니다. 당황을 풀고 한 스크린 하단에서 즉시 연결되는 '대학 셔틀버스'의 당일 현행 등교 탑승 가능 마지노선 타임라인을 신속히 검증 표출하세요."
                        </p>
                      </div>
                    </div>

                    <div className="border border-slate-850 bg-slate-950/20 p-4 rounded-2xl flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="text-xs font-black text-white block">시나리오 C: 시각 역전 방면 구분 구직</strong>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed mt-1">
                          "앞 정류장과 이름이 토씨 하나 틀리지 않고 똑같은 길 건너 정류소에 서 계십니다. 춘천버스GO의 상단 방면 라벨링 탭과 눈/비 기상 정체 알림을 바탕으로 오탑승 위험을 사전에 격퇴 시정하세요."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
