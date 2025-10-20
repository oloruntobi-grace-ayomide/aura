import { useState, useEffect} from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";



// travel setup types
export type Amenity = "Gym" | "Pool" | "Restaurant" | "Spa" | "Elevator";
export type SeatPreference = "Aisle" | "Window" | "Exit Row" | "Front";
export type TravelPreferences = {
  preferredClass: "economy" | "premium" | "business" | "first" | null;
  airlineLoyalty: string[];
  seatPreference: SeatPreference[]
  alwaysCheckBags: boolean;
  hotelLoyalty: string[];
  mustHaveAmenities: Amenity[];
  roomPreference: "highfloor" | "kingbed" | "quietarea" | null;
  rentalCarCompany: "enterprise" | "hertz" | "avis" | "none" | null;
  ridesharePreference: "uber-black" | "uber-x" | "lyft" | "taxi" | null;
}

export function TravelPreference({ goNext }: { goNext: () => void }){

    const [travelPrefs, setTravelPrefs] = useState<TravelPreferences>({
        preferredClass: null,
        airlineLoyalty: [],
        seatPreference: [],
        alwaysCheckBags: false,
        hotelLoyalty: [],
        mustHaveAmenities: [],
        roomPreference: null,
        rentalCarCompany: null,
        ridesharePreference: null,
    });
    
    const [newAirlineLoyalty, setNewAirlineLoyalty] = useState("");
    const [newHotelLoyalty, setNewHotelLoyalty] = useState("");

    const handlePreferredClass = (value: string) => {
        setTravelPrefs(prev => ({ ...prev, preferredClass: value as TravelPreferences["preferredClass"] }));
    };
    
    const handleAddAirlineLoyalty = () => {
        if (newAirlineLoyalty.trim() && !travelPrefs.airlineLoyalty.includes(newAirlineLoyalty)) {
            setTravelPrefs(prev => ({
            ...prev,
            airlineLoyalty: [...prev.airlineLoyalty, newAirlineLoyalty.trim()]
            }));
            setNewAirlineLoyalty("")
        }
    };
    
    const handleRemoveAirlineLoyalty = (AirlineLoyaltyToRemove: string) => {
        setTravelPrefs(prev => ({
            ...prev,
            airlineLoyalty: prev.airlineLoyalty.filter(airlineLoyalty => airlineLoyalty !== AirlineLoyaltyToRemove)
        }))
    };

    const handleAirlineLoyaltyKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        handleAddAirlineLoyalty()
        }
    };

    const handleAddHotelLoyalty = () => {
        if (newHotelLoyalty.trim() && !travelPrefs.hotelLoyalty.includes(newHotelLoyalty)) {
            setTravelPrefs(prev => ({
            ...prev,
            hotelLoyalty: [...prev.hotelLoyalty, newHotelLoyalty.trim()]
            }));
            setNewHotelLoyalty("")
        }
    };

    const handleHotelLoyaltyKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        handleAddHotelLoyalty()
        }
    };

    const handleRemoveHotelLoyalty = (HotelLoyaltyToRemove: string) => {
        setTravelPrefs(prev => ({
            ...prev,
            hotelLoyalty: prev.hotelLoyalty.filter(hotelLoyalty => hotelLoyalty !== HotelLoyaltyToRemove)
        }))
    };

    const handleSeatPreference = (seatPref: SeatPreference) => {
        setTravelPrefs(prev => ({ 
            ...prev, 
            seatPreference: prev.seatPreference.includes(seatPref)
            ? prev.seatPreference.filter(s => s !== seatPref)
            : [...prev.seatPreference, seatPref]
        }));
    };
    
    const handleAmenityToggle = (amenity: Amenity) => {
        setTravelPrefs(prev => ({
            ...prev,
            mustHaveAmenities: prev.mustHaveAmenities.includes(amenity)
            ? prev.mustHaveAmenities.filter(a => a !== amenity)
            : [...prev.mustHaveAmenities, amenity]
        }));
    };

    return(
        <TabsContent value="travel" className="mt-0">
            <Card>
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Travel Preferences</CardTitle>
                <CardDescription>
                    First, let&#30;s set up your travel preferences. This helps me book exactly what you need, without asking.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                {/* Flights Section */}
                <section>
                    <h3 className="font-semibold mb-4 text-lg">Flights</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Preferred Class */}
                        <div>
                            <Label htmlFor="preferred-class">Preferred class</Label>
                            <Select 
                            value={travelPrefs.preferredClass || ""} 
                            onValueChange={handlePreferredClass}
                            >
                            <SelectTrigger className="mt-1" id="preferred-class">
                                <SelectValue placeholder="Please Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="economy">Economy</SelectItem>
                                <SelectItem value="premium">Premium Economy</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="first">First Class</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>

                        {/* Airline Loyalty */}
                        <div>
                            <Label>Airline loyalty programs</Label>
                            <div className="mt-1 flex gap-2">
                                <Input 
                                    placeholder="e.g., Delta SkyMiles"
                                    value={newAirlineLoyalty} 
                                    onChange={(e) => setNewAirlineLoyalty(e.target.value)}
                                    onKeyDown={handleAirlineLoyaltyKeyDown}
                                />
                                <Button onClick={() => handleAddAirlineLoyalty()}>
                                    Add
                                </Button>
                            </div>

                            {travelPrefs.airlineLoyalty.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {travelPrefs.airlineLoyalty.map((program, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {program}
                                        <button 
                                        onClick={() => handleRemoveAirlineLoyalty(program)}
                                        className="text-xs hover:text-red-500"
                                        >
                                        ×
                                        </button>
                                    </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Seat Preference */}
                        <div>
                            <Label>Seat preference</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                            {(["Aisle", "Window", "Exit Row", "Front"] as SeatPreference[]).map((seat) => (
                                <Button
                                key={seat}
                                type="button"
                                variant={travelPrefs.seatPreference.includes(seat) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleSeatPreference(seat)}
                                >
                                {seat}
                                </Button>
                            ))}
                            </div>
                        </div>

                        {/* Check Bags */}
                        <div className="flex items-center gap-2 mt-6">
                            <Checkbox 
                            id="bags" 
                            checked={travelPrefs.alwaysCheckBags}
                            onCheckedChange={(checked) => 
                                setTravelPrefs(prev => ({ ...prev, alwaysCheckBags: checked as boolean }))
                            }
                            />
                            <Label htmlFor="bags">Always check bags</Label>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Hotels Section */}
                <section>
                    <h3 className="font-semibold mb-4 text-lg">Hotels</h3>
                    <div className="grid gap-4 md:grid-cols-2">

                    {/* Hotel Loyalty - Similar to Airline Loyalty */}
                    <div>
                        <Label>Hotel loyalty programs</Label>
                        <div className="mt-1 flex gap-2">
                        <Input 
                            placeholder="e.g., Marriott Bonvoy"
                            value={newHotelLoyalty}
                            onChange={(e) => setNewHotelLoyalty(e.target.value)}
                            onKeyDown={handleHotelLoyaltyKeyDown}
                        />
                        <Button onClick={() => handleAddHotelLoyalty()}>Add</Button>
                        </div>

                        {travelPrefs.hotelLoyalty.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {travelPrefs.hotelLoyalty.map((program, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {program}
                                        <button 
                                        onClick={() => handleRemoveHotelLoyalty(program)}
                                        className="text-xs hover:text-red-500"
                                        >
                                        ×
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Amenities */}
                    <div>
                        <Label>Must-have amenities</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                        {(["Gym", "Pool", "Restaurant", "Spa", "Elevator"] as Amenity[]).map((amenity) => (
                            <Button
                            key={amenity}
                            type="button"
                            variant={
                                travelPrefs.mustHaveAmenities.includes(amenity) 
                                ? "default" 
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handleAmenityToggle(amenity)}
                            >
                            {amenity}
                            </Button>
                        ))}
                        </div>
                    </div>

                    {/* Room Preference */}
                    <div>
                        <Label>Room preference</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                        {[
                            { value: "highfloor" as const, label: "High floor" },
                            { value: "kingbed" as const, label: "King bed" },
                            { value: "quietarea" as const, label: "Quiet area" }
                        ].map((room) => (
                            <Button
                            key={room.value}
                            type="button"
                            variant={
                                travelPrefs.roomPreference === room.value ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setTravelPrefs(prev => ({
                                ...prev,
                                roomPreference: prev.roomPreference === room.value ? null : room.value
                            }))}
                            >
                            {room.label}
                            </Button>
                        ))}
                        </div>
                    </div>
                    </div>
                </section>

                <Separator />

                {/* Ground Transportation Section */}
                <section>
                    <h3 className="font-semibold mb-4 text-lg">Ground Transportation</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label>Rental car company</Label>
                        <Select 
                        value={travelPrefs.rentalCarCompany || ""}
                        onValueChange={(value: string) => 
                            setTravelPrefs(prev => ({ ...prev, rentalCarCompany: value as TravelPreferences["rentalCarCompany"] }))
                        }
                        >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="hertz">Hertz</SelectItem>
                            <SelectItem value="avis">Avis</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Rideshare preference</Label>
                        <Select 
                        value={travelPrefs.ridesharePreference || ""}
                        onValueChange={(value:string) => 
                            setTravelPrefs(prev => ({ ...prev, ridesharePreference: value as TravelPreferences["ridesharePreference"] }))
                        }
                        >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="uber-black">Uber Black</SelectItem>
                            <SelectItem value="uber-x">Uber X</SelectItem>
                            <SelectItem value="lyft">Lyft</SelectItem>
                            <SelectItem value="taxi">Taxi</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    </div>
                </section>

                <div className="flex justify-between pt-4">
                    <span />
                    <Button onClick={goNext}>
                    Continue →
                    </Button>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
    )

}


// email setup types
export type PriorityLevel = "critical" | "important" | "later";
export type TonePreference = "professional" | "casual" | "technical";
export type LengthPreference = "concise" | "detailed" | "adaptive";
export type PrioritySender = {
  email: string;
  priority: PriorityLevel;
};
export type AutoResponse = {
  enabled: boolean;
  message: string;
};
export type EmailPreferences = {
  prioritySenders: PrioritySender[];
  autoResponses: {
    travel: AutoResponse;
    ooh: AutoResponse;
    focus: AutoResponse;
  };
  tone: TonePreference;
  length: LengthPreference;
};

export function EmailPreference({ goNext, goPrev }: { goNext: () => void; goPrev: () => void }) {

  const [emailPrefs, setEmailPrefs] = useState<EmailPreferences>({
    prioritySenders: [],
    autoResponses: {
      travel: {
        enabled: true,
        message: "I'm traveling with limited email access until <return date>."
      },
      ooh: {
        enabled: true,
        message: "I'll respond during business hours."
      },
      focus: {
        enabled: false,
        message: "In deep work until <end time>."
      }
    },
    tone: "professional",
    length: "concise"
  });

  const [newSenderEmail, setNewSenderEmail] = useState("");
  const [newSenderPriority, setNewSenderPriority] = useState<PriorityLevel>("critical");

  // Priority Senders Handlers
  const handleAddPrioritySender = () => {
    if (newSenderEmail.trim() && !emailPrefs.prioritySenders.some(sender => sender.email === newSenderEmail.trim())) {
      setEmailPrefs(prev => ({
        ...prev,
        prioritySenders: [
          ...prev.prioritySenders,
          { email: newSenderEmail.trim(), priority: newSenderPriority }
        ]
      }));
      setNewSenderEmail("");
    }
  };

  const handleRemovePrioritySender = (emailToRemove: string) => {
    setEmailPrefs(prev => ({
      ...prev,
      prioritySenders: prev.prioritySenders.filter(sender => sender.email !== emailToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPrioritySender();
    }
  };

  // Auto-response Handlers
  const handleAutoResponseToggle = (type: keyof EmailPreferences['autoResponses']) => {
    setEmailPrefs(prev => ({
      ...prev,
      autoResponses: {
        ...prev.autoResponses,
        [type]: {
          ...prev.autoResponses[type],
          enabled: !prev.autoResponses[type].enabled
        }
      }
    }));
  };

  const handleAutoResponseMessageChange = (type: keyof EmailPreferences['autoResponses'], message: string) => {
    setEmailPrefs(prev => ({
      ...prev,
      autoResponses: {
        ...prev.autoResponses,
        [type]: {
          ...prev.autoResponses[type],
          message
        }
      }
    }));
  };

  // Tone and Length Handlers
  const handleToneChange = (tone: TonePreference) => {
    setEmailPrefs(prev => ({ ...prev, tone }));
  };

  const handleLengthChange = (length: LengthPreference) => {
    setEmailPrefs(prev => ({ ...prev, length }));
  };

  return (
    <TabsContent value="email" className="mt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Email Management Rules</CardTitle>
          <CardDescription>
            How should I prioritize your attention?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Priority Senders Section */}
          <section>
            <h3 className="font-semibold mb-2">Priority senders</h3>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Input 
                        placeholder="Add sender: ceo@company.com" 
                        value={newSenderEmail}
                        onChange={(e) => setNewSenderEmail(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <Select 
                    value={newSenderPriority} 
                    onValueChange={(value: PriorityLevel) => setNewSenderPriority(value)}
                    >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="later">Read Later</SelectItem>
                    </SelectContent>
                    </Select>
                    <Button onClick={handleAddPrioritySender}>Add</Button>
                </div>
                
                {/* Priority Senders List */}
                {emailPrefs.prioritySenders.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                    {emailPrefs.prioritySenders.map((sender, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {sender.email} ({sender.priority})
                        <button 
                            onClick={() => handleRemovePrioritySender(sender.email)}
                            className="text-xs hover:text-red-500"
                        >
                            ×
                        </button>
                        </Badge>
                    ))}
                    </div>
                )}
            </div>
          </section>

          <Separator />

          {/* Auto-responses Section */}
          <section className="grid gap-4 md:grid-cols-3">
            {/* Travel Auto-response */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="travel-auto" 
                  checked={emailPrefs.autoResponses.travel.enabled}
                  onCheckedChange={() => handleAutoResponseToggle('travel')}
                />
                <Label htmlFor="travel-auto">Auto‑response: Traveling</Label>
              </div>
              <Input 
                value={emailPrefs.autoResponses.travel.message}
                onChange={(e) => handleAutoResponseMessageChange('travel', e.target.value)}
                disabled={!emailPrefs.autoResponses.travel.enabled}
              />
            </div>

            {/* Out of Hours Auto-response */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="ooh-auto" 
                  checked={emailPrefs.autoResponses.ooh.enabled}
                  onCheckedChange={() => handleAutoResponseToggle('ooh')}
                />
                <Label htmlFor="ooh-auto">Auto‑response: Outside work hours</Label>
              </div>
              <Input 
                value={emailPrefs.autoResponses.ooh.message}
                onChange={(e) => handleAutoResponseMessageChange('ooh', e.target.value)}
                disabled={!emailPrefs.autoResponses.ooh.enabled}
              />
            </div>

            {/* Focus Time Auto-response */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="focus-auto" 
                  checked={emailPrefs.autoResponses.focus.enabled}
                  onCheckedChange={() => handleAutoResponseToggle('focus')}
                />
                <Label htmlFor="focus-auto">Auto‑response: Focus time</Label>
              </div>
              <Input 
                value={emailPrefs.autoResponses.focus.message}
                onChange={(e) => handleAutoResponseMessageChange('focus', e.target.value)}
                disabled={!emailPrefs.autoResponses.focus.enabled}
              />
            </div>
          </section>

          <Separator />

          {/* Tone and Length Section */}
          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Tone</Label>
              <Select 
                value={emailPrefs.tone} 
                onValueChange={(value: TonePreference) => handleToneChange(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Length</Label>
              <Select 
                value={emailPrefs.length} 
                onValueChange={(value: LengthPreference) => handleLengthChange(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="adaptive">Adapt to recipient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <div className="flex justify-between">
            <Button variant="outline" onClick={goPrev}>← Back</Button>
            <Button onClick={goNext}>Continue →</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}



export type TimePreference = string; // Format: "HH:MM"
export type Timezone = "auto" | "Africa/Lagos" | "America/Los_Angeles" | "Europe/London";
export type BufferTime = 0 | 5 | 10 | 15 | 20 | 30 | 45 | 60;
export type MeetingLength = 15 | 25 | 30 | 45 | 60;

export type SchedulingPreferences = {
  workdayStart: TimePreference;
  workdayEnd: TimePreference;
  timezone: Timezone;
  focusSessions: boolean;
  focusSessionHours: number;
  meetingHours: boolean;
  meetingStartLimit: TimePreference;
  meetingEndLimit: TimePreference; 
  bufferTime: BufferTime;
  defaultMeetingLength: MeetingLength;
  preferVideoCalls: boolean;
  autoDeclineNoAgenda: boolean;
};

// Helper function to generate time options
const hours = (): string[] => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

export function SchedulingPreference({ goNext, goPrev }: { goNext: () => void; goPrev: () => void }) {
  const [schedulingPrefs, setSchedulingPrefs] = useState<SchedulingPreferences>({
    workdayStart: "08:00",
    workdayEnd: "18:00",
    timezone: "auto",
    focusSessions: true,
    focusSessionHours: 2,
    meetingHours: true,
    meetingStartLimit: "09:00",
    meetingEndLimit: "16:00",
    bufferTime: 15,
    defaultMeetingLength: 30,
    preferVideoCalls: true,
    autoDeclineNoAgenda: false,
  });

  // Handler functions
  const handleWorkdayStartChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, workdayStart: value }));
  };

  const handleWorkdayEndChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, workdayEnd: value }));
  };

  const handleTimezoneChange = (value: Timezone) => {
    setSchedulingPrefs(prev => ({ ...prev, timezone: value }));
  };

  const handleFocusSessionsToggle = (enabled: boolean) => {
    setSchedulingPrefs(prev => ({ ...prev, focusSessions: enabled }));
  };

  const handleFocusSessionHoursChange = (hours: number) => {
    setSchedulingPrefs(prev => ({ ...prev, focusSessionHours: hours }));
  };

  const handleMeetingHoursToggle = (enabled: boolean) => {
    setSchedulingPrefs(prev => ({ ...prev, meetingHours: enabled }));
  };

  const handleMeetingStartLimitChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, meetingStartLimit: value }));
  };

  const handleMeetingEndLimitChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, meetingEndLimit: value }));
  };

  const handleBufferTimeChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, bufferTime: parseInt(value) as BufferTime }));
  };

  const handleMeetingLengthChange = (value: string) => {
    setSchedulingPrefs(prev => ({ ...prev, defaultMeetingLength: parseInt(value) as MeetingLength }));
  };

  const handleVideoCallsToggle = (enabled: boolean) => {
    setSchedulingPrefs(prev => ({ ...prev, preferVideoCalls: enabled }));
  };

  const handleAutoDeclineToggle = (enabled: boolean) => {
    setSchedulingPrefs(prev => ({ ...prev, autoDeclineNoAgenda: enabled }));
  };

  return (
    <TabsContent value="schedule" className="mt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Scheduling Preferences</CardTitle>
          <CardDescription>
            How should I protect your focus and manage your time?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Work Hours Section */}
          <section className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Workday start</Label>
              <Select 
                value={schedulingPrefs.workdayStart} 
                onValueChange={handleWorkdayStartChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours().map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Workday end</Label>
              <Select 
                value={schedulingPrefs.workdayEnd} 
                onValueChange={handleWorkdayEndChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours().map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Timezone</Label>
              <Select 
                value={schedulingPrefs.timezone} 
                onValueChange={handleTimezoneChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* Focus & Meeting Protection Section */}
          <section className="grid gap-6 md:grid-cols-2">
            {/* Focus Sessions */}
            <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Focus sessions daily</p>
                  <p className="text-sm text-muted-foreground">Automatically adds protected focus blocks.</p>
                </div>
                <Switch 
                  checked={schedulingPrefs.focusSessions}
                  onCheckedChange={handleFocusSessionsToggle}
                />
            </div>
            {schedulingPrefs.focusSessions && (
              <div className="flex items-center gap-2 pt-2">
                <Label htmlFor="focus-hours" className="text-sm whitespace-nowrap">
                  Duration:
                </Label>
                <Select 
                  value={schedulingPrefs.focusSessionHours.toString()} 
                  onValueChange={(value) => handleFocusSessionHoursChange(parseInt(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 1.5, 2, 2.5, 3, 4, 6, 7, 8, 9, 10].map((hours) => (
                      <SelectItem key={hours} value={hours.toString()}>
                        {hours} {hours === 1 ? 'hour' : 'hours'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              )}
            </div>

            {/* Meeting Hours */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Restrict meeting hours</p>
                  <p className="text-sm text-muted-foreground">Keeps your preferred times clear.</p>
                </div>
                <Switch 
                  checked={schedulingPrefs.meetingHours}
                  onCheckedChange={handleMeetingHoursToggle}
                />
              </div>
              {schedulingPrefs.meetingHours && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div>
                      <Label htmlFor="meeting-start" className="text-xs">
                        No meetings before
                      </Label>
                      <Select 
                        value={schedulingPrefs.meetingStartLimit} 
                        onValueChange={handleMeetingStartLimitChange}
                      >
                        <SelectTrigger className="w-full text-xs h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hours().map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="meeting-end" className="text-xs">
                        No meetings after
                      </Label>
                      <Select 
                        value={schedulingPrefs.meetingEndLimit} 
                        onValueChange={handleMeetingEndLimitChange}
                      >
                        <SelectTrigger className="w-full text-xs h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hours().map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
              )}
            </div>

            {/* Buffer Time */}
            <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
              <div>
                <p className="font-medium">Buffer between meetings</p>
                <p className="text-sm text-muted-foreground">Minutes between meetings</p>
              </div>
              <Select 
                value={schedulingPrefs.bufferTime.toString()} 
                onValueChange={handleBufferTimeChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 5, 10, 15, 20, 30, 45, 60].map((m) => (
                    <SelectItem key={m} value={m.toString()}>{m} {m > 0 ? "mins" : "min"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* Meeting Preferences Section */}
          <section className="grid gap-6 md:grid-cols-2">
            {/* Default Meeting Length */}
            <div>
              <Label>Default meeting length</Label>
              <Select 
                value={schedulingPrefs.defaultMeetingLength.toString()} 
                onValueChange={handleMeetingLengthChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[15, 25, 30, 45, 60].map((m) => (
                    <SelectItem key={m} value={m.toString()}>{m} minutes</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Video Calls Preference */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Prefer video calls over in-person</p>
                <p className="text-sm text-muted-foreground">We&#30;ll suggest video when possible.</p>
              </div>
              <Switch 
                checked={schedulingPrefs.preferVideoCalls}
                onCheckedChange={handleVideoCallsToggle}
              />
            </div>

            {/* Auto-decline without Agendas */}
            <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
              <div>
                <p className="font-medium">Auto-decline meetings without agendas</p>
                <p className="text-sm text-muted-foreground">We&#30;ll ask for an agenda before accepting.</p>
              </div>
              <Switch 
                checked={schedulingPrefs.autoDeclineNoAgenda}
                onCheckedChange={handleAutoDeclineToggle}
              />
            </div>
          </section>

          <div className="flex justify-between">
            <Button variant="outline" onClick={goPrev}>← Back</Button>
            <Button onClick={goNext}>Continue →</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}




export type ServiceType = "email" | "calendar" | "travel";
export type ConnectionStatus = "connected" | "disconnected" | "pending";

export type EmailService = "gmail" | "outlook" | "other";
export type CalendarService = "google-calendar" | "outlook-calendar";
export type TravelService = "delta" | "marriott" | "uber";

export type Integration = {
  id: string;
  serviceType: ServiceType;
  serviceName: string;
  status: ConnectionStatus;
  connectedAt?: string;
};

export type IntegrationsPreferences = {
  email: {
    gmail: boolean;
    outlook: boolean;
    other: boolean;
  };
  calendar: {
    googleCalendar: boolean;
    outlookCalendar: boolean;
  };
  travel: {
    delta: boolean;
    marriott: boolean;
    uber: boolean;
  };
};

// ServiceBox Component
function ServiceBox({ title, actions, integrations, onConnect, onDisconnect, className = "" }: { 
  title: string;
  actions: string[];
  integrations: Integration[];
  onConnect: (serviceName: string) => void;
  onDisconnect: (serviceName: string) => void;
  className?: string;
}) {

    const getServiceStatus = (serviceName: string): ConnectionStatus => {
      const integration = integrations.find(int => int.serviceName === serviceName);
      return integration?.status || "disconnected";
    };

    const getStatusColor = (status: ConnectionStatus) => {
      switch (status) {
        case "connected": return "bg-green-100 text-green-800 border-green-200";
        case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "disconnected": return "bg-gray-100 text-gray-600 border-gray-200";
      }
    };

    const getStatusText = (status: ConnectionStatus) => {
      switch (status) {
        case "connected": return "Connected";
        case "pending": return "Pending";
        case "disconnected": return "Not Connected";
      }
    };

    return (
      <div className={`rounded-lg border p-4 ${className}`}>
        <h3 className="font-semibold mb-3">{title}</h3>
        <div className="space-y-2">
          {actions.map((action) => {
            const status = getServiceStatus(action);
            return (
              <div key={action} className="flex items-center justify-between">
                <span className="text-sm">{action}</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(status)}`}
                  >
                    {getStatusText(status)}
                  </Badge>
                  {status === "disconnected" ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onConnect(action)}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => onDisconnect(action)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export function IntegrationsPreference({ goNext, goPrev }: { goNext: () => void; goPrev: () => void }) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const [integrationsPrefs, setIntegrationsPrefs] = useState<IntegrationsPreferences>({
    email: {
      gmail: false,
      outlook: false,
      other: false
    },
    calendar: {
      googleCalendar: false,
      outlookCalendar: false
    },
    travel: {
      delta: false,
      marriott: false,
      uber: false
    }
  });

  console.log("integrationsPrefs", integrationsPrefs);

  // Handler to connect a service
  const handleConnect = (serviceName: string) => {
    // Trigger OAuth flow
    const newIntegration: Integration = {
      id: `${serviceName}-${Date.now()}`,
      serviceName,
      serviceType: getServiceType(serviceName),
      status: "pending", // Would become "connected" after successful auth
      connectedAt: new Date().toISOString()
    };

    setIntegrations(prev => [...prev.filter(int => int.serviceName !== serviceName), newIntegration]);
    
    // Update preferences
    updateIntegrationPrefs(serviceName, true);
  };

  // Handler to disconnect a service
  const handleDisconnect = (serviceName: string) => {
    setIntegrations(prev => prev.filter(int => int.serviceName !== serviceName));
    
    // Update preferences
    updateIntegrationPrefs(serviceName, false);
  };

  // Helper to determine service type
  const getServiceType = (serviceName: string): ServiceType => {
    if (["Connect Gmail", "Connect Outlook", "Other"].includes(serviceName)) {
      return "email";
    } else if (["Connect Google Calendar", "Connect Outlook Calendar"].includes(serviceName)) {
      return "calendar";
    } else {
      return "travel";
    }
  };

  // Update integration preferences
  const updateIntegrationPrefs = (serviceName: string, connected: boolean) => {
    setIntegrationsPrefs(prev => {
      const newPrefs = { ...prev };
      
      switch (serviceName) {
        case "Connect Gmail":
          newPrefs.email.gmail = connected;
          break;
        case "Connect Outlook":
          newPrefs.email.outlook = connected;
          break;
        case "Other":
          newPrefs.email.other = connected;
          break;
        case "Connect Google Calendar":
          newPrefs.calendar.googleCalendar = connected;
          break;
        case "Connect Outlook Calendar":
          newPrefs.calendar.outlookCalendar = connected;
          break;
        case "Connect Delta":
          newPrefs.travel.delta = connected;
          break;
        case "Connect Marriott":
          newPrefs.travel.marriott = connected;
          break;
        case "Connect Uber":
          newPrefs.travel.uber = connected;
          break;
      }
      
      return newPrefs;
    });
  };

  // Check if any integrations are connected
  const hasConnectedIntegrations = integrations.some(int => int.status === "connected" || int.status === "pending");

  return (
    <TabsContent value="integrations" className="mt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Connect Accounts</CardTitle>
          <CardDescription>
            Let&#30;s connect your accounts securely. Read-only where possible; will always ask before taking action.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connected Services Summary */}
          {hasConnectedIntegrations && (
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Connected Services</h4>
              <div className="flex flex-wrap gap-2">
                {integrations
                  .filter(int => int.status === "connected" || int.status === "pending")
                  .map((integration) => (
                    <Badge key={integration.id} variant="secondary" className="bg-blue-100 text-blue-800">
                      {integration.serviceName} 
                      <span className="ml-1 text-xs">
                        ({integration.status === "pending" ? "Connecting..." : "Connected"})
                      </span>
                    </Badge>
                  ))
                }
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {/* Email Services */}
            <ServiceBox 
              title="Email" 
              actions={["Connect Gmail", "Connect Outlook", "Other"]}
              integrations={integrations}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
            
            {/* Calendar Services */}
            <ServiceBox 
              title="Calendar" 
              actions={["Connect Google Calendar", "Connect Outlook Calendar"]}
              integrations={integrations}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
            
            {/* Travel Services */}
            <ServiceBox 
              title="Travel Accounts" 
              actions={["Connect Delta", "Connect Marriott", "Connect Uber"]}
              integrations={integrations}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              className="md:col-span-2"
            />
          </div>

          <Separator />

          {/* Authorization Summary */}
          <div className="rounded-lg border p-4 bg-gray-50">
            <h4 className="font-semibold mb-2">Authorization Summary</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Email access</strong> for priority management, auto-responses, and trip detection</li>
              <li>• <strong>Calendar access</strong> for scheduling, availability, and focus time protection</li>
              <li>• <strong>Travel accounts</strong> for automatic booking preferences and loyalty programs</li>
              <li>• <strong>Manual approval required</strong> for any booking or sending actions</li>
              <li>• <strong>Read-only access</strong> for analysis and recommendation purposes</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={goPrev}>← Back</Button>
            <Button 
              onClick={goNext}
              disabled={!hasConnectedIntegrations}
            >
              Authorize Selected →
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}




export type WorkingStyle = "chief" | "pa" | "efficiency";
export type ProactivityLevel = number; // 0-100 scale

export type WorkingStylePreferences = {
  style: WorkingStyle;
  proactivityLevel: ProactivityLevel;
  dailyBriefing: boolean;
  dailyBriefingTime: string;
  urgentAlerts: boolean;
  endOfDaySummary: boolean;
};

// RadioCard Component
function RadioCard({ 
  value, 
  title, 
  description, 
  selected, 
  onSelect 
}: { 
  value: WorkingStyle;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (value: WorkingStyle) => void;
}) {
  return (
    <div 
      className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 text-left transition-all hover:border-gray-400 ${
        selected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-gray-200'
      }`}
      onClick={() => onSelect(value)}
    >
      <div className={`mt-0.5 h-4 w-4 rounded-full border-2 ${
        selected 
          ? 'border-blue-500 bg-blue-500' 
          : 'border-gray-300'
      }`} />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// RadioCardGroup Component
function RadioCardGroup({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  return <div className="space-y-3">{children}</div>;
}

export function WorkingStylePreference({ goNext, goPrev }: { goNext: () => void; goPrev: () => void }) {
  const [workingStylePrefs, setWorkingStylePrefs] = useState<WorkingStylePreferences>({
    style: "chief",
    proactivityLevel: 50,
    dailyBriefing: true,
    dailyBriefingTime: "08:00",
    urgentAlerts: true,
    endOfDaySummary: false,
  });

  // Handler for working style selection
  const handleStyleSelect = (style: WorkingStyle) => {
    setWorkingStylePrefs(prev => ({ ...prev, style }));
  };

  // Handler for proactivity level change
  const handleProactivityChange = (value: number[]) => {
    setWorkingStylePrefs(prev => ({ ...prev, proactivityLevel: value[0] }));
  };

  // Handler for checkbox toggles
  const handleDailyBriefingToggle = (enabled: boolean) => {
    setWorkingStylePrefs(prev => ({ ...prev, dailyBriefing: enabled }));
  };

  const handleBriefingTimeChange = (time: string) => {
    setWorkingStylePrefs(prev => ({ ...prev, dailyBriefingTime: time }));
  };

  const handleUrgentAlertsToggle = (enabled: boolean) => {
    setWorkingStylePrefs(prev => ({ ...prev, urgentAlerts: enabled }));
  };

  const handleEndOfDaySummaryToggle = (enabled: boolean) => {
    setWorkingStylePrefs(prev => ({ ...prev, endOfDaySummary: enabled }));
  };

  return (
    <TabsContent value="style" className="mt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Working Style</CardTitle>
          <CardDescription>
            How would you like me to work with you?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Working Style Selection */}
          <div className="space-y-4">
            <RadioCardGroup>
              <RadioCard 
                value="chief" 
                title="Chief of Staff" 
                description="Professional, anticipatory — I'll handle details and bring solutions." 
                selected={workingStylePrefs.style === "chief"}
                onSelect={handleStyleSelect}
              />
              <RadioCard 
                value="pa" 
                title="Personal Assistant" 
                description="Friendly, supportive — I'm here to help with whatever you need!" 
                selected={workingStylePrefs.style === "pa"}
                onSelect={handleStyleSelect}
              />
              <RadioCard 
                value="efficiency" 
                title="Efficiency Expert" 
                description="Direct, data‑driven — optimal path based on the data." 
                selected={workingStylePrefs.style === "efficiency"}
                onSelect={handleStyleSelect}
              />
            </RadioCardGroup>
          </div>

          <Separator />

          {/* Proactivity Level */}
          <div>
            <Label className="mb-2 block">Proactivity level</Label>
            <Slider 
              value={[workingStylePrefs.proactivityLevel]} 
              onValueChange={handleProactivityChange}
              step={5}
              max={100}
              className="mt-4"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Ask first</span>
              <span>Make small decisions</span>
              <span>Take initiative</span>
            </div>
            <div className="mt-1 text-center text-sm text-blue-600">
              {workingStylePrefs.proactivityLevel <= 33 && "Always ask before taking action"}
              {workingStylePrefs.proactivityLevel > 33 && workingStylePrefs.proactivityLevel <= 66 && "Suggest actions and get approval"}
              {workingStylePrefs.proactivityLevel > 66 && "Take initiative on routine tasks"}
            </div>
          </div>

          <Separator />

          {/* Communication Preferences */}
          <section className="grid gap-4 md:grid-cols-3">

            <div className="flex items-center gap-2">
              <Checkbox 
                id="briefing" 
                checked={workingStylePrefs.dailyBriefing}
                onCheckedChange={handleDailyBriefingToggle}
              />
              <Label htmlFor="briefing" className="whitespace-nowrap">Daily briefing at</Label>
              <Select 
                value={workingStylePrefs.dailyBriefingTime} 
                onValueChange={handleBriefingTimeChange}
                disabled={!workingStylePrefs.dailyBriefing}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours().map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                id="urgent" 
                checked={workingStylePrefs.urgentAlerts}
                onCheckedChange={handleUrgentAlertsToggle}
              />
              <Label htmlFor="urgent">Urgent alerts only during focus</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="eod" 
                checked={workingStylePrefs.endOfDaySummary}
                onCheckedChange={handleEndOfDaySummaryToggle}
              />
              <Label htmlFor="eod">Summary report at end of day</Label>
            </div>
          </section>

          {/* Style Description */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="font-semibold mb-2">How this will work:</h4>
            <p className="text-sm text-gray-600">
              {workingStylePrefs.style === "chief" && 
                "I'll proactively manage your schedule, anticipate needs, and present complete solutions for your approval. Professional tone with strategic thinking."}
              {workingStylePrefs.style === "pa" && 
                "I'll provide friendly support, help with daily tasks, and be available whenever you need assistance. Warm tone with personal touch."}
              {workingStylePrefs.style === "efficiency" && 
                "I'll optimize everything for maximum productivity, use data-driven decisions, and focus on the most effective approaches. Direct tone with clear metrics."}
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={goPrev}>← Back</Button>
            <Button onClick={goNext}>Continue →</Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}



export type ScanStatus = "idle" | "scanning" | "completed" | "error";
export type ConflictType = "schedule" | "travel" | "email" | "priority";

export type Conflict = {
  id: string;
  type: ConflictType;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  suggestedAction: string;
  autoFixable: boolean;
};

export type QuickWinState = {
  scanStatus: ScanStatus;
  progress: number;
  conflicts: Conflict[];
  selectedConflict: string | null;
};

// ScanningPanel Component
function ScanningPanel({ scanStatus, progress }: { scanStatus: ScanStatus; progress: number }) {
  const getStatusText = () => {
    switch (scanStatus) {
      case "idle": return "Ready to scan";
      case "scanning": return "Analyzing your schedules and preferences...";
      case "completed": return "Analysis complete!";
      case "error": return "Scan failed - please try again";
    }
  };

  const getStatusColor = () => {
    switch (scanStatus) {
      case "idle": return "text-gray-600";
      case "scanning": return "text-blue-600";
      case "completed": return "text-green-600";
      case "error": return "text-red-600";
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">System Analysis</h3>
        <Badge 
          variant={scanStatus === "completed" ? "default" : "secondary"}
          className={getStatusColor()}
        >
          {scanStatus === "scanning" ? "Scanning..." : scanStatus}
        </Badge>
      </div>
      
      <Progress value={progress} className="mb-2" />
      
      <p className={`text-sm ${getStatusColor()}`}>
        {getStatusText()}
      </p>
      
      {scanStatus === "scanning" && (
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          <li>• Checking calendar conflicts...</li>
          <li>• Reviewing travel preferences...</li>
          <li>• Analyzing email rules...</li>
          <li>• Identifying optimization opportunities...</li>
        </ul>
      )}
    </div>
  );
}

// ConflictCard Component
function ConflictCard({ 
  conflict, 
  isSelected, 
  onSelect 
}: { 
  conflict: Conflict;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const getSeverityColor = () => {
    switch (conflict.severity) {
      case "high": return "border-red-200 bg-red-50";
      case "medium": return "border-yellow-200 bg-yellow-50";
      case "low": return "border-blue-200 bg-blue-50";
    }
  };

  const getSeverityBadge = () => {
    switch (conflict.severity) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case "low": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Low Priority</Badge>;
    }
  };

  return (
    <div 
      className={`rounded-lg border p-4 cursor-pointer transition-all hover:border-gray-400 ${
        isSelected ? 'border-2 border-blue-500 bg-blue-50' : getSeverityColor()
      }`}
      onClick={() => onSelect(conflict.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium">{conflict.title}</h4>
        {getSeverityBadge()}
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {conflict.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-green-600">
          {conflict.suggestedAction}
        </span>
        {conflict.autoFixable && (
          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
            Auto-fix available
          </Badge>
        )}
      </div>
    </div>
  );
}

export function QuickWinPreference({ 
  goNext, 
  goPrev 
}: { 
  goNext: () => void; 
  goPrev: () => void;
}) {
  const [quickWinState, setQuickWinState] = useState<QuickWinState>({
    scanStatus: "idle",
    progress: 0,
    conflicts: [],
    selectedConflict: null,
  });

  // Simulate scanning process
  useEffect(() => {
    if (quickWinState.scanStatus === "scanning") {
      const timer = setInterval(() => {
        setQuickWinState(prev => {
          const newProgress = Math.min(prev.progress + 10, 100);
          if (newProgress === 100) {
            // Add mock conflicts when scan completes
            return {
              ...prev,
              progress: newProgress,
              scanStatus: "completed",
              conflicts: [],
            };
          }
          return { ...prev, progress: newProgress };
        });
      }, 300);

      return () => clearInterval(timer);
    }
  }, [quickWinState.scanStatus]);

  // Start scanning on component mount
  useEffect(() => {
    const startScan = setTimeout(() => {
      setQuickWinState(prev => ({ ...prev, scanStatus: "scanning", progress: 0 }));
    }, 1000);

    return () => clearTimeout(startScan);
  }, []);

  // Handler for conflict selection
  const handleConflictSelect = (id: string) => {
    setQuickWinState(prev => ({ 
      ...prev, 
      selectedConflict: prev.selectedConflict === id ? null : id 
    }));
  };

  // Handler for applying quick win
  const handleApplyQuickWin = () => {
    const selectedConflict = quickWinState.conflicts.find(c => c.id === quickWinState.selectedConflict);
    if (selectedConflict?.autoFixable) {
      // In a real app, this would trigger the auto-fix
      alert(`Applying fix: ${selectedConflict.suggestedAction}`);
      // Remove the fixed conflict
      setQuickWinState(prev => ({
        ...prev,
        conflicts: prev.conflicts.filter(c => c.id !== selectedConflict.id),
        selectedConflict: null,
      }));
    }
  };

  const selectedConflict = quickWinState.conflicts.find(c => c.id === quickWinState.selectedConflict);

  return (
    <TabsContent value="quickwin" className="mt-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Finding a Quick Win…</CardTitle>
          <CardDescription>
            Let me analyze your current setup to find immediate improvements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scanning Panel */}
          <ScanningPanel 
            scanStatus={quickWinState.scanStatus} 
            progress={quickWinState.progress} 
          />

          {/* Conflicts List */}
          {quickWinState.scanStatus === "completed" && (
            quickWinState.conflicts.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-semibold">
                  Found {quickWinState.conflicts.length} optimization{quickWinState.conflicts.length !== 1 ? 's' : ''}
                </h3>
                
                {quickWinState.conflicts.map((conflict) => (
                  <ConflictCard 
                    key={conflict.id}
                    conflict={conflict}
                    isSelected={quickWinState.selectedConflict === conflict.id}
                    onSelect={handleConflictSelect}
                  />
                ))}
              </div>
            ):(
              <div className={`rounded-lg border p-4 cursor-pointer transition-all hover:border-gray-400 border-green-200 bg-green-50`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">No Conflict Found</h4>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  You&#30;re right on track!
                </p>
              </div>
                        
            )
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={goPrev}>← Back</Button>
            
            <div className="flex gap-2">
              {selectedConflict && (
                <Button 
                  variant={selectedConflict.autoFixable ? "default" : "secondary"}
                  onClick={handleApplyQuickWin}
                  disabled={!selectedConflict.autoFixable}
                >
                  {selectedConflict.autoFixable ? "Apply Fix" : "Manual Action Required"}
                </Button>
              )}
              
              <Button 
                onClick={goNext}
                disabled={quickWinState.scanStatus !== "completed"}
              >
                {selectedConflict?.type === "schedule" ? "Reschedule Stand-up →" : "Continue →"}
              </Button>
            </div>
          </div>

          {/* Selected Conflict Details */}
          {selectedConflict && (
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Selected Action</h4>
              <p className="text-sm text-blue-800">{selectedConflict.suggestedAction}</p>
              {!selectedConflict.autoFixable && (
                <p className="text-xs text-blue-600 mt-1">
                  This requires manual action. I&#30;ll guide you through the steps.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}