"use client";
import { TopBar } from "@/components/dashboard/TopBar";
import { LeftColumn } from "@/components/dashboard/LeftColumn";
import { CenterColumn } from "@/components/dashboard/CenterColumn";
import { RightColumn } from "@/components/dashboard/RightColumn";

export default function DashboardPage() {
  return (
    <main className="flex flex-col flex-1 h-full p-4 sm:p-6 lg:p-8 gap-6 max-w-[1800px] mx-auto w-full">
      <TopBar />
      <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
        {/* Left Column (~17.5%) */}
        <div className="w-full lg:w-[17.5%] min-w-0">
          <LeftColumn />
        </div>
        
        {/* Center Column (~65%) */}
        <div className="w-full lg:w-[65%] min-w-0 min-h-[600px] lg:min-h-0">
          <CenterColumn />
        </div>
        
        {/* Right Column (~17.5%) */}
        <div className="w-full lg:w-[17.5%] min-w-0">
          <RightColumn />
        </div>
      </div>
    </main>
  );
}
