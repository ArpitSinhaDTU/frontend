"use client";

import { Camera } from "@/data/mockData";
import { Badge, Button } from "@/components/ui";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const dummyChartData = [
  { time: "10:00", val: 2 }, { time: "10:05", val: 5 }, { time: "10:10", val: 3 },
  { time: "10:15", val: 8 }, { time: "10:20", val: 4 }, { time: "10:25", val: 6 },
];

export function CameraPopupCard({ camera, onClose }: { camera: Camera, onClose: () => void }) {
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

        {(camera.id === 6 || camera.id === 7) && (
          <div className="bg-red-600/90 border border-red-500 rounded p-2 text-white text-[10px] leading-tight mt-2 font-bold">
            📍 Alert: Location sent to nearest Police Station, Fire Station & Hospital using MapMyIndia Nearby Places & Reverse Geocode API
          </div>
        )}

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
