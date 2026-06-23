export interface Camera {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  focus: string;
  status: "normal" | "alert" | "offline";
  liveFeedUrl: string;
  uptimePercent: number;
}

export interface Violation {
  id: string;
  cameraId: number;
  type: "helmet" | "triple_riding" | "red_light" | "stop_line" | "wrong_side"
      | "overspeed" | "illegal_parking" | "stampede_risk" | "accident" | "seatbelt";
  timestamp: string;
  confidence: number;
  vehicleClass?: string;
  numberPlate?: string;
  severity: "minor" | "moderate" | "severe";
  thumbnailUrl: string;
  reviewed: boolean;
  // Camera-specific optional fields
  ridersCount?: number;
  signalState?: "red" | "yellow" | "green";
  recordedSpeed?: number;
  speedLimit?: number;
  parkDuration?: number;
  parkLimit?: number;
  headcount?: number;
  riskLevel?: "low" | "moderate" | "high" | "critical";
}

export interface DailySummary {
  date: string;
  totalViolations: number;
  bySeverity: { minor: number; moderate: number; severe: number };
  trend24h: { hour: string; total: number; helmetTripleRiding: number; signalSpeed: number }[];
  zoneHeatmap: { zone: string; violationCount: number }[];
  hotspots: { location: string; count: number; trend: "up" | "down" }[];
}

export const mockCameras: Camera[] = [
  { id: 1, name: "MG Road Junction", location: "Bangalore", lat: 12.9716, lng: 77.5946, focus: "Image Enhancement & Vehicle Detection", status: "normal", liveFeedUrl: "/videos/sample1.mp4", uptimePercent: 99 },
  { id: 2, name: "Indiranagar 100ft Rd", location: "Bangalore", lat: 12.9784, lng: 77.6608, focus: "Helmet & Triple Riding", status: "alert", liveFeedUrl: "/videos/sample2.mp4", uptimePercent: 98 },
  { id: 3, name: "Koramangala Sony World", location: "Bangalore", lat: 12.9150, lng: 77.6345, focus: "Red Light Violation", status: "alert", liveFeedUrl: "/videos/sample3.mp4", uptimePercent: 100 },
  { id: 4, name: "Hebbal Flyover", location: "Bangalore", lat: 13.0654, lng: 77.5971, focus: "Wrong Side Driving & Speed Limit", status: "alert", liveFeedUrl: "/videos/sample4.mp4", uptimePercent: 97 },
  { id: 5, name: "Jayanagar 4th Block", location: "Bangalore", lat: 12.9099, lng: 77.5734, focus: "Illegal Parking", status: "alert", liveFeedUrl: "/videos/sample5.mp4", uptimePercent: 99 },
  { id: 6, name: "Malleshwaram 8th Cross", location: "Bangalore", lat: 13.0231, lng: 77.5514, focus: "Crowd Counting / Stampede", status: "alert", liveFeedUrl: "/videos/sample6.mp4", uptimePercent: 99 },
  { id: 7, name: "Silk Board Junction", location: "Bangalore", lat: 12.8976, lng: 77.6334, focus: "Accident Detection", status: "alert", liveFeedUrl: "/videos/sample7.mp4", uptimePercent: 95 },
  { id: 8, name: "City Center Overview", location: "Bangalore", lat: 12.9416, lng: 77.5746, focus: "General Surveillance", status: "normal", liveFeedUrl: "/videoplayback_trimmed.webm", uptimePercent: 100 },
  { id: 9, name: "Richmond Circle", location: "Bangalore", lat: 12.9500, lng: 77.6100, focus: "Seatbelt Violation", status: "alert", liveFeedUrl: "/videos/sample1.mp4", uptimePercent: 98 },
];

