import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Camera, Violation } from '@/data/mockData';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.5,
    position: 'relative'
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  watermarkText: {
    fontSize: 50,
    color: '#e5e7eb',
    transform: 'rotate(-45deg)',
    fontFamily: 'Times-Bold',
    opacity: 0.4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    objectFit: 'contain'
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    color: '#0f2d5c',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#4b5563',
  },
  tricolorStrip: {
    flexDirection: 'row',
    height: 3,
    width: '100%',
    marginBottom: 20,
  },
  stripSaffron: { flex: 1, backgroundColor: '#FF9933' },
  stripWhite: { flex: 1, backgroundColor: '#FFFFFF' },
  stripGreen: { flex: 1, backgroundColor: '#138808' },
  
  titleBlock: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 10,
  },
  reportTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    marginBottom: 5,
  },
  reportMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#4b5563',
  },
  
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCellLabel: {
    width: '40%',
    padding: 6,
    backgroundColor: '#f3f4f6',
    fontFamily: 'Times-Bold',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  tableCellValue: {
    width: '60%',
    padding: 6,
  },
  
  evidenceSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  evidenceImagePlaceholder: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginBottom: 5,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evidenceImage: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginBottom: 5,
    objectFit: 'contain'
  },
  evidenceTimeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
  },
  evidenceTimelineFrame: {
    width: '30%',
    height: 80,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  evidenceCaption: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
  },
  
  descriptionSection: {
    marginBottom: 30,
  },
  descriptionParagraph: {
    textAlign: 'justify',
  },
  
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 10,
  },
  footerDisclaimer: {
    width: '70%',
    fontSize: 8,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  qrPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
  }
});

interface ReportProps {
  camera: Camera;
  violation: Violation;
}

