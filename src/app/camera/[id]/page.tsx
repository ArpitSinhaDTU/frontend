"use client";
import { use, useState, useCallback } from "react";
import { Badge, Card, Button } from "@/components/ui";
import { mockViolations, mockCameras, type Violation, type Camera as CameraType } from "@/data/mockData";
import { Camera, ChevronLeft, Clock, Search, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { PdfDownloadButton } from "@/components/pdf/PdfDownloadButton";

/* ──────────────── Toast component ──────────────── */
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-none shadow-2xl text-sm font-medium flex items-center gap-2 animate-[slideUp_0.3s_ease-out]"
      onAnimationEnd={() => setTimeout(onDone, 2200)}
    >
      <Zap size={16} className="text-amber-400" />
      {message}
    </div>
  );
}

/* ──────────────── Evidence Table per camera type ──────────────── */
function getEvidenceImageForCamera(cameraId: number): string | null {
  switch (cameraId) {
    case 2: return "/cam2_violation.png";
    case 3: return "/cam3_violation.jpeg";
    case 4: return "/cam4_violation.png";
    case 5: return "/cam5_violation.png";
    case 6: return "/cam6_annotated.png";
    case 7: return "/cam7_violation.png";
    case 9: return "/image.png";
    default: return null;
  }
}