export const mockDailySummary: DailySummary = {
  date: new Date().toISOString(),
  totalViolations: 142,
  bySeverity: { minor: 86, moderate: 38, severe: 18 },
  trend24h: [
    { hour: "08:00", total: 10, helmetTripleRiding: 4, signalSpeed: 2 },
    { hour: "10:00", total: 25, helmetTripleRiding: 12, signalSpeed: 5 },
    { hour: "12:00", total: 15, helmetTripleRiding: 5, signalSpeed: 3 },
    { hour: "14:00", total: 30, helmetTripleRiding: 15, signalSpeed: 8 },
    { hour: "16:00", total: 42, helmetTripleRiding: 20, signalSpeed: 10 },
    { hour: "18:00", total: 20, helmetTripleRiding: 8, signalSpeed: 4 },
  ],
  zoneHeatmap: [
    { zone: "North", violationCount: 45 },
    { zone: "South", violationCount: 20 },
    { zone: "East", violationCount: 15 },
    { zone: "West", violationCount: 62 },
  ],
  hotspots: [
    { location: "Ring Road Stretch", count: 42, trend: "up" },
    { location: "Station Road Crossing", count: 35, trend: "up" },
    { location: "Highway Bypass KM 12", count: 28, trend: "down" },
    { location: "MG Road Junction", count: 20, trend: "down" },
    { location: "Market Square", count: 17, trend: "up" },
  ]
};

// Deterministic mock violations — no Math.random() to prevent hydration mismatch
export const mockViolations: Violation[] = [
  // Camera 1 — Vehicle Detection
  { id: "V1001", cameraId: 1, type: "overspeed", timestamp: "2026-06-21T09:15:00Z", confidence: 94, vehicleClass: "Car", numberPlate: "KA 04 MC 1234", severity: "minor", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false },
  { id: "V1002", cameraId: 1, type: "overspeed", timestamp: "2026-06-21T09:28:00Z", confidence: 88, vehicleClass: "Truck", numberPlate: "KA 08 MB 5678", severity: "minor", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false },
  { id: "V1003", cameraId: 1, type: "wrong_side", timestamp: "2026-06-21T10:05:00Z", confidence: 91, vehicleClass: "Auto rickshaw", numberPlate: "KA 01 MA 9012", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: true },

  // Camera 2 — Helmet & Triple Riding
  { id: "V2001", cameraId: 2, type: "helmet", timestamp: "2026-06-21T08:45:00Z", confidence: 96, vehicleClass: "Bike", numberPlate: "KA 03 MS 4567", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, ridersCount: 2 },
  { id: "V2002", cameraId: 2, type: "triple_riding", timestamp: "2026-06-21T09:12:00Z", confidence: 93, vehicleClass: "Bike", numberPlate: "KA 05 MT 8901", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, ridersCount: 3 },
  { id: "V2003", cameraId: 2, type: "helmet", timestamp: "2026-06-21T10:30:00Z", confidence: 89, vehicleClass: "Scooter", numberPlate: "KA 07 MR 2345", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, ridersCount: 1 },

  // Camera 3 — Red-Light Violation
  { id: "V3001", cameraId: 3, type: "red_light", timestamp: "2026-06-21T08:32:00Z", confidence: 99, vehicleClass: "Car", numberPlate: "KA 02 MC 6789", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, signalState: "red" },
  { id: "V3002", cameraId: 3, type: "stop_line", timestamp: "2026-06-21T09:48:00Z", confidence: 85, vehicleClass: "Bike", numberPlate: "KA 06 MB 0123", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, signalState: "red" },
  { id: "V3003", cameraId: 3, type: "red_light", timestamp: "2026-06-21T10:15:00Z", confidence: 97, vehicleClass: "SUV", numberPlate: "KA 09 MA 4567", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: true, signalState: "red" },

  // Camera 4 — Wrong-Side & Speed
  { id: "V4001", cameraId: 4, type: "wrong_side", timestamp: "2026-06-21T08:55:00Z", confidence: 92, vehicleClass: "Car", numberPlate: "KA 01 MC 7890", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, recordedSpeed: 78, speedLimit: 50 },
  { id: "V4002", cameraId: 4, type: "overspeed", timestamp: "2026-06-21T09:20:00Z", confidence: 95, vehicleClass: "Bike", numberPlate: "KA 04 MB 1234", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, recordedSpeed: 65, speedLimit: 50 },
  { id: "V4003", cameraId: 4, type: "wrong_side", timestamp: "2026-06-21T10:40:00Z", confidence: 87, vehicleClass: "Auto rickshaw", numberPlate: "KA 08 MA 5678", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, recordedSpeed: 42, speedLimit: 50 },

  // Camera 5 — Illegal Parking
  { id: "V5001", cameraId: 5, type: "illegal_parking", timestamp: "2026-06-21T07:30:00Z", confidence: 91, vehicleClass: "Car", numberPlate: "KA 03 MC 9012", severity: "minor", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, parkDuration: 12, parkLimit: 5 },
  { id: "V5002", cameraId: 5, type: "illegal_parking", timestamp: "2026-06-21T08:15:00Z", confidence: 88, vehicleClass: "SUV", numberPlate: "KA 07 MS 3456", severity: "minor", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, parkDuration: 25, parkLimit: 5 },
  { id: "V5003", cameraId: 5, type: "illegal_parking", timestamp: "2026-06-21T09:50:00Z", confidence: 94, vehicleClass: "Truck", numberPlate: "KA 02 MT 7890", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: true, parkDuration: 45, parkLimit: 5 },

  // Camera 6 — Stampede Risk
  { id: "V6001", cameraId: 6, type: "stampede_risk", timestamp: "2026-06-21T10:00:00Z", confidence: 82, severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, headcount: 482, riskLevel: "moderate" },
  { id: "V6002", cameraId: 6, type: "stampede_risk", timestamp: "2026-06-21T10:30:00Z", confidence: 91, severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false, headcount: 620, riskLevel: "high" },

  // Camera 7 — Accident Detection
  { id: "V7001", cameraId: 7, type: "accident", timestamp: "2026-06-21T09:05:00Z", confidence: 87, vehicleClass: "Car", numberPlate: "KA 05 MC 2345", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false },
  { id: "V7002", cameraId: 7, type: "accident", timestamp: "2026-06-21T11:22:00Z", confidence: 79, vehicleClass: "Bike", numberPlate: "KA 09 MB 6789", severity: "severe", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false },

  // Camera 9 — Seatbelt Violation
  { id: "V9001", cameraId: 9, type: "seatbelt", timestamp: "2026-06-21T11:45:00Z", confidence: 95, vehicleClass: "Car", numberPlate: "KA 01 XY 1234", severity: "moderate", thumbnailUrl: "/images/placeholder-violation.jpg", reviewed: false },
];

