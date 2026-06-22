"use client";
import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { GlobalReportDocument } from './GlobalReportDocument';
import { Button } from '@/components/ui';
import { Download, Loader2 } from 'lucide-react';

export function GlobalPdfDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const blob = await pdf(<GlobalReportDocument />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `City-Surveillance-Report-${dateStr}.pdf`;
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
      className="w-full text-[var(--color-text-primary)] border-[var(--border-soft)] hover:bg-black/5 hover:text-[var(--color-text-primary)] bg-[var(--card-bg)] shrink-0 shadow-sm py-5 rounded-none font-bold backdrop-blur-xl"
    >
      {isGenerating ? (
        <Loader2 size={16} className="mr-2 animate-spin" />
      ) : (
        <Download size={16} className="mr-2" />
      )}
      {isGenerating ? "Generating Report..." : "Export Insight Report"}
    </Button>
  );
}
