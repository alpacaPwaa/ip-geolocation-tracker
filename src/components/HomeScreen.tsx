import React, { useState, useEffect, useCallback } from "react";
import HistoryList from "./HistoryList";
import MapDisplay from "./MapDisplay";
import Spinner from "./Spinner";
import GeoInfoCard from "./GeoInforCard";
import type { GeoInfo, HistoryItem } from "../types";

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const [currentUserGeoInfo, setCurrentUserGeoInfo] = useState<GeoInfo | null>(
    null
  );
  const [displayGeoInfo, setDisplayGeoInfo] = useState<GeoInfo | null>(null);
  const [searchIp, setSearchIp] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem("ipHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://ipinfo.io/";

  useEffect(() => {
    localStorage.setItem("ipHistory", JSON.stringify(history));
  }, [history]);

  const fetchGeoInfo = useCallback(async (ipAddress: string = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const url = ipAddress ? `${API_URL}${ipAddress}/json` : `${API_URL}json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Invalid IP address or API error.");
      }
      const data: GeoInfo = await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getInitialData = async () => {
      const data = await fetchGeoInfo();
      if (data) {
        setCurrentUserGeoInfo(data);
        setDisplayGeoInfo(data);
      }
    };
    getInitialData();
  }, [fetchGeoInfo]);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchIp) return;

    const data = await fetchGeoInfo(searchIp);
    if (data) {
      setDisplayGeoInfo(data);
      if (!history.some((item) => item.ip === searchIp)) {
        const newItem: HistoryItem = {
          id: crypto.randomUUID(),
          ip: searchIp,
          timestamp: Date.now(),
        };
        setHistory((prev) => [newItem, ...prev]);
      }
      setSearchIp("");
    }
  };

  const handleHistoryClick = async (ip: string) => {
    const data = await fetchGeoInfo(ip);
    if (data) {
      setDisplayGeoInfo(data);
    }
  };

  const handleClear = () => {
    setDisplayGeoInfo(currentUserGeoInfo);
    setError(null);
  };

  const handleDeleteHistory = () => {
    setHistory((prev) =>
      prev.filter((item) => !selectedHistoryIds.has(item.id))
    );
    setSelectedHistoryIds(new Set());
  };

  const handleHistorySelectionChange = (id: string) => {
    setSelectedHistoryIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-400">
          IP Geolocation Tracker
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <form
            onSubmit={handleSearch}
            className="bg-slate-800 p-4 rounded-lg shadow-lg"
          >
            <label
              htmlFor="ip-search"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Search for any IP address
            </label>
            <div className="flex gap-2">
              <input
                id="ip-search"
                type="text"
                value={searchIp}
                onChange={(e) => setSearchIp(e.target.value)}
                placeholder="e.g., 8.8.8.8"
                className="grow bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {isLoading && !displayGeoInfo && (
            <div className="flex justify-center p-8">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="relative flex gap-2 flex-col">
            {isLoading && displayGeoInfo && (
              <div className="absolute inset-0 bg-slate-800/50 flex justify-center items-center z-10 rounded-lg">
                <Spinner />
              </div>
            )}
            {displayGeoInfo && <GeoInfoCard data={displayGeoInfo} />}
            {displayGeoInfo &&
              currentUserGeoInfo &&
              displayGeoInfo.ip !== currentUserGeoInfo.ip &&
              history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Clear
                </button>
              )}
          </div>

          <HistoryList
            history={history}
            selectedIds={selectedHistoryIds}
            onItemClick={handleHistoryClick}
            onSelectionChange={handleHistorySelectionChange}
            onDelete={handleDeleteHistory}
          />
        </div>

        <div className="lg:col-span-2 h-[50vh] lg:h-auto min-h-[400px] bg-slate-800 rounded-lg shadow-lg">
          <MapDisplay geoInfo={displayGeoInfo} />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
