"use client";
import { useState } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { mockCameras, mockViolations } from "@/data/mockData";
import type { Camera } from "@/data/mockData";
import { Card, Badge, Button } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";
import { X, Activity, AlertTriangle, ChevronRight, MapPin, Camera as CameraIcon } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const dummyChartData = [
  { time: "10:00", val: 2 }, { time: "10:05", val: 5 }, { time: "10:10", val: 3 },
  { time: "10:15", val: 8 }, { time: "10:20", val: 4 }, { time: "10:25", val: 6 },
];

const hasApiKey = true; // Hardcoded to true to bypass env check for demo key

/* ──── Map Fallback when no API key ──── */

function CameraPopupCard({ camera, onClose }: { camera: Camera, onClose: () => void }) {
  if (!camera) return null;
  return (
    <div 
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 h-auto w-80 bg-[#0f2d5c] border border-white/10 shadow-2xl rounded-xl z-50 flex flex-col overflow-hidden cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-white/10 flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant={camera.status === 'alert' ? 'red' : 'green'}>
              {camera.status === 'alert' ? 'Active Alert' : 'Normal'}
            </Badge>
            <span className="text-[10px] text-white/70 font-mono">CAM {camera.id.toString().padStart(3, '0')}</span>
          </div>
          <h3 className="font-bold text-base text-white leading-tight">{camera.name}</h3>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1.5 hover:bg-white/10 rounded-full text-white/70 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        <div>
          <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">AI Focus Area</h4>
          <p className="text-xs font-semibold text-white leading-tight">{camera.focus}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Detections (last hr)</h4>
            <span className="text-[10px] font-bold text-blue-300">+14%</span>
          </div>
          <div className="h-12 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyChartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="var(--color-accent-blue)" fill="url(#colorVal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="font-semibold text-white/70">Detection Confidence</span>
              <span className="font-bold text-green-300">Good</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="font-semibold text-white/70">Feed Uptime</span>
              <span className="font-bold text-white">{camera.uptimePercent}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${camera.uptimePercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
        <Link href={`/camera/${camera.id}`} className="block">
          <Button variant="secondary" className="w-full group py-2 text-xs bg-white/10 hover:bg-white/20 border-white/10 text-white">
            Open Full Camera View
            <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}


function MapFallback({ onCameraClick, selectedCamera }: { onCameraClick: (cam: Camera | null) => void, selectedCamera: Camera | null }) {
  return (
    <div className="w-full h-full bg-[var(--bg-app)] relative overflow-hidden rounded-none">
      {/* Mock SVG Road Network */}
      <svg className="absolute inset-0 w-full h-full text-[#E0DCD6]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <path d="M 0 150 Q 200 150 300 250 T 800 350" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" />
        <path d="M 0 150 Q 200 150 300 250 T 800 350" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" strokeDasharray="10 10" />
        <path d="M 400 0 L 400 600" fill="none" stroke="currentColor" strokeWidth="16" />
        <path d="M 150 0 L 150 600" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M 600 0 L 600 600" fill="none" stroke="currentColor" strokeWidth="12" />
        <path d="M 0 450 L 800 450" fill="none" stroke="currentColor" strokeWidth="16" />
        <path d="M 250 150 L 250 450" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M 500 250 L 500 600" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M 0 50 L 800 100" fill="none" stroke="currentColor" strokeWidth="12" />
      </svg>
      
      {/* City blocks/parks simulation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-100/50 rounded-none blur-sm" />
      <div className="absolute bottom-20 right-20 w-48 h-40 bg-slate-200/50 rounded-none blur-sm" />
      <div className="absolute top-1/2 left-2/3 w-24 h-24 bg-blue-100/50 rounded-full blur-md" />

      {/* Warning banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-xs text-[var(--color-text-secondary)] font-medium flex items-center gap-2 z-10 border border-white">
        <MapPin size={14} className="text-[var(--color-accent-blue)]" />
        Offline Mode: Simulation Map
      </div>

      {/* Placed Cameras */}
      {mockCameras.map((cam, idx) => {
        // Arbitrary positions to spread them out on the SVG network
        const positions = [
          { top: '25%', left: '38%' },
          { top: '45%', left: '60%' },
          { top: '75%', left: '75%' },
          { top: '15%', left: '15%' },
          { top: '65%', left: '20%' },
          { top: '85%', left: '50%' },
          { top: '35%', left: '85%' },
          { top: '55%', left: '45%' },
        ];
        const pos = positions[idx % positions.length];
        return (
          <div
            role="button"
            key={cam.id}
            onClick={() => onCameraClick(cam)}
            className={`absolute group cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-1/2 ${selectedCamera?.id === cam.id ? "z-50" : "z-10"}`}
            style={pos}
          >
            <div className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110 ${
              cam.status === "alert" ? "bg-[var(--color-accent-red)] border-white text-white z-10" : "bg-white border-white text-[var(--color-text-primary)]"
            }`}>
              <CameraIcon size={18} />
              {cam.status === "alert" && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-red)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent-red)] border border-white" />
                </span>
              )}
            </div>
            {selectedCamera?.id === cam.id && (
              <CameraPopupCard camera={cam} onClose={() => onCameraClick(null)} />
            )}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[var(--color-text-primary)] text-xs px-3 py-1.5 rounded-none shadow-xl whitespace-nowrap z-20 font-semibold border border-white/40 pointer-events-none">
              {cam.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CenterColumn() {
  const { viewMode } = useAppStore();
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "MISSING_API_KEY",
  });

  const shouldShowMap = hasApiKey && isLoaded && !loadError;

  return (
    <div className="gap-4 flex flex-col h-full">
      {/* Map Container */}
      <Card className="glass-panel flex-1 p-2 relative flex items-center justify-center overflow-hidden">
        {viewMode === "map" ? (
          shouldShowMap ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={11.5}
              options={{
                disableDefaultUI: true,
                styles: [
                  { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#546e7a" }] },
                  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d8e1e8" }] },
                  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f2ee" }] },
                  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eae3d9" }] },
                  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                  { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
                ],
              }}
            >
              {mockCameras.map((cam) => (
                <OverlayView
                  key={cam.id}
                  position={{ lat: cam.lat, lng: cam.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div
                    role="button"
                    className={`group relative cursor-pointer -translate-x-1/2 -translate-y-1/2 focus:outline-none ${selectedCamera?.id === cam.id ? "z-50" : "z-10"}`}
                    onClick={() => setSelectedCamera(cam)}
                  >
                    <div className={`w-10 h-10 rounded-none border-[3px] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-110 ${
                      cam.status === "alert" ? "bg-[var(--color-accent-red)] border-white text-white z-10" : "bg-white border-white text-[var(--color-text-primary)]"
                    }`}>
                      <CameraIcon size={18} />
                      {cam.status === "alert" && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-red)] opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent-red)] border border-white" />
                        </span>
                      )}
                    </div>
                    {selectedCamera?.id === cam.id && (
                      <CameraPopupCard camera={cam} onClose={() => setSelectedCamera(null)} />
                    )}
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity glass-panel text-[var(--color-text-primary)] text-xs px-3 py-1.5 rounded-none shadow-xl whitespace-nowrap z-20 font-semibold pointer-events-none">
                      {cam.name}
                    </div>
                  </div>
                </OverlayView>
              ))}
            </GoogleMap>
          ) : (
            <MapFallback onCameraClick={setSelectedCamera} selectedCamera={selectedCamera} />
          )
        ) : (
          /* Grid View */
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

        {/* Bottom Thumbnail Strip */}
      <div className="h-28 flex space-x-4">
        {/* Latest Snapshots */}
        <div className="flex-1 flex space-x-4">
          {mockViolations.slice(0, 3).map((v) => (
            <Card key={v.id} className="flex-1 p-0 relative overflow-hidden group cursor-pointer border border-[var(--border-soft)] hover:shadow-lg transition-all bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAE6DF] to-[#F1ECE6]">
                <div className="w-full h-full flex items-center justify-center opacity-40">
                  <svg className="w-12 h-12 text-[#1D3557]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" /><circle cx="7.5" cy="14.5" r="1.5" /><circle cx="16.5" cy="14.5" r="1.5" /></svg>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs">
                    <span className="font-bold block truncate">{v.type.replace(/_/g, " ")}</span>
                    <span className="opacity-90 text-[10px]">{new Date(v.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className={`w-2 h-2 rounded-full shadow-sm ${v.severity === "severe" ? "bg-[var(--color-accent-red)]" : "bg-[var(--color-accent-amber)]"}`} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Live Tile */}
        <Card className="w-64 p-0 relative overflow-hidden group shadow-inner border border-[var(--border-soft)]">
          <div className="absolute top-3 right-3 z-10 flex items-center bg-white/80 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] animate-pulse mr-2" />
            <span className="text-[10px] font-bold text-[var(--color-text-primary)] tracking-wider uppercase">Live</span>
          </div>
          <div className="absolute bottom-3 left-3 z-10 text-[var(--color-text-primary)] text-xs drop-shadow-sm">
            <span className="font-mono bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm font-semibold">CAM 001</span>
          </div>
          <div className="w-full h-full bg-[#EAE6DF] flex flex-col items-center justify-center relative overflow-hidden">
            <svg className="absolute w-[150%] h-[150%] text-black opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 40 0 L 30 100 L 70 100 L 60 0 Z" fill="currentColor" />
              <path d="M 0 60 L 100 40 L 100 50 L 0 70 Z" fill="currentColor" />
            </svg>
            <span className="text-[var(--color-text-secondary)] font-mono text-xs z-10 font-bold tracking-wider opacity-60">REC • CAM 001</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
