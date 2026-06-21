"use client";
import { Card, Badge, Button } from "@/components/ui";
import { mockCameras, mockDailySummary } from "@/data/mockData";
import { Camera, AlertTriangle, ArrowUpRight, Maximize2, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export function LeftColumn() {
  const data = [
    { name: "Minor", value: mockDailySummary.bySeverity.minor, color: "var(--accent-green)" },
    { name: "Moderate", value: mockDailySummary.bySeverity.moderate, color: "var(--accent-amber)" },
    { name: "Severe", value: mockDailySummary.bySeverity.severe, color: "var(--accent-red)" },
  ];

  return (
    <div className="h-full overflow-y-auto pb-2 pr-1 hide-scrollbar">
      <div className="gap-6 flex flex-col">
      {/* Today's Monitoring Summary */}
      <Card className="flex flex-col relative">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shadow-sm backdrop-blur-sm border border-[var(--border-soft)]">
          <Maximize2 size={14} className="text-[var(--color-text-secondary)]" />
        </div>
        <div className="flex justify-between items-start mb-4 pr-10">
          <div>
            <h3 className="font-bold text-lg text-[var(--color-text-primary)]">City Surveillance</h3>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] italic">{new Date().toLocaleDateString()}</p>
          </div>
          <Badge className="bg-[var(--color-accent-red-bg)] text-[var(--color-accent-red)] animate-pulse shadow-sm border border-[var(--color-accent-red)]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] mr-1.5 shadow-sm"></span>
            LIVE 4h 12m
          </Badge>
        </div>
        
        <div className="flex space-x-2 mt-2">
          {mockCameras.map((cam) => (
            <div 
              key={cam.id} 
              className={`w-8 h-8 rounded-none flex items-center justify-center border shadow-sm ${
                cam.status === "normal" ? "border-[var(--color-accent-green)]/30 bg-[var(--color-accent-green-bg)] text-[var(--color-accent-green)]" :
                cam.status === "alert" ? "border-[var(--color-accent-red)]/30 bg-[var(--color-accent-red-bg)] text-[var(--color-accent-red)] animate-pulse" :
                "border-[var(--border-soft)] bg-black/5 text-[var(--color-text-secondary)]"
              }`}
              title={cam.name}
            >
              <Camera size={14} />
            </div>
          ))}
        </div>
      </Card>

      {/* Violation Summary Donut */}
      <Card className="glass-panel flex flex-col shrink-0 relative">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shadow-sm backdrop-blur-sm border border-[var(--border-soft)]">
          <ArrowUpRight size={14} className="text-[var(--color-text-secondary)]" />
        </div>
        <h3 className="font-bold text-[var(--color-text-primary)] mb-4 text-lg">Violations Today</h3>
        <div className="relative h-48 w-full shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-black text-[var(--color-text-primary)] leading-none tracking-tight">{mockDailySummary.totalViolations}</span>
            <span className="text-xs text-[var(--color-text-secondary)] uppercase font-bold tracking-widest mt-1">Total</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2 shadow-sm border border-[var(--border-soft)]" style={{ backgroundColor: item.color }}></span>
                <span className="font-medium text-[var(--color-text-secondary)]">{item.name}</span>
              </div>
              <span className="font-bold text-base text-[var(--color-text-primary)]">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Violation Trend Mini-Chart */}
      <Card className="glass-panel relative">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shadow-sm backdrop-blur-sm z-10 border border-[var(--border-soft)]">
          <ArrowUpRight size={14} className="text-[var(--color-text-secondary)]" />
        </div>
        <div className="flex justify-between items-start mb-4 pr-10">
          <div>
            <h3 className="font-bold text-[var(--color-text-primary)] text-lg">Violation Trend</h3>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] italic mt-0.5">24 hour activity pattern</p>
          </div>
          <Badge className="bg-[var(--color-accent-amber-bg)] text-[var(--color-accent-amber)] border-none shadow-sm backdrop-blur-md font-bold border border-[var(--color-accent-amber)]/20">Rising</Badge>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockDailySummary.trend24h} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-red)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-red)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: '12px' }}
                labelStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="var(--accent-red)" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 4. Real-time Alert Feed */}
      <Card className="glass-panel relative flex flex-col shrink-0">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg">Real-time Alerts</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-[var(--border-soft)] last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-none bg-[var(--color-accent-red-bg)] flex items-center justify-center shrink-0 border border-[var(--color-accent-red)]/20">
                <AlertTriangle size={14} className="text-[var(--color-accent-red)]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--color-text-primary)]">Red Light Violation</p>
                <p className="text-[10px] font-medium text-[var(--color-text-secondary)]">Cam 0{i} • Just now</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. System Connectivity / Uptime */}
      <Card className="glass-panel relative flex flex-col shrink-0">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg">System Health</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent-green-bg)] flex items-center justify-center border border-[var(--color-accent-green)]/30">
              <Activity size={16} className="text-[var(--color-accent-green)]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--color-text-primary)] leading-tight">99.9%</p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Network Uptime</p>
            </div>
          </div>
          <Badge className="bg-[var(--color-accent-green-bg)] text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/20 font-bold">Stable</Badge>
        </div>
      </Card>

      {/* 6. Shift Supervisor Status */}
      <Card className="glass-panel relative flex flex-col shrink-0">
        <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg">Shift Status</h3>
        <div className="flex items-center gap-3 bg-black/5 p-3 rounded-none border border-[var(--border-soft)]">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-[var(--color-accent-blue)] font-bold border border-blue-500/20 shadow-sm">
            JD
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">Officer John Doe</p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">Duty Officer • Shift A</p>
          </div>
        </div>
      </Card>

      </div>
    </div>
  );
}
