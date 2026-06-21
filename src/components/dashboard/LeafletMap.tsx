"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Camera } from "@/data/mockData";
import { Camera as CameraIcon } from "lucide-react";
import { CameraPopupCard } from "./CameraPopupCard";

// Define a custom div icon function to mimic the existing styling
const createCustomIcon = (cam: Camera, isSelected: boolean) => {
  const isAlert = cam.status === "alert";
  const bgColor = isAlert ? "bg-[#ff4757]" : "bg-white";
  const textColor = isAlert ? "text-white" : "text-[#1a202c]";
  const zIndex = isSelected ? 1000 : (isAlert ? 500 : 100);

  const html = `
    <div class="group relative cursor-pointer focus:outline-none" style="z-index: ${zIndex};">
      <div class="w-10 h-10 rounded-none border-[3px] flex items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-110 ${bgColor} border-white ${textColor}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
        ${isAlert ? `
          <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4757] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-[#ff4757] border border-white"></span>
          </span>
        ` : ''}
      </div>
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#1a202c] text-xs px-3 py-1.5 rounded-none shadow-xl whitespace-nowrap z-20 font-semibold pointer-events-none border border-black/10">
        ${cam.name}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-leaflet-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

interface LeafletMapProps {
  cameras: Camera[];
  selectedCameraId?: string | number | null;
  onCameraSelect?: (cam: Camera | null) => void;
  center: { lat: number; lng: number };
  zoom: number;
}

export default function LeafletMap({ cameras, selectedCameraId, onCameraSelect, center, zoom }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full relative isolate rounded-xl overflow-hidden border border-white/10" style={{ filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)" }}>
      <MapContainer
        key={`${center.lat}-${center.lng}`}
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cameras.map((cam) => {
          const isSelected = selectedCameraId === cam.id;
          return (
            <Marker
              key={cam.id}
              position={[cam.lat, cam.lng]}
              icon={createCustomIcon(cam, isSelected)}
              eventHandlers={{
                click: () => onCameraSelect?.(cam),
              }}
            >
              {isSelected && (
                <Popup
                  offset={[0, -20]}
                  closeButton={false}
                  className="custom-leaflet-popup"
                >
                  <div style={{ filter: "invert(100%) hue-rotate(180deg) brightness(120%) contrast(80%)" }}>
                    <CameraPopupCard camera={cam} onClose={() => onCameraSelect?.(null)} />
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container { background: #fff; }
        .custom-leaflet-icon { background: transparent; border: none; }
        .leaflet-popup-content-wrapper { padding: 0; border-radius: 0; background: transparent; box-shadow: none; }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-popup-content { margin: 0; width: auto !important; }
      `}} />
    </div>
  );
}
