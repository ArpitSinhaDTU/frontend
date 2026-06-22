import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { mockDailySummary, mockMapplsExtras } from '@/data/mockData';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, lineHeight: 1.5, position: 'relative' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logoImage: { width: 50, height: 50, marginRight: 15, objectFit: 'contain' },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 16, fontFamily: 'Times-Bold', color: '#0f2d5c' },
  headerSubtitle: { fontSize: 10, color: '#4b5563' },
  tricolorStrip: { flexDirection: 'row', height: 3, width: '100%', marginBottom: 20 },
  stripSaffron: { flex: 1, backgroundColor: '#FF9933' },
  stripWhite: { flex: 1, backgroundColor: '#FFFFFF' },
  stripGreen: { flex: 1, backgroundColor: '#138808' },
  titleBlock: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#d1d5db', paddingBottom: 10 },
  reportTitle: { fontSize: 14, fontFamily: 'Times-Bold', marginBottom: 5 },
  reportMeta: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 9, color: '#4b5563' },
  table: { width: '100%', borderWidth: 1, borderColor: '#9ca3af', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableCellLabel: { width: '60%', padding: 6, backgroundColor: '#f3f4f6', fontFamily: 'Times-Bold', borderRightWidth: 1, borderRightColor: '#e5e7eb' },
  tableCellValue: { width: '40%', padding: 6, textAlign: 'right' },
  signatureSection: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBlock: { alignItems: 'center', width: 150 },
  signatureLine: { width: '100%', height: 1, backgroundColor: '#000', marginTop: 30, marginBottom: 5 },
});

export const GlobalReportDocument = () => {
  const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('en-IN');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/kar_main_logo.png" style={styles.logoImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Bengaluru City Police</Text>
            <Text style={styles.headerSubtitle}>Traffic Management Centre, Infantry Road, Bengaluru</Text>
          </View>
        </View>

        <View style={styles.tricolorStrip}>
          <View style={styles.stripSaffron} />
          <View style={styles.stripWhite} />
          <View style={styles.stripGreen} />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.reportTitle}>Daily City Surveillance & Analytics Report</Text>
          <View style={styles.reportMeta}>
            <Text>Report Generated: {dateStr} at {timeStr}</Text>
            <Text>Status: CONFIDENTIAL</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Total Violations Recorded Today</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.totalViolations}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Severe Violations</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.bySeverity.severe}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Moderate Violations</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.bySeverity.moderate}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Minor Violations</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.bySeverity.minor}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>City Camera Coverage Monitored</Text>
            <Text style={styles.tableCellValue}>{mockMapplsExtras.coverage.percentage}%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Avg Response ETA to Hotspots</Text>
            <Text style={styles.tableCellValue}>&lt; {mockMapplsExtras.coverage.radiusMins} mins</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Top Hotspot Location</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.hotspots[0].location}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Top Hotspot Incident Count</Text>
            <Text style={styles.tableCellValue}>{mockDailySummary.hotspots[0].count}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Ward with Most Infractions</Text>
            <Text style={styles.tableCellValue}>{mockMapplsExtras.wards[0].name}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 20, marginBottom: 10, fontFamily: 'Times-Bold' }}>System Note:</Text>
        <Text style={{ textAlign: 'justify', fontSize: 10, color: '#4b5563' }}>
          This report is auto-generated by the AI Video Analytics Dashboard. Data is compiled from the live feed processing engine across all operational city cameras. Actionable insights and route optimizations have been relayed to the active patrol units.
        </Text>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text>Officer Sadanand Viswanath</Text>
            <Text style={{ fontSize: 9, color: '#4b5563' }}>Duty Officer • Shift A</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text>System Administrator</Text>
            <Text style={{ fontSize: 9, color: '#4b5563' }}>Traffic Management Centre</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
