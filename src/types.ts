export interface BusArrival {
  id: string;
  routeNumber: string;
  destination: string;
  minutesLeft: number | string; // e.g., 20, "곧 도착", "1시간", "운행정보 없음"
  minutesValue?: number; // Minutes parsed for flawless numerical sorting
  congestion?: "smooth" | "normal" | "crowded" | "very_crowded";
  currentStation?: string; // e.g., "강동농협장학지점"
  type: "city" | "shuttle" | "highway" | "inactive";
  color: string; // e.g., "blue", "green", "yellow", "purple", "gray"
  isStarred?: boolean;
}

export interface LostItem {
  id: string;
  routeName: string; // e.g., "300", "12", "한림대학교"
  category: string; // "우산", "카드", "지갑" 등
  date: string; // e.g., "26.05.05"
}

export interface Announcement {
  id: string;
  date: string;
  title: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface PlaceRecommendation {
  name: string;
  distance: string;
  address: string;
  category: string;
  desc: string;
}