function EvidenceTable({ violations, camera, onAction }: { violations: Violation[]; camera: CameraType; onAction: (msg: string) => void }) {
  const cameraId = camera.id;
  // Determine extra columns per camera type
  const extraCols = getExtraColumns(cameraId);

  return (
    <div className="flex-1 overflow-auto rounded-none border border-(--color-border-soft)">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 text-xs uppercase text-(--color-text-secondary) sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-semibold border-b">Timestamp</th>
            <th className="px-4 py-3 font-semibold border-b">Vehicle</th>
            <th className="px-4 py-3 font-semibold border-b">Violation</th>
            {extraCols.map(col => <th key={col} className="px-4 py-3 font-semibold border-b">{col}</th>)}
            <th className="px-4 py-3 font-semibold border-b">Confidence</th>
            {cameraId !== 6 && cameraId !== 7 && <th className="px-4 py-3 font-semibold border-b">Plate</th>}
            <th className="px-4 py-3 font-semibold border-b">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border-soft)">
          {violations.map((v) => (
            <tr key={v.id} className="hover:bg-gray-50/50">
              <td suppressHydrationWarning className="px-4 py-3 text-gray-500 font-mono text-xs">{new Date(v.timestamp).toLocaleTimeString()}</td>
              <td className="px-4 py-3">
                <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                  {getEvidenceImageForCamera(cameraId) ? (
                    <img src={getEvidenceImageForCamera(cameraId)!} alt="Evidence" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={16} className="text-gray-400" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant={v.severity === "severe" ? "red" : v.severity === "moderate" ? "amber" : "neutral"}>
                  {v.type.replace(/_/g, " ").toUpperCase()}
                </Badge>
              </td>
              {renderExtraCells(v, cameraId)}
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${v.confidence > 90 ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${v.confidence}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{v.confidence}%</span>
                </div>
              </td>
              {cameraId !== 6 && cameraId !== 7 && <td className="px-4 py-3 font-mono font-medium">{v.numberPlate || "N/A"}</td>}
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <Button variant="outline" className="text-xs px-2 py-1 h-auto hover:bg-blue-50 text-(--color-accent-blue)" onClick={() => onAction(`Violation ${v.id} marked as reviewed (simulated)`)}>
                    Review
                  </Button>
                  {cameraId !== 6 && cameraId !== 7 && (
                    <Button className="text-xs px-2 py-1 h-auto bg-red-500 hover:bg-red-600" onClick={() => onAction(`E-Challan generated for ${v.numberPlate || v.id} (simulated)`)}>
                      E-Challan
                    </Button>
                  )}
                  {((cameraId >= 2 && cameraId <= 7) || cameraId === 9) && (
                    <PdfDownloadButton camera={camera} violation={v} />
                  )}
                </div>
              </td>
            </tr>
          ))}
          {violations.length === 0 && (
            <tr><td colSpan={7 + getExtraColumns(cameraId).length} className="px-4 py-8 text-center text-gray-400">No violations recorded for this camera</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function getExtraColumns(cameraId: number): string[] {
  switch (cameraId) {
    case 2: return ["Riders"];
    case 3: return ["Signal State"];
    case 4: return ["Speed", "Limit"];
    case 5: return ["Duration", "Limit"];
    case 6: return ["Headcount", "Risk"];
    default: return [];
  }
}

function renderExtraCells(v: Violation, cameraId: number) {
  switch (cameraId) {
    case 2: return <td className="px-4 py-3 font-semibold">{v.ridersCount ?? "N/A"}</td>;
    case 3: return <td className="px-4 py-3"><Badge variant={v.signalState === "red" ? "red" : "green"}>{v.signalState?.toUpperCase() ?? "N/A"}</Badge></td>;
    case 4: return <><td className="px-4 py-3 font-mono">{v.recordedSpeed ?? "N/A"} km/h</td><td className="px-4 py-3 font-mono">{v.speedLimit ?? "N/A"} km/h</td></>;
    case 5: return <><td className="px-4 py-3">{v.parkDuration ?? "N/A"} min</td><td className="px-4 py-3">{v.parkLimit ?? "N/A"} min</td></>;
    case 6: return <><td className="px-4 py-3 font-semibold">{v.headcount ?? "N/A"}</td><td className="px-4 py-3"><Badge variant={v.riskLevel === "high" || v.riskLevel === "critical" ? "red" : v.riskLevel === "moderate" ? "amber" : "green"}>{v.riskLevel?.toUpperCase() ?? "N/A"}</Badge></td></>;
    default: return null;
  }
}

/* ══════════════════ Per-Camera AI Pane Modules ══════════════════ */

function Cam1_VehicleDetection() {
  const [mode, setMode] = useState<"original" | "detection">("original");
  return (
    <div className="relative w-full h-full bg-gray-900 border border-gray-700 rounded-none overflow-hidden flex flex-col">
      {/* Mode toggle */}
      <div className="absolute top-3 right-3 z-20 flex bg-black/70 rounded-full p-0.5">
        <button onClick={() => setMode("original")} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${mode === "original" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Original Image</button>
        <button onClick={() => setMode("detection")} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${mode === "detection" ? "bg-green-500 text-white" : "text-white/60 hover:text-white"}`}>Detection Output</button>
      </div>
      
      <div className="w-full flex-1 relative bg-black flex items-center justify-center">
        {mode === "original" && (
          <img src="/1_original_input.png" alt="Original Input" className="w-full h-full object-contain" />
        )}
        {mode === "detection" && (
          <img src="/full_pipeline_detection_result.png" alt="Detection Output" className="w-full h-full object-contain" />
        )}
      </div>

      {/* Removed KPI overlay as requested */}
    </div>
  );
}

function Cam2_HelmetTripleRiding() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src="/cam2_violation.png" alt="Violation Evidence" className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Violation Evidence</span>
      </div>
      <div className="absolute bottom-3 inset-x-3 bg-red-600/90 border border-red-500 shadow-xl px-4 py-2 rounded-none text-center animate-pulse flex flex-col gap-1">
        <span className="text-white text-sm font-bold uppercase tracking-wider">⚠ Triple Riding Found</span>
        <span className="text-white/90 text-[10px] font-bold uppercase tracking-wider">Several Helmet Violations Found</span>
      </div>
    </div>
  );
}

function Cam3_RedLight() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src="/cam3_violation.jpeg" alt="Violation Evidence" className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Violation Evidence</span>
      </div>
    </div>
  );
}

function Cam4_WrongSideSpeed() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src="/cam4_violation.png" alt="Violation Evidence" className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Violation Evidence</span>
      </div>
      <div className="absolute bottom-3 inset-x-3 bg-red-600/90 border border-red-500 shadow-xl px-4 py-2 rounded-none text-center animate-pulse">
        <span className="text-white text-sm font-bold uppercase tracking-wider">⚠ ID 18 is above speed limit</span>
      </div>
    </div>
  );
}

function Cam5_IllegalParking() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src="/cam5_violation.png" alt="Violation Evidence" className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Violation Evidence</span>
      </div>
    </div>
  );
}

function Cam6_Stampede() {
  const [mode, setMode] = useState<"raw" | "enhanced_video" | "enhanced_image">("enhanced_video");
  return (
    <div className="relative w-full h-full bg-gray-900 border border-gray-700 rounded-none overflow-hidden flex flex-col">
      {/* Mode toggle */}
      <div className="absolute top-3 right-3 z-20 flex bg-black/70 rounded-full p-0.5">
        <button
          onClick={() => setMode("raw")}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
            mode === "raw" ? "bg-white text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Raw Video
        </button>
        <button
          onClick={() => setMode("enhanced_video")}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
            mode === "enhanced_video" ? "bg-green-500 text-white" : "text-white/60 hover:text-white"
          }`}
        >
          Ai Processed Video
        </button>
        <button
          onClick={() => setMode("enhanced_image")}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
            mode === "enhanced_image" ? "bg-green-500 text-white" : "text-white/60 hover:text-white"
          }`}
        >
          Ai Processed Image
        </button>
      </div>
      
      <div className="w-full flex-1 relative bg-black flex items-center justify-center">
        {mode === "raw" && (
          <video className="w-full h-full object-contain" autoPlay loop muted playsInline src="/cam6_raw.webm" />
        )}
        {mode === "enhanced_video" && (
          <video className="w-full h-full object-contain" autoPlay loop muted playsInline src="/cam6_enhanced.mp4" />
        )}
        {mode === "enhanced_image" && (
          <img src="/cam6_annotated.png" alt="Ai Processed Image" className="w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
}

function Cam7_Accident() {
  const timelineFrames = [
    { time: "09:05:01", label: "Normal flow" },
    { time: "09:05:03", label: "Sudden brake" },
    { time: "09:05:04", label: "IMPACT" },
    { time: "09:05:06", label: "Debris detected" },
    { time: "09:05:10", label: "Vehicles stopped" },
  ];
  return (
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <img src="/cam7_violation.png" alt="Accident Detected" className="w-full h-full object-contain" />
        <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
          <span className="text-white text-xs font-bold uppercase tracking-wider">Accident Detected</span>
        </div>
      </div>
      {/* Incident timeline strip */}
      <div className="bg-black/80 p-2 border-t border-gray-700">
        <span className="text-gray-400 text-[9px] uppercase font-bold tracking-wider mb-1 block">Incident Timeline</span>
        <div className="flex gap-1">
          {timelineFrames.map((f, i) => (
            <div key={i} className={`flex-1 rounded p-1.5 text-center ${i === 2 ? "bg-red-900/50 border border-red-500" : "bg-gray-800"}`}>
              <div className="text-[9px] text-gray-400 font-mono">{f.time}</div>
              <div className={`text-[9px] font-bold ${i === 2 ? "text-red-400" : "text-gray-300"}`}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cam9_Seatbelt() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <img src="/image.png" alt="Seatbelt Violation" className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 bg-red-600/90 px-3 py-1.5 rounded-none shadow-lg">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Violation Evidence</span>
      </div>
      <div className="absolute bottom-3 inset-x-3 bg-red-600/90 border border-red-500 shadow-xl px-4 py-2 rounded-none text-center animate-pulse flex flex-col gap-1">
        <span className="text-white text-sm font-bold uppercase tracking-wider">⚠ 1 Seatbelt Violation Found</span>
      </div>
    </div>
  );
}

/* ══════════════════ Main Camera Page ══════════════════ */

export default function CameraPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isLive, toggleLive } = useAppStore();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  const cameraId = parseInt(id);
  const camera = mockCameras.find((c) => c.id === cameraId) || mockCameras[0];
  const recentViolations = mockViolations.filter((v) => v.cameraId === cameraId);

  const renderModuleRightPane = () => {
    switch (cameraId) {
      case 1: return <Cam1_VehicleDetection />;
      case 2: return <Cam2_HelmetTripleRiding />;
      case 3: return <Cam3_RedLight />;
      case 4: return <Cam4_WrongSideSpeed />;
      case 5: return <Cam5_IllegalParking />;
      case 6: return <Cam6_Stampede />;
      case 7: return <Cam7_Accident />;
      case 9: return <Cam9_Seatbelt />;
      default:
        return (
          <div className="relative w-full h-full bg-gray-900 border border-gray-700 rounded-none overflow-hidden flex items-center justify-center">
            <ShieldAlert size={48} className="text-gray-600" />
            <div className="absolute text-center">
              <span className="text-slate-400 font-mono block">AI ANALYSIS OVERLAY</span>
              <span className="text-slate-500 text-xs block">{camera.focus}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-(--color-app) overflow-hidden p-4 md:p-6 lg:p-8">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between mb-6 shrink-0 gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-[#0f2d5c] text-white hover:bg-[#0c244a] border-transparent transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-(--color-border-soft) hidden md:block" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">{camera.name}</h1>
              <Badge variant={camera.status === "alert" ? "red" : "green"} className="uppercase text-[10px]">
                {camera.status === "alert" ? "Alert" : "Normal"}
              </Badge>
            </div>
            <p className="text-xs text-(--color-text-secondary) font-mono mt-1">
              ID: CAM-{camera.id.toString().padStart(3, "0")} • {camera.focus}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLive}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-none border border-(--color-border-soft) shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            {isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse border border-red-200" />
                <span>LIVE FEED</span>
              </>
            ) : (
              <>
                <Clock size={16} className="text-gray-400" />
                <span>RECORDED</span>
              </>
            )}
          </button>
          <div suppressHydrationWarning className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-none border border-[var(--border-soft)] shadow-sm shrink-0">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 min-h-0">
        {/* Alert Banner for MapMyIndia */}
        {(cameraId === 6 || cameraId === 7) && (
          <div className="bg-red-600/90 border border-red-500 rounded-none px-4 py-2 text-white text-sm flex items-center justify-center shrink-0 shadow-md font-bold uppercase tracking-wider">
            📍 Alert: Location sent to nearest Police Station, Fire Station & Hospital using MapMyIndia Nearby Places & Reverse Geocode API
          </div>
        )}
        {/* Top Split: Video Panes */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
          {/* Left Pane: Raw Feed */}
          <Card className="flex-1 p-3 bg-black flex flex-col min-h-[250px]">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Raw Video Feed</span>
              {isLive && <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">● Rec</span>}
            </div>
            <div className="flex-1 bg-gray-900 rounded-none relative overflow-hidden flex items-center justify-center">
              {/* Placeholder video frame — uses CSS to simulate a dim CCTV feed */}
              {camera.id === 1 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/videoplayback_trimmed.webm" />
              ) : camera.id === 2 ? (
                <img src="/cam2_enhanced.gif" className="absolute inset-0 w-full h-full object-cover" />
              ) : camera.id === 3 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam3_enhanced.mp4" />
              ) : camera.id === 4 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam4_enhanced.mp4" />
              ) : camera.id === 5 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam5_enhanced.mp4" />
              ) : camera.id === 6 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam6_raw.webm" />
              ) : camera.id === 7 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam7_enhanced.mp4" />
              ) : camera.id === 8 ? (
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline src="/cam8_enhanced.mp4" />
              ) : camera.id === 9 ? (
                <img src="/image%20copy.png" className="absolute inset-0 w-full h-full object-contain bg-black" />
              ) : (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-600 font-mono text-xs">VIDEO FEED {camera.name}</span>
                </div>
              )}
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none" />
              <div suppressHydrationWarning className="absolute bottom-2 left-2 text-white/70 font-mono text-xs">
                {new Date().toISOString().replace("T", " ").substring(0, 19)}
              </div>
              <div className="absolute bottom-2 right-2 text-white/70 font-mono text-xs">
                CAM-{camera.id.toString().padStart(3, "0")}
              </div>
            </div>
          </Card>

          {/* Right Pane: AI Processed Output */}
          {camera.id !== 8 && (
            <Card className="flex-1 p-3 bg-black flex flex-col min-h-[250px] min-h-0 overflow-hidden">
              <div className="flex justify-between items-center mb-2 px-1 shrink-0">
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">AI Processed Output</span>
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider">Inferencing</span>
              </div>
              <div className="flex-1 relative overflow-hidden min-h-0 flex flex-col">{renderModuleRightPane()}</div>
            </Card>
          )}
        </div>
        {/* Evidence Table (Bottom Half) */}
        {camera.id !== 1 && camera.id !== 8 && (
          <div className="flex-1 min-h-[250px] flex flex-col min-h-0 overflow-hidden">
            <Card className="flex-1 flex flex-col p-4 bg-white min-h-0 overflow-hidden">
              <h2 className="text-sm font-bold mb-3 text-(--color-text-primary) uppercase tracking-wider shrink-0">
                Detected Incidents Log
              </h2>
              <div className="flex-1 overflow-auto min-h-0">
                <EvidenceTable violations={recentViolations} camera={camera} onAction={(msg) => setToast(msg)} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
