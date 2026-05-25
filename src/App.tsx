import React, { useState, useEffect } from "react";
import { Bus, Grid, HelpCircle, User, Award, ArrowUp, Calendar, AlertTriangle, CloudSun, Clock, Navigation, Compass, Megaphone } from "lucide-react";

// Sub-components
import LoginView from "./components/LoginView";
import FakeMap from "./components/FakeMap";
import MainMapView from "./components/MainMapView";
import BusDetailView from "./components/BusDetailView";
import SearchView from "./components/SearchView";
import LostItemsView from "./components/LostItemsView";
import AnnouncementsView from "./components/AnnouncementsView";
import ChatbotView from "./components/ChatbotView";
import MyPageView from "./components/MyPageView";
import BusMoreView from "./components/BusMoreView";

type TabID = "card" | "lost" | "home" | "chat" | "mypage";

export default function App() {
  // Authentication states with LocalStorage persistence to sustain developer refreshes
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("cbus_logged_in") === "true";
  });
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("cbus_username") || "김한림";
  });
  const [mainStation, setMainStation] = useState<string>(() => {
    return localStorage.getItem("cbus_station") || "한림대학교";
  });

  // Current main operational sub-components states
  const [activeTab, setActiveTab] = useState<TabID>("home");
  const [selectedStation, setSelectedStation] = useState<string>("한림대학교");
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

  // Shared favorites & pinned states
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("cbus_favorites");
    return saved ? JSON.parse(saved) : ["300", "15"];
  });

  const [pinned, setPinnedRaw] = useState<string[]>(() => {
    const saved = localStorage.getItem("cbus_pinned");
    const parsed = saved ? JSON.parse(saved) : ["300", "2"];
    return Array.isArray(parsed) ? parsed.slice(0, 2) : ["300", "2"];
  });

  const [pinAlert, setPinAlert] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cbus_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cbus_pinned", JSON.stringify(pinned));
  }, [pinned]);

  useEffect(() => {
    if (pinAlert) {
      const timer = setTimeout(() => {
        setPinAlert(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [pinAlert]);

  const setPinned = (value: React.SetStateAction<string[]>) => {
    setPinnedRaw((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      // Block only if we are actually adding a new pin and the size is > 2
      if (next.length > prev.length && next.length > 2) {
        setPinAlert("고정은 최대 2개까지 가능합니다!");
        return prev;
      }
      return next;
    });
  };

  // Sync state data write to storage
  const handleLogin = (user: string, station: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    setMainStation(station);
    setSelectedStation(station);
    localStorage.setItem("cbus_logged_in", "true");
    localStorage.setItem("cbus_username", user);
    localStorage.setItem("cbus_station", station);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("cbus_logged_in");
    localStorage.removeItem("cbus_username");
    localStorage.removeItem("cbus_station");
    setActiveTab("home");
    setSelectedBus(null);
    setIsSearchOpen(false);
    setIsAnnouncementsOpen(false);
  };

  const handleSelectStationFromMap = (stationName: string) => {
    setSelectedStation(stationName);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 md:p-6" id="app-root">
      
      {/* 
        Responsive Mobile Mockup Shell Framing:
        Stays full-screen on mobile viewports for an organic native experience, 
        and turns into a gorgeous physical hand-held bezel on wide screens.
      */}
      <div className="relative w-full h-[100vh] md:w-[390px] md:h-[844px] bg-slate-100 md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Mobile Status Sensor Notch Accent */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-50 pointer-events-none" />

        {/* Dynamic Display Screens Container */}
        <div className="flex-1 relative overflow-hidden bg-white">
          
          {!isLoggedIn ? (
            /* 1. Gate screen */
            <LoginView onLogin={handleLogin} />
          ) : (
            /* 2. Authenticated Application Shell */
            <div className="w-full h-full flex flex-col justify-between relative">
              
              {/* Floating circular announcement button with Megaphone icon */}
              <button
                onClick={() => setIsAnnouncementsOpen(true)}
                className="absolute top-4 right-4 w-11 h-11 bg-white hover:bg-slate-50 text-blue-600 rounded-full flex items-center justify-center border border-slate-200 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer z-50"
                id="bell-announcements-btn"
              >
                <Megaphone className="w-5 h-5 text-blue-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
              </button>

              {/* Pin limit reached notification toast */}
              {pinAlert && (
                <div 
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 border border-slate-800 text-white text-[11px] font-black px-4.5 py-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-[85%] whitespace-nowrap animate-bounce"
                  style={{ animationDuration: "1s" }}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{pinAlert}</span>
                </div>
              )}

              {/* Central Dynamic Content Switcher */}
              <main className="flex-1 relative overflow-hidden bg-slate-50">
                
                {activeTab === "home" && (
                  <div className="absolute inset-0 w-full h-full">
                    {/* Background Simulator Map Layer */}
                    <FakeMap
                      onSelectStation={handleSelectStationFromMap}
                      selectedStation={selectedStation}
                      favorites={favorites}
                    />

                    {/* HUD Layer Overlay containing sheets and actions */}
                    <MainMapView
                      onSelectBus={(busNum) => setSelectedBus(busNum)}
                      onSearchOpen={() => setIsSearchOpen(true)}
                      currentStation={selectedStation}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      pinned={pinned}
                      setPinned={setPinned}
                    />
                  </div>
                )}

                {activeTab === "card" && (
                  /* BUS MORE INFO BOARD: High-density 14-bus expanded dynamic view console */
                  <BusMoreView
                    onSelectBus={(busNum) => setSelectedBus(busNum)}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    pinned={pinned}
                    setPinned={setPinned}
                  />
                )}

                {activeTab === "lost" && (
                  /* LOST AND FOUND VIEW: Replicates the 14th screenshot */
                  <LostItemsView />
                )}

                {activeTab === "chat" && (
                  /* COMPLAINT CHATBOT FAQ VIEW: Replicates the 16th screenshot */
                  <ChatbotView />
                )}

                {activeTab === "mypage" && (
                  /* PROFILE COCKPIT SETTINGS VIEW: Replicates the 17th screenshot */
                  <MyPageView
                    username={username}
                    station={mainStation}
                    onLogout={handleLogout}
                    onAnnouncementsClick={() => setIsAnnouncementsOpen(true)}
                  />
                )}

                {/* SLIDING TRANSITION OVERLAY 1: Place Search */}
                {isSearchOpen && (
                  <SearchView
                    onClose={() => setIsSearchOpen(false)}
                    onSelectBus={(busNum) => {
                      setSelectedBus(busNum);
                      setIsSearchOpen(false);
                    }}
                    onSelectStation={(stationName) => {
                      setSelectedStation(stationName);
                      setIsSearchOpen(false);
                    }}
                  />
                )}

                {/* SLIDING TRANSITION OVERLAY 2: Bus Route Timeline details */}
                {selectedBus && (
                  <BusDetailView
                    busNumber={selectedBus}
                    onClose={() => setSelectedBus(null)}
                  />
                )}

                {/* SLIDING TRANSITION OVERLAY 3: Bulletins and Announcements Board */}
                {isAnnouncementsOpen && (
                  <AnnouncementsView
                    onClose={() => setIsAnnouncementsOpen(false)}
                  />
                )}

              </main>

              {/* 5-Tab Navigation Bar layout matching your provided UI illustrations */}
              <nav className="bg-white border-t border-gray-200 px-2 py-1.5 flex justify-around items-center shrink-0 z-30 select-none shadow-md">
                
                {/* Tab: Bus more details cockpit console */}
                <button
                  onClick={() => {
                    setActiveTab("card");
                    setSelectedBus(null);
                  }}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "card" ? "text-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"
                  }`}
                  id="tab-btn-card"
                >
                  <Bus className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-1">더보기</span>
                </button>

                {/* Tab: Lost & Found */}
                <button
                  onClick={() => {
                    setActiveTab("lost");
                    setSelectedBus(null);
                  }}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "lost" ? "text-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"
                  }`}
                  id="tab-btn-lost"
                >
                  <Grid className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-1">분실물</span>
                </button>

                {/* Tab: Main Navigation map focus */}
                <button
                  onClick={() => {
                    setActiveTab("home");
                    setSelectedBus(null);
                  }}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "home" ? "text-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"
                  }`}
                  id="tab-btn-home"
                >
                  <Compass className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-1">홈지도</span>
                </button>

                {/* Tab: AI Live Chat FAQ */}
                <button
                  onClick={() => {
                    setActiveTab("chat");
                    setSelectedBus(null);
                  }}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "chat" ? "text-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"
                  }`}
                  id="tab-btn-chat"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-1">AI상담</span>
                </button>

                {/* Tab: MyPage Accounts */}
                <button
                  onClick={() => {
                    setActiveTab("mypage");
                    setSelectedBus(null);
                  }}
                  className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                    activeTab === "mypage" ? "text-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"
                  }`}
                  id="tab-btn-mypage"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[9px] font-extrabold tracking-tight mt-1">마이</span>
                </button>

              </nav>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