export const mockMapplsExtras = {
  coverage: {
    percentage: 82,
    gapZones: 2,
    radiusMins: 10
  },
  etas: [
    { location: "Ring Road Stretch", etaMin: 6 },
    { location: "Station Road Crossing", etaMin: 9 },
    { location: "Highway Bypass KM 12", etaMin: 14 },
    { location: "MG Road Junction", etaMin: 18 },
    { location: "Market Square", etaMin: 22 }
  ],
  wards: [
    { name: "Indiranagar", violations: 45, tier: "High" },
    { name: "Koramangala", violations: 32, tier: "Medium" },
    { name: "Yeswanthpur", violations: 28, tier: "Medium" },
    { name: "HSR Layout", violations: 18, tier: "Low" },
    { name: "Rajajinagar", violations: 12, tier: "Low" },
    { name: "Banashankari", violations: 7, tier: "Low" }
  ],
  geofence: {
    active: 12,
    noParking: 7,
    schoolZones: 3,
    restricted: 2,
    breachesToday: 9
  },
  cameraElocs: [
    { name: "MG Road Junction", eloc: "7H7VK2" },
    { name: "Indiranagar 100ft Rd", eloc: "1B3M9Q" },
    { name: "Koramangala Sony World", eloc: "8X2P5F" },
    { name: "Hebbal Flyover", eloc: "4R9T1W" },
    { name: "Jayanagar 4th Block", eloc: "9L6D2C" },
    { name: "Malleshwaram 8th Cross", eloc: "2Z5K8A" },
    { name: "Silk Board Junction", eloc: "5J4N7E" }
  ],
  routeOptimizer: {
    sequence: [
      "Station Road Crossing",
      "Market Square",
      "Ring Road Stretch",
      "MG Road Junction"
    ],
    totalTimeMin: 38
  }
};
