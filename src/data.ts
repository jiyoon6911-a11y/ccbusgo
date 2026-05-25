import { BusArrival, LostItem, Announcement } from "./types";

// Bus Arrival lists matching various filter criteria in the images
export const INITIAL_BUS_ARRIVALS: BusArrival[] = [
  {
    id: "300",
    routeNumber: "300",
    destination: "한림대학교",
    minutesLeft: "곧 도착",
    minutesValue: 1,
    congestion: "crowded",
    type: "city",
    color: "blue",
    isStarred: true
  },
  {
    id: "15",
    routeNumber: "15",
    destination: "소양 담길",
    minutesLeft: 3,
    minutesValue: 3,
    congestion: "normal",
    type: "city",
    color: "green"
  },
  {
    id: "11",
    routeNumber: "11",
    destination: "춘천소방서",
    minutesLeft: 9,
    minutesValue: 9,
    congestion: "smooth",
    type: "city",
    color: "green"
  },
  {
    id: "6",
    routeNumber: "6",
    destination: "남춘천역 앞",
    minutesLeft: 12,
    minutesValue: 12,
    congestion: "crowded",
    type: "city",
    color: "green"
  },
  {
    id: "7-2",
    routeNumber: "7-2",
    destination: "동산A",
    minutesLeft: 15,
    minutesValue: 15,
    congestion: "normal",
    type: "city",
    color: "green",
    isStarred: false
  },
  {
    id: "10-1",
    routeNumber: "10-1",
    destination: "강동농협장학지점",
    minutesLeft: 20,
    minutesValue: 20,
    congestion: "smooth",
    type: "city",
    color: "green"
  },
  {
    id: "18",
    routeNumber: "18",
    destination: "동광오거리",
    minutesLeft: 25,
    minutesValue: 25,
    congestion: "normal",
    type: "city",
    color: "green"
  },
  {
    id: "12",
    routeNumber: "12",
    destination: "장학LH정문",
    minutesLeft: 30,
    minutesValue: 30,
    congestion: "normal",
    type: "city",
    color: "green"
  },
  {
    id: "2",
    routeNumber: "2",
    destination: "장학교차로",
    minutesLeft: 34,
    minutesValue: 34,
    congestion: "smooth",
    type: "city",
    color: "green"
  },
  {
    id: "10",
    routeNumber: "10",
    destination: "상공회의소",
    minutesLeft: 40,
    minutesValue: 40,
    congestion: "very_crowded",
    type: "city",
    color: "green"
  },
  {
    id: "hallym",
    routeNumber: "한림대셔틀",
    destination: "대학관광 도서관",
    minutesLeft: 50,
    minutesValue: 50,
    congestion: "smooth",
    type: "shuttle",
    color: "yellow"
  },
  {
    id: "dongseoul",
    routeNumber: "동서울고속",
    destination: "춘천터미널 - 동서울",
    minutesLeft: "1시간",
    minutesValue: 60,
    congestion: "smooth",
    type: "highway",
    color: "purple"
  },
  {
    id: "incheon",
    routeNumber: "인천공항고속",
    destination: "춘천터미널 - 인천공항",
    minutesLeft: "1시간 40분",
    minutesValue: 100,
    congestion: "normal",
    type: "highway",
    color: "purple"
  }
];

// Additional inactive/not running buses
export const INACTIVE_BUS_ARRIVALS: BusArrival[] = [
  { id: "2-S", routeNumber: "2-S", destination: "운행 일시정지", minutesLeft: "운행정보 없음", minutesValue: 9999, type: "inactive", color: "gray" },
  { id: "3-S", routeNumber: "3-S", destination: "배차 간격 대기", minutesLeft: "운행정보 없음", minutesValue: 9999, type: "inactive", color: "gray" },
  { id: "7-S", routeNumber: "7-S", destination: "야간 단축운영", minutesLeft: "운행정보 없음", minutesValue: 9999, type: "inactive", color: "gray" }
];

// Keep declarations clean
export const SHUTTLE_BUS_ARRIVALS: BusArrival[] = [];
export const HIGHWAY_BUS_ARRIVALS: BusArrival[] = [];

// Lost Items matching the 14th screenshot
export const INITIAL_LOST_ITEMS: LostItem[] = [
  { id: "L1", routeName: "300", category: "우산", date: "26.05.05" },
  { id: "L2", routeName: "12", category: "카드", date: "26.05.03" },
  { id: "L3", routeName: "한림대학교", category: "휴대폰", date: "26.05.01" },
  { id: "L4", routeName: "300", category: "지갑", date: "26.04.28" },
  { id: "L5", routeName: "300", category: "우산", date: "26.04.20" },
  { id: "L6", routeName: "12", category: "팔찌", date: "26.04.14" },
  { id: "L7", routeName: "300", category: "우산", date: "26.03.24" },
  { id: "L8", routeName: "10", category: "지갑", date: "26.03.20" }
];

// Core Announcements matching the 15th screenshot
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "N1",
    date: "2026.05.20",
    title: "춘천시내버스 총파업 보류 및 대책 안내",
    summary: "춘천 시내 버스가 26년 5월 경 전면 파업을 선언하였으나 긴급 협상이 타결되어 전 노선 정상 운행 중에 있습니다. 교통 혼잡을 방지하기 위헤 시민 여러분께 신속 안내 드립니다."
  },
  {
    id: "N2",
    date: "2026.05.15",
    title: "춘천시내버스 300번 운행 노선 및 정류소 변경",
    summary: "춘천 시내버스 300번 운행 노선이 한림대학교 통학 시점 혼잡 우려로 일부 단축 조정 및 정차 지점 변경이 이루어집니다. 변경 세부 기준을 본 공지에서 확인하세요."
  },
  {
    id: "N3",
    date: "2026.04.28",
    title: "춘천시내버스 일부 야간 노선 운행 시간 조정",
    summary: "춘천 시내 버스 막차 운행 시간이 배차 조정으로 인해 평균 10분 내외 단축 및 변경되오니 심야 이동 승객분들께서는 주의해 주시길 당부 드립니다."
  },
  {
    id: "N4",
    date: "2026.04.10",
    title: "한림대학교 캠퍼스 셔틀버스 정차 및 시간표 변경",
    summary: "한림대학교 셔틀버스의 캠퍼스 내 도서관 일대 공사 완료에 따라 기존 정차장소 및 노선 운행 정보가 원상 복구 및 실시간 배차가 다소 개편되었습니다."
  }
];

// Detail stations list for Bus Route 300
export const BUS_300_STATIONS = [
  { name: "춘천역 경춘선", isCompleted: true },
  { name: "춘천역환승센터", isCompleted: true },
  { name: "소양동행정복지센터", isCompleted: true },
  { name: "명동입구", isCompleted: true },
  { name: "강원도청", isCompleted: true },
  { name: "한림대학교 후문", isCompleted: true },
  { name: "한림대학교 정문 (현재)", isCompleted: true, isActive: true },
  { name: "동산A입구", isCompleted: false },
  { name: "동광오거리 교람", isCompleted: false },
  { name: "남춘천역 경춘선", isCompleted: false }
];
