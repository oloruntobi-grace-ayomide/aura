"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { TravelPreference, EmailPreference, SchedulingPreference, IntegrationsPreference, WorkingStylePreference, QuickWinPreference} from "./PreferencesForm";


const STEPS = [
  { id: "travel", label: "Travel Preferences" },
  { id: "email", label: "Email Rules" },
  { id: "schedule", label: "Scheduling"},
  { id: "integrations", label: "Integrations"},
  { id: "style", label: "Working Style"},
  { id: "quickwin", label: "Quick Win"},
  { id: "done", label: "Complete"},
] as const;

type StepId = typeof STEPS[number]["id"];
 


export default function Onboarding() {
    const [active, setActive] = useState<StepId>("travel");

// Similar handlers for room preference, rental car, rideshare, etc.

    const progress = useMemo(() => {
        const index = STEPS.findIndex((s) => s.id === active);
        return Math.round(((index + 1) / STEPS.length) * 100);
    }, [active]);

    const goNext = () => {
        const i = STEPS.findIndex((s) => s.id === active);
        if (i < STEPS.length - 1) setActive(STEPS[i + 1].id);
    };

    const goPrev = () => {
        const i = STEPS.findIndex((s) => s.id === active);
        if (i > 0) setActive(STEPS[i - 1].id);
    };

    return (
      <div className="md:h-screen md:overflow-hidden grid grid-cols-1 md:grid-onboarding-areas-layout md:grid-cols-[280px,1fr]">

        {/* Sidebar */}
        <aside className="area-sidebar bg-[#0F2A3F] text-white p-6 md:sticky md:top-0 md:bottom-0 md:h-screen">
            <Link href="/" className="inline-block text-2xl font-bold tracking-wide">AURA</Link>
            <p className="mt-4 text-sm opacity-80">Just a few steps to set your preferences and get you set up.</p>

            {/* Stepper */}
            <ol role="list" className="mt-8 space-y-2">
            {STEPS.map((s, i) => {
                const current = s.id === active;
                const done = STEPS.findIndex((x) => x.id === active) > i;
                return (
                <li key={s.id} role="listitem">
                    <button
                    aria-current={current ? "step" : undefined}
                    className={cn("w-full text-left px-3 py-2 flex items-center gap-3 transition", current ? "text-[#FCC201]" : done ? "text-[#D8DFE5]/60" : "text-white")}
                    >
                        {done ? 
                            <IoIosCheckmarkCircle className="h-6 w-6 text-[#00b800]"/> : <span className={cn("h-6 w-6 border-[2px] rounded-[50%] flex items-center justify-center text-sm", current? "border-[#FCC201]" : "border-white")}>{i+1}</span> 
                        }
                    <span className="text-sm font-medium"> {s.label}</span>
                    {current && <HiArrowLongRight className="justify-self-end h-5 w-5"/> }
                    </button>
                </li>
                );
            })}
            </ol>

            <div className="mt-6">
            <Progress value={progress} />
            <div className="mt-2 text-xs opacity-80">{progress}% complete</div>
            </div>
        </aside>

        {/* Main */}
        <main className="area-main p-6 overflow-auto">
            <Tabs value={active} onValueChange={(v) => setActive(v as StepId)}>
            {/* Hidden TabsList (not visible; we drive via the next and prevs buttons) */}
            <TabsList className="sr-only">
                {STEPS.map((s) => (
                <TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>
                ))}
            </TabsList>

            {/* Step 1: Travel Preferences */}
            <TravelPreference goNext={goNext}/>
          
            {/* Step 2: Email Rules */}
            <EmailPreference goNext={goNext} goPrev={goPrev}/>

            {/* Step 3: Scheduling */}
            <SchedulingPreference goNext={goNext} goPrev={goPrev}/>

            {/* Step 4: Integrations */}
            <IntegrationsPreference goNext={goNext} goPrev={goPrev}/>
          
            {/* Step 5: Working Style */}
            <WorkingStylePreference goNext={goNext} goPrev={goPrev}/>

            {/* Step 6: Quick Win*/}
            <QuickWinPreference goNext={goNext} goPrev={goPrev}/>

            {/* Step 7: Completion */}
            <TabsContent value="done" className="mt-[50px]">
                <Card className="text-center">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-3xl">Your office is ready 🎉</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="mx-auto max-w-md text-left list-disc pl-6">
                    <li>Travel booking with your preferences</li>
                    <li>Email prioritization and drafting</li>
                    <li>Schedule optimization and protection</li>
                    <li>Cross-domain intelligence across all three</li>
                    </ul>
                    <Button asChild>
                    <Link href="/app">Enter Your Office →</Link>
                    </Button>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </main>

      </div>
    );
}
