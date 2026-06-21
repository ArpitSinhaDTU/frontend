"use client";
import { useAppStore } from "@/store/useAppStore";
import { Card, Badge, Button } from "@/components/ui";
import { Activity, Clock, LayoutGrid, Map as MapIcon, CheckCircle2 } from "lucide-react";

export function TopBar() {
  const { viewMode, setViewMode, isLive, toggleLive } = useAppStore();
  
  return (
    <div className="flex items-center justify-between mb-2 glass-panel px-6 py-4">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl text-[var(--color-text-primary)]">
          <span className="font-bold">City Surveillance</span>
          <span className="font-medium italic text-lg ml-2 opacity-60">Live Monitoring</span>
        </h1>
        <div className="flex items-center glass-panel rounded-full p-1 shadow-sm">
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === "map" ? "bg-white/40 text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-transparent"
            }`}
          >
            <MapIcon size={16} className="mr-2" />
            Map View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === "grid" ? "bg-white/40 text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-transparent"
            }`}
          >
            <LayoutGrid size={16} className="mr-2" />
            Grid View
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleLive}
          className="flex items-center space-x-2 bg-(--color-accent-green-bg) text-(--color-accent-green) px-4 py-2 rounded-none border-none shadow-none hover:bg-(--color-accent-green-bg)/80 transition-colors text-sm font-medium"
        >
          {isLive ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-green) animate-pulse" />
              <span>Live Feed</span>
            </>
          ) : (
            <>
              <Clock size={16} />
              <span>Recorded</span>
            </>
          )}
        </button>
        
        <div className="flex items-center bg-[var(--color-accent-blue-bg)] text-[var(--color-accent-blue)] px-3 py-1.5 text-sm rounded-none font-medium border border-[var(--color-accent-blue)]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] mr-2" />
          All Systems Operational
        </div>
        
        <div className="text-sm font-medium text-[var(--color-text-secondary)] glass-panel px-4 py-2 rounded-none">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
