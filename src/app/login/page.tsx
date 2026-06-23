"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Camera } from "lucide-react";
import { Button, Card } from "@/components/ui";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAppStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login();
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-1 h-full w-full items-center justify-center bg-gray-900 relative overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/untitled_design_720p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30 z-0 backdrop-blur-[2px]"></div>
      
      <div className="w-full max-w-md relative z-10 flex flex-col gap-6">
        {/* Transparent Header Panel */}
        <div className="px-2 py-2 flex items-center justify-center gap-5 shrink-0">
          <img src="/kar_main_logo.png" alt="KSP Logo" className="w-20 h-auto object-contain drop-shadow-xl shrink-0" />
          <div className="w-[2px] h-14 bg-white/30 shrink-0"></div>
          <div className="flex flex-col">
            <span className="text-white font-black text-[26px] leading-none tracking-wide drop-shadow-md">Karnataka State Police</span>
            <span className="text-white/80 font-bold text-[12px] uppercase tracking-widest mt-1.5 drop-shadow-md">Government of Karnataka</span>
          </div>
        </div>

        {/* Cropped Black Login Box */}
        <div className="bg-black/40 border border-white/20 backdrop-blur-md p-8 pt-10 shadow-2xl rounded-[0.5px] overflow-hidden">

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-white/90 mb-2">Officer ID / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-none border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 text-white placeholder-white/30 font-medium"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white/90 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-none border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 text-white placeholder-white/30 font-medium"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm font-medium">
            <label className="flex items-center text-white/60">
              <input type="checkbox" className="mr-2 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 shadow-sm" />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:text-white hover:underline font-bold transition-colors">Forgot?</a>
          </div>
          <Button type="submit" className="w-full mt-6 py-4 text-base font-bold shadow-md rounded-none bg-blue-600 hover:bg-blue-500 text-white border-none">
            Secure Login
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
            Protected system authorized personnel only
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
