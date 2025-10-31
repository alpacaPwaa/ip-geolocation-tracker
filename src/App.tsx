import React, { useState, useCallback, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback(() => {
    localStorage.setItem("authToken", "dummy-token");
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {isAuthenticated ? (
        <HomeScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
