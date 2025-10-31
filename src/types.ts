export interface GeoInfo {
  ip: string;
  hostname?: string;
  city: string;
  region: string;
  country: string;
  loc: string; // "latitude,longitude"
  org?: string;
  postal: string;
  timezone: string;
}

export interface HistoryItem {
  id: string;
  ip: string;
  timestamp: number;
}
