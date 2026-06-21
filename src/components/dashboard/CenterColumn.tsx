"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { mockCameras, mockViolations } from "@/data/mockData";
import type { Camera } from "@/data/mockData";
import { Card, Badge, Button } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";
import { X, ChevronRight, MapPin, Camera as CameraIcon, Info } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0f2d5c] flex flex-col items-center justify-center relative overflow-hidden rounded-xl border border-white/10">
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <h3 className="text-sm font-bold text-white tracking-wide">LOADING SYSTEM MAP</h3>
      </div>
    </div>
  ),
});

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const dummyChartData = [
  { time: "10:00", val: 2 }, { time: "10:05", val: 5 }, { time: "10:10", val: 3 },
  { time: "10:15", val: 8 }, { time: "10:20", val: 4 }, { time: "10:25", val: 6 },
];

export function CenterColumn() {
  const { viewMode } = useAppStore();
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  return (
    <div className="gap-4 flex flex-col h-full">
      {viewMode === "map" && (
        <div className="bg-[var(--color-accent-blue-bg)] border border-[var(--color-accent-blue)]/30 text-[var(--color-text-primary)] px-4 py-3 rounded-lg text-xs flex items-start shrink-0 shadow-sm backdrop-blur-sm">
          <Info size={16} className="mr-3 mt-0.5 text-[var(--color-accent-blue)] shrink-0" />
          <p className="leading-relaxed">
            <strong>Interactive Map:</strong> Scroll the map around Bengaluru to see camera icons. Double tap to open the camera details, and click &quot;Open Full Camera View&quot; for complete details.
          </p>
        </div>
      )}
      <Card className="glass-panel flex-1 p-2 relative flex items-center justify-center overflow-hidden">
        {viewMode === "map" ? (
          <LeafletMap 
            cameras={mockCameras} 
            selectedCameraId={selectedCamera?.id} 
            onCameraSelect={setSelectedCamera} 
            center={center} 
            zoom={11.5} 
          />
        ) : (
          <div className="w-full h-full p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto content-start">
            {mockCameras.map(cam => (
              <div
                key={cam.id}
                className="glass-panel hover:bg-white/10 transition-colors p-4 cursor-pointer flex flex-col h-fit"
                onClick={() => setSelectedCamera(cam)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-2 h-2 rounded-full ${cam.status === "alert" ? "bg-[var(--color-accent-red)] animate-pulse" : "bg-[var(--color-accent-green)]"}`} />
                  <span className="text-xs text-[var(--color-text-secondary)]">ID: {cam.id}</span>
                </div>
                <h4 className="font-bold text-sm mb-1 truncate text-[var(--color-text-primary)]">{cam.name}</h4>
                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{cam.focus}</p>
              </div>
            ))}
          </div>
        )}

        </Card>


    </div>
  );
}
