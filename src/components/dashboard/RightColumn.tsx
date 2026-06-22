"use client";
import { useState } from "react";
import { Card, Badge, Button } from "@/components/ui";
import { mockDailySummary, mockMapplsExtras, mockCameras } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight, Clock, Route, MapPin } from "lucide-react";
import { GlobalPdfDownloadButton } from "@/components/pdf/GlobalPdfDownloadButton";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0a192f] flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  ),
});

const center = {
  lat: 12.9716, // Bengaluru
  lng: 77.5946
};

export function RightColumn() {
  const [wardViolationsFilter, setWardViolationsFilter] = useState(30);

  return (
    <div className="h-full overflow-y-auto pb-2 pr-1 hide-scrollbar bg-transparent">
      <div className="gap-6 flex flex-col bg-transparent">
      <div className="flex flex-col mb-4 shrink-0">
        <div className="self-start inline-flex flex-col px-4 py-2.5 mb-3 bg-[#0f2d5c]" style={{ borderRadius: "12px" }}>
          <h2 className="font-bold text-lg text-white tracking-tight whitespace-nowrap">
            City Wide Geo Analytics
          </h2>
        </div>
        <div className="flex items-center justify-start">
          <span className="text-[14px] text-[#0f2d5c] font-black mr-3 tracking-wide">By:-</span>
          <div className="bg-white rounded-none shadow-sm px-4 py-2 border border-gray-100">
            <img src="/by_logo.png" alt="Powered By" className="h-12 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Zone-wise Violation Heatmap */}
      <Card className="glass-panel relative flex flex-col shrink-0 p-0 overflow-hidden">
        <div className="p-4 pb-2 z-10 relative">
          <h3 className="font-bold text-[var(--color-text-primary)]">Live Map Preview</h3>
          <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 font-medium">
            Thematic layer colored by violation_count
          </p>
        </div>
        
        <div className="w-full h-64 rounded-none overflow-hidden relative border-t border-b border-[var(--border-soft)] bg-[#EAE6DF] z-0 mt-2">
          <LeafletMap 
            cameras={[]} 
            center={center} 
            zoom={10} 
          />
          {/* Decorative shapes to simulate thematic map regions overlaid on the real map */}
          <div className="absolute top-2 left-2 w-24 h-24 bg-[var(--color-accent-red)]/40 rounded-full blur-2xl z-[500] pointer-events-none mix-blend-screen"></div>
          <div className="absolute bottom-2 right-2 w-32 h-20 bg-[var(--color-accent-amber)]/40 rounded-[40%] blur-2xl z-[500] pointer-events-none mix-blend-screen"></div>
          <div className="absolute top-10 right-10 w-16 h-16 bg-[var(--color-accent-green)]/40 rounded-full blur-xl z-[500] pointer-events-none mix-blend-screen"></div>
        </div>
        
        <div className="p-4 pt-3 flex justify-between items-center text-[10px] font-bold text-[var(--color-text-secondary)] bg-black/5 uppercase tracking-wider">
          <span>Low</span>
          <div className="flex-1 h-1.5 mx-3 rounded-full bg-linear-to-r from-[var(--color-accent-green)] via-[var(--color-accent-amber)] to-[var(--color-accent-red)]"></div>
          <span>High Density</span>
        </div>
      </Card>

      {/* Hotspot Ranking */}
      <Card className="glass-panel flex-1 min-h-[260px] flex flex-col relative shrink-0">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-1">Hotspot Ranking</h3>
        <p className="text-[10px] text-[var(--color-text-secondary)] mb-5 font-medium">
          Derived from Mappls administrative boundary + PoI layer
        </p>
        
        <div className="gap-4 flex flex-col overflow-y-auto pr-2 flex-1">
          {mockDailySummary.hotspots.map((hotspot, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center overflow-hidden">
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-black/5 text-xs font-bold text-[var(--color-text-primary)] mr-3 shrink-0 border border-[var(--border-soft)]">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{hotspot.location}</span>
              </div>
              <div className="flex items-center shrink-0 ml-2">
                <span className="font-bold text-[var(--color-text-primary)] mr-2">{hotspot.count}</span>
                {hotspot.trend === "up" ? (
                  <ArrowUpRight size={14} className="text-[var(--color-accent-red)]" />
                ) : (
                  <ArrowDownRight size={14} className="text-[var(--color-accent-green)]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Coverage & Response Readiness */}
          <Card className="glass-panel shrink-0 relative overflow-hidden">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-1">Coverage Readiness</h3>
            <p className="text-[10px] text-[var(--color-text-secondary)] mb-4 font-medium">
              Coverage radius modeled via Mappls Driving Range Polygon API
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-blue-bg)] border-2 border-[var(--color-accent-blue)]/30 flex items-center justify-center relative">
                <div className="absolute w-8 h-8 rounded-full bg-[var(--color-accent-blue)]/40 animate-ping"></div>
                <MapPin size={16} className="text-[var(--color-accent-blue)] relative z-10" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--color-text-primary)]">{mockMapplsExtras.coverage.percentage}% Monitored</div>
                <div className="text-xs text-[var(--color-text-secondary)] font-medium">&lt; {mockMapplsExtras.coverage.radiusMins} min response</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-soft)] text-xs flex justify-between font-semibold">
              <span className="text-[var(--color-text-secondary)]">Coverage gap zones:</span>
              <span className="text-[var(--color-accent-amber)] font-bold">{mockMapplsExtras.coverage.gapZones}</span>
            </div>
          </Card>

          {/* 4. Predictive ETA to Hotspots */}
          <Card className="glass-panel shrink-0">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-1">Predictive ETA to Hotspots</h3>
            <p className="text-[10px] text-[var(--color-text-secondary)] mb-4 font-medium">
              Estimated response time via Mappls Distance Matrix API
            </p>
            <div className="space-y-3">
              {mockMapplsExtras.etas.map((eta, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[var(--color-text-primary)] truncate mr-2">{eta.location}</span>
                  <div className="flex items-center text-[var(--color-accent-blue)] shrink-0 font-bold bg-[var(--color-accent-blue-bg)] px-2 py-1 rounded-none">
                    <Clock size={12} className="mr-1.5" />
                    {eta.etaMin} min
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[var(--color-text-secondary)] mt-4 text-center italic">
              Mock estimates live traffic adjusted ETA requires approved Mappls API key
            </p>
          </Card>

          {/* 5. Administrative Ward Breakdown */}
          <Card className="glass-panel shrink-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-[var(--color-text-primary)]">Ward Breakdown</h3>
            </div>
            <p className="text-[10px] text-[var(--color-text-secondary)] mb-4 font-medium">
              Boundary data via Mappls GeoAnalytics Listing API
            </p>
            
            <div className="bg-black/5 p-2 rounded-none mb-4 flex items-center justify-between text-xs border border-[var(--border-soft)]">
              <span className="text-[var(--color-text-primary)] font-semibold px-2">Show wards with &gt;</span>
              <input 
                type="number" 
                value={wardViolationsFilter}
                onChange={(e) => setWardViolationsFilter(parseInt(e.target.value) || 0)}
                className="w-14 text-center border border-[var(--border-soft)] rounded-none px-2 py-1 bg-white/50 text-[var(--color-text-primary)] focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="grid grid-cols-12 gap-2 text-[var(--color-text-secondary)] font-bold mb-2 border-b border-[var(--border-soft)] pb-2 uppercase tracking-wider text-[10px]">
                <div className="col-span-6">Ward Name</div>
                <div className="col-span-3 text-right">Count</div>
                <div className="col-span-3 text-right">Tier</div>
              </div>
              {mockMapplsExtras.wards
                .filter(w => w.violations > wardViolationsFilter)
                .map((ward, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center py-1.5 border-b border-[var(--border-soft)]/50 last:border-0">
                  <div className="col-span-6 font-semibold text-[var(--color-text-primary)] truncate">{ward.name}</div>
                  <div className="col-span-3 text-right font-bold text-[var(--color-text-primary)]">{ward.violations}</div>
                  <div className="col-span-3 text-right">
                    <span className={`text-[10px] px-2 py-1 rounded-none font-bold uppercase tracking-wide ${
                      ward.tier === 'High' ? 'bg-[var(--color-accent-red-bg)] text-[var(--color-accent-red)]' : 
                      ward.tier === 'Medium' ? 'bg-[var(--color-accent-amber-bg)] text-[var(--color-accent-amber)]' : 'bg-[var(--color-accent-green-bg)] text-[var(--color-accent-green)]'
                    }`}>
                      {ward.tier}
                    </span>
                  </div>
                </div>
              ))}
              {mockMapplsExtras.wards.filter(w => w.violations > wardViolationsFilter).length === 0 && (
                <div className="text-center text-[var(--color-text-secondary)] py-4 font-semibold">No wards match filter</div>
              )}
            </div>
          </Card>

          {/* 6. Patrol Route Optimizer */}
          <Card className="glass-panel shrink-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-[var(--color-text-primary)]">Route Optimizer</h3>
              <Route size={16} className="text-[var(--color-accent-blue)]" />
            </div>
            <p className="text-[10px] text-[var(--color-text-secondary)] mb-4 font-medium">
              Sequenced via Mappls Route Optimization API
            </p>
            <div className="mb-3 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
              Suggested patrol sequence:
            </div>
            <div className="relative pl-5 space-y-4 mb-4 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--border-soft)]">
              {mockMapplsExtras.routeOptimizer.sequence.map((loc, idx) => (
                <div key={idx} className="relative text-xs font-semibold text-[var(--color-text-primary)]">
                  <div className="absolute -left-[23px] top-0.5 w-3 h-3 rounded-full bg-white border-2 border-[var(--color-accent-blue)] shadow-sm"></div>
                  {idx + 1}. {loc}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-soft)] text-xs font-bold text-[var(--color-text-secondary)] flex justify-between items-center uppercase tracking-wider">
              <span>Total route time:</span>
              <span className="text-sm font-black text-[var(--color-text-primary)]">{mockMapplsExtras.routeOptimizer.totalTimeMin} min</span>
            </div>
          </Card>

      <GlobalPdfDownloadButton />
      </div>
    </div>
  );
}
