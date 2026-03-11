"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Bot, Sparkles, LogOut, User, Zap, Shield, Code, ChevronDown, ChevronUp, Download } from "lucide-react";

interface SpecResult {
  features: string;
  user_stories: string;
  api_and_schema: string;
}

export default function GeneratePage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState("");
  const [result, setResult] = useState<SpecResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>(["features", "user_stories", "api_and_schema"]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (!token) {
      router.push("/login");
      return;
    }
    setUsername(user || "User");
  }, [router]);

  const handleGenerate = async () => {
    if (!requirements.trim()) {
      toast.error("Please enter your requirements");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://kishorem2510-specforge-backend.hf.space/generate",
        { requirements },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
      toast.success("Specs generated successfully!");
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        router.push("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleExportJSON = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "specforge-output.json";
    a.click();
    toast.success("JSON exported!");
  };

  const sampleRequirements = [
    "Build a food delivery app where users can order food, track delivery, and pay online. Restaurants can manage menus and orders.",
    "Create an e-learning platform where students can enroll in courses, watch videos, take quizzes, and get certificates.",
    "Develop a task management tool where teams can create projects, assign tasks, set deadlines, and track progress.",
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Header */}
      <div className="bg-[#1a1a2e] border-b border-purple-900/30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">SpecForge AI</h1>
              <p className="text-purple-400 text-xs">Requirements → Specifications</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center">
                <User size={12} className="text-white" />
              </div>
              <span className="text-white text-sm">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Generate <span className="text-purple-400">Developer Specs</span>
          </h2>
          <p className="text-gray-400">Paste your raw requirements and get structured specs instantly</p>
        </div>

        {/* Input Section */}
        <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl p-6 mb-6">
          <label className="text-gray-400 text-sm mb-2 block font-medium">Your Requirements</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Describe your product requirements here... e.g. 'Build a food delivery app where users can order food, track delivery in real-time, and pay online. Restaurants can manage their menus and view incoming orders.'"
            className="w-full bg-[#0f0f1a] border border-purple-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition resize-none"
            rows={6}
          />

          {/* Sample Prompts */}
          <div className="mt-3">
            <p className="text-gray-500 text-xs mb-2">Try a sample:</p>
            <div className="flex flex-wrap gap-2">
              {sampleRequirements.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => setRequirements(sample)}
                  className="text-xs text-purple-400 hover:text-purple-300 bg-purple-900/20 hover:bg-purple-900/30 border border-purple-900/30 px-3 py-1.5 rounded-lg transition"
                >
                  Sample {i + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !requirements.trim()}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
                Generating Specs...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Specifications
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Export Button */}
            <div className="flex justify-end">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 bg-purple-900/20 border border-purple-900/30 px-4 py-2 rounded-xl transition"
              >
                <Download size={16} />
                Export JSON
              </button>
            </div>

            {/* Features */}
            <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection("features")}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-purple-900/10 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-900/40 rounded-lg flex items-center justify-center">
                    <Zap size={16} className="text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Extracted Features</span>
                </div>
                {expandedSections.includes("features") ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
              </button>
              {expandedSections.includes("features") && (
                <div className="px-6 pb-4">
                  <div className="bg-[#0f0f1a] rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-purple-900/20">
                    {result.features}
                  </div>
                </div>
              )}
            </div>

            {/* User Stories */}
            <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection("user_stories")}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-purple-900/10 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-900/40 rounded-lg flex items-center justify-center">
                    <Sparkles size={16} className="text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">User Stories</span>
                </div>
                {expandedSections.includes("user_stories") ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
              </button>
              {expandedSections.includes("user_stories") && (
                <div className="px-6 pb-4">
                  <div className="bg-[#0f0f1a] rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-purple-900/20">
                    {result.user_stories}
                  </div>
                </div>
              )}
            </div>

            {/* API + Schema */}
            <div className="bg-[#1a1a2e] border border-purple-900/30 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection("api_and_schema")}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-purple-900/10 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-900/40 rounded-lg flex items-center justify-center">
                    <Code size={16} className="text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">API Endpoints + DB Schema</span>
                </div>
                {expandedSections.includes("api_and_schema") ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
              </button>
              {expandedSections.includes("api_and_schema") && (
                <div className="px-6 pb-4">
                  <div className="bg-[#0f0f1a] rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-purple-900/20">
                    {result.api_and_schema}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}