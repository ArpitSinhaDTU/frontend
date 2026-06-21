"use client";
import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from './ReportDocument';
import type { Camera, Violation } from '@/data/mockData';
import { Button } from '@/components/ui';
import { Download, Loader2 } from 'lucide-react';

export function PdfDownloadButton({ camera, violation }: { camera: Camera, violation: Violation }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Simulate slight delay for feedback so it feels like generation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const blob = await pdf(<ReportDocument camera={camera} violation={violation} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const dateStr = new Date(violation.timestamp).toISOString().split('T')[0].replace(/-/g, '');
      const reportId = `RPT-CAM${camera.id.toString().padStart(2, '0')}-${dateStr}-${violation.id}`;
      link.download = `${reportId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleDownload} 
      disabled={isGenerating}
      className="text-xs px-2 py-1 h-auto text-blue-600 hover:bg-blue-50 border-blue-200 flex items-center"
    >
      {isGenerating ? (
        <Loader2 size={12} className="mr-1 animate-spin" />
      ) : (
        <Download size={12} className="mr-1" />
      )}
      {isGenerating ? "Generating..." : "Download PDF Report"}
    </Button>
  );
}
