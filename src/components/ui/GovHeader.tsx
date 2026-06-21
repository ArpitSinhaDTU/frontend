import React from "react";
import { Shield } from "lucide-react";

export function GovHeader() {
  return (
    <div className="gov-header-wrapper w-full bg-white shadow-md border-b-[4px] border-red-700 z-50 sticky top-0 flex flex-col">
      {/* TOP ROW - Utility Bar */}
      <div className="flex items-center justify-between text-xs font-bold py-1.5 px-8 bg-[#0f2d5c] text-white">
        <div className="flex items-center">
          <a href="https://www.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" className="tracking-wide uppercase hover:text-amber-400 transition-colors flex items-center gap-2">
            Official Website of GoK
          </a>
        </div>
        <div className="flex items-center gap-6 text-white/90">
          <button className="uppercase tracking-widest hover:text-white transition-colors bg-white/10 px-3 py-1 rounded text-[11px]">
            ಕನ್ನಡ / English
          </button>
          <div className="h-4 w-px bg-white/30"></div>
          <div className="flex items-center gap-4">
            <a href="https://www.youtube.com/@karnatakastatepolice6684" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/karnatakacops/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/KarnatakaCops/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com/DgpKarnataka" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW - Logos and Authorities */}
      <div className="flex items-center justify-between py-3 px-10 bg-white">
        {/* Left - Chief Minister */}
        <div className="flex items-center">
          <img src="/chief_minister_of_karrnataka_en.png" alt="Chief Minister" className="h-16 w-auto object-contain" />
        </div>

        {/* Center - Karnataka Police */}
        <div className="flex items-center gap-5 translate-x-4">
          <img src="/kar_main_logo.png" alt="Karnataka State Police" className="w-20 h-auto object-contain drop-shadow-sm" />
          <div className="flex flex-col border-l-2 border-gray-300 pl-5 py-2">
            <span className="font-black text-[26px] leading-tight text-[#0f2d5c] tracking-wide">Karnataka State Police</span>
            <span className="text-sm text-gray-600 font-bold tracking-widest uppercase mt-1">Government of Karnataka</span>
          </div>
        </div>

        {/* Right - Minister */}
        <div className="flex items-center">
          <img src="/priyank_kharge_2.jpeg" alt="Minister" className="h-16 w-auto object-contain" />
        </div>
      </div>

      {/* TICKER ROW - Emergency Numbers */}
      <div className="w-full bg-[#1e293b] text-white py-2 overflow-hidden border-t-2 border-red-700/20 flex items-center relative z-0">
        <div className="absolute left-0 top-0 bottom-0 bg-red-700 text-white font-bold uppercase tracking-wider px-6 flex items-center z-10 shadow-[4px_0_15px_rgba(0,0,0,0.5)] text-sm">
          Emergency Lines
        </div>
        <div className="animate-marquee whitespace-nowrap pl-[200px] font-medium text-sm inline-flex items-center w-max">
          <span className="mx-6 inline-flex items-center gap-2">🚨 Police Emergency (ERSS): <span className="font-black text-amber-400 text-base">112</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">🚓 Police (legacy): <span className="font-black text-amber-400 text-base">100</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">🚦 National Highway Traffic Emergency: <span className="font-black text-amber-400 text-base">1073</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">🚑 Ambulance: <span className="font-black text-amber-400 text-base">108</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">🚒 Fire: <span className="font-black text-amber-400 text-base">101</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">👩 Women&apos;s Helpline: <span className="font-black text-amber-400 text-base">1091</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">👶 Child Helpline: <span className="font-black text-amber-400 text-base">1098</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">💻 Cyber Fraud Helpline: <span className="font-black text-amber-400 text-base">1930</span></span> <span className="text-white/30">|</span>
          <span className="mx-6 inline-flex items-center gap-2">📞 Bengaluru Traffic Police Citizen Support: <span className="font-black text-amber-400 text-base">080-22943381</span></span>
        </div>
      </div>
    </div>
  );
}