export function ReportDocument({ camera, violation }: ReportProps) {
  const dateStr = new Date(violation.timestamp).toISOString().split('T')[0].replace(/-/g, '');
  const reportId = `RPT-CAM${camera.id.toString().padStart(2, '0')}-${dateStr}-${violation.id}`;
  const timestampStr = new Date(violation.timestamp).toLocaleString();

  let title = "INCIDENT REPORT";
  let extraRows: { label: string, value: string }[] = [];
  let description = "";
  let imageSrc = null;

  switch (camera.id) {
    case 2:
      imageSrc = "/cam2_violation.png";
      title = "TRAFFIC VIOLATION REPORT — HELMET & TRIPLE RIDING";
      extraRows = [
        { label: "Number Plate (OCR)", value: violation.numberPlate || "Unknown" },
        { label: "Riders Count", value: violation.ridersCount?.toString() || "Unknown" },
        { label: "Helmet Status", value: "Non-Compliant" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-002 located at ${camera.location} detected a violation involving non-compliance with helmet regulations and unauthorized triple-riding. The AI system recorded a detection confidence of ${violation.confidence}%. The vehicle's registration plate was extracted via automated OCR analysis (unverified).`;
      break;
    case 3:
      title = "TRAFFIC VIOLATION REPORT — SIGNAL/STOP-LINE VIOLATION";
      extraRows = [
        { label: "Number Plate (OCR)", value: violation.numberPlate || "Unknown" },
        { label: "Signal State at Crossing", value: violation.signalState?.toUpperCase() || "Unknown" },
        { label: "Stop-Line Offset", value: "+2.4m (Estimated)" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-003 located at ${camera.location} detected a vehicle crossing the intersection while the traffic signal was in a ${violation.signalState?.toUpperCase()} state. The AI system recorded a detection confidence of ${violation.confidence}%. The vehicle's registration plate was extracted via automated OCR analysis (unverified).`;
      imageSrc = "/cam3_violation.jpeg";
      break;
    case 4:
      title = "TRAFFIC VIOLATION REPORT — DIRECTIONAL/SPEED VIOLATION";
      extraRows = [
        { label: "Number Plate (OCR)", value: violation.numberPlate || "Unknown" },
        { label: "Violation Type", value: violation.type === "wrong_side" ? "Wrong-Side Driving" : "Overspeeding" },
        { label: "Recorded Speed", value: violation.recordedSpeed ? `${violation.recordedSpeed} km/h` : "N/A" },
        { label: "Posted Speed Limit", value: violation.speedLimit ? `${violation.speedLimit} km/h` : "N/A" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-004 located at ${camera.location} detected a serious directional or speed limit violation. The AI system recorded a detection confidence of ${violation.confidence}%. The vehicle's registration plate was extracted via automated OCR analysis (unverified).`;
      imageSrc = "/cam4_violation.png";
      break;
    case 5:
      title = "TRAFFIC VIOLATION REPORT — UNAUTHORIZED PARKING";
      extraRows = [
        { label: "Number Plate (OCR)", value: violation.numberPlate || "Unknown" },
        { label: "Restricted Zone Name", value: "No Parking / Tow Away Zone" },
        { label: "Duration Parked", value: violation.parkDuration ? `${violation.parkDuration} minutes` : "Unknown" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-005 located at ${camera.location} detected an unauthorized parking violation. The vehicle exceeded the maximum allowable stopping duration in a restricted zone. The AI system recorded a detection confidence of ${violation.confidence}%. The vehicle's registration plate was extracted via automated OCR analysis (unverified).`;
      imageSrc = "/cam5_violation.png";
      break;
    case 6:
      title = "CROWD SAFETY RISK REPORT";
      extraRows = [
        { label: "Estimated Headcount", value: violation.headcount?.toString() || "Unknown" },
        { label: "Risk Level", value: violation.riskLevel?.toUpperCase() || "Unknown" },
        { label: "Capacity Threshold", value: "Exceeded by 45%" },
        { label: "Duration of Elevated Risk", value: "14 minutes" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-006 located at ${camera.location} detected an elevated safety risk due to severe overcrowding. The estimated headcount significantly exceeded safe capacity thresholds, triggering a ${violation.riskLevel?.toUpperCase()} risk level alert. The AI system recorded a detection confidence of ${violation.confidence}%.`;
      imageSrc = "/cam6_annotated.png";
      break;
    case 7:
      title = "ACCIDENT INCIDENT REPORT";
      extraRows = [
        { label: "Time of Detection", value: timestampStr },
        { label: "Severity Classification", value: violation.severity.toUpperCase() },
        { label: "Response Trigger Time", value: "+12 seconds" },
        { label: "Notified Units (Mock)", value: "EMS, Traffic Patrol Unit 4" }
      ];
      description = `On ${timestampStr}, surveillance camera CAM-007 located at ${camera.location} detected a sudden vehicular collision or severe roadway incident. The event was classified as ${violation.severity.toUpperCase()} severity. Automated alerts were dispatched to emergency response units within 12 seconds of detection. The AI system recorded a detection confidence of ${violation.confidence}%.`;
      imageSrc = "/cam7_violation.png";
      break;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullLogoUrl = `${origin}/kar_main_logo.png`;
  const fullEvidenceUrl = imageSrc ? `${origin}${imageSrc}` : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.watermarkContainer} fixed>
          <Text style={styles.watermarkText}>PROTOTYPE — SAMPLE REPORT</Text>
        </View>

        {/* Letterhead */}
        <View style={styles.header} fixed>
          <Image src={fullLogoUrl} style={styles.logoImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Government of Karnataka — Department of Traffic Police</Text>
            <Text style={styles.headerSubtitle}>Smart City Traffic Enforcement Initiative</Text>
          </View>
        </View>

        <View style={styles.tricolorStrip} fixed>
          <View style={styles.stripSaffron} />
          <View style={styles.stripWhite} />
          <View style={styles.stripGreen} />
        </View>

        {/* Title Block */}
        <View style={styles.titleBlock}>
          <Text style={styles.reportTitle}>{title}</Text>
          <View style={styles.reportMeta}>
            <Text>Report ID: {reportId}</Text>
            <Text>Generated: {new Date().toLocaleString()}</Text>
          </View>
        </View>

        {/* Incident Details Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Camera ID & Location</Text>
            <Text style={styles.tableCellValue}>CAM-{camera.id.toString().padStart(3, '0')} / {camera.location}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Date & Time of Detection</Text>
            <Text style={styles.tableCellValue}>{timestampStr}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Violation / Incident Type</Text>
            <Text style={styles.tableCellValue}>{violation.type.replace(/_/g, ' ').toUpperCase()}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>AI Detection Confidence</Text>
            <Text style={styles.tableCellValue}>{violation.confidence}%</Text>
          </View>
          <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.tableCellLabel}>Severity Classification</Text>
            <Text style={styles.tableCellValue}>{violation.severity.toUpperCase()}</Text>
          </View>
          
          {extraRows.map((row, idx) => (
            <View key={idx} style={[styles.tableRow, idx === extraRows.length - 1 ? { borderBottomWidth: 0 } : {}]}>
              <Text style={[styles.tableCellLabel, { borderTopWidth: 1, borderTopColor: '#e5e7eb' }]}>{row.label}</Text>
              <Text style={[styles.tableCellValue, { borderTopWidth: 1, borderTopColor: '#e5e7eb' }]}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Evidence Section */}
        <View style={styles.evidenceSection}>
          {fullEvidenceUrl ? (
            <Image src={fullEvidenceUrl} style={styles.evidenceImage} />
          ) : (
            <View style={styles.evidenceImagePlaceholder}>
              <Text style={{color: '#9ca3af', fontFamily: 'Times-Bold'}}>EVIDENCE IMAGE MOCK</Text>
            </View>
          )}
          <Text style={styles.evidenceCaption}>Evidence Snapshot — Camera CAM-{camera.id.toString().padStart(3, '0')}</Text>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionParagraph}>{description}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerDisclaimer}>
            This is a system-generated report produced for demonstration/prototype purposes by NammaBTP. Not valid for legal enforcement.
          </Text>
          <View style={styles.qrPlaceholder}>
            <Text style={{fontSize: 6, color: '#9ca3af', textAlign: 'center'}}>VERIFICATION{'\n'}QR</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
}
