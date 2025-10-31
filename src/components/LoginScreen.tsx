import React, { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-sky-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-400">Sign in to track IPs</p>
          <p className="mt-4 text-xs text-sky-400 bg-sky-900/50 p-2 rounded-md">
            Use <span className="font-mono">test@example.com</span> and{" "}
            <span className="font-mono">password</span> to log in.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-4 text-white bg-slate-700 border border-slate-600 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Email address"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-4 text-white bg-slate-700 border border-slate-600 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-5 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:-top-5 peer-focus:text-sky-400 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
