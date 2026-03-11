"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Bot, Sparkles, Zap, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", username);
      toast.success("Welcome back!");
      router.push("/generate");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a2e] border-r border-purple-900/30 flex-col justify-center px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">SpecForge AI</h1>
            <p className="text-purple-400 text-sm">Requirements → Specifications</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Turn messy requirements into <span className="text-purple-400">developer-ready specs</span>
        </h2>
        <p className="text-gray-400 mb-10">Powered by LangChain + Flan-T5</p>

        <div className="space-y-4">
          {[
            { icon: <Sparkles size={18} />, title: "Extract Features", desc: "Auto-detect modules from raw notes" },
            { icon: <Zap size={18} />, title: "Generate User Stories", desc: "Clean, structured user stories instantly" },
            { icon: <Shield size={18} />, title: "API + DB Schema", desc: "Suggest endpoints and database design" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 bg-purple-900/20 rounded-xl p-4 border border-purple-900/30">
              <div className="text-purple-400 mt-0.5">{item.icon}</div>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Login to your SpecForge account</p>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter your username"
                className="w-full bg-[#1a1a2e] border border-purple-900/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter your password"
                className="w-full bg-[#1a1a2e] border border-purple-900/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-purple-500/20"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-purple-400 hover:text-purple-300 transition">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}