import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import type { IconType } from "react-icons";
import { IoIosAirplane, IoIosMail, IoIosArrowRoundForward, IoIosPlayCircle} from "react-icons/io";
import { GoTasklist } from "react-icons/go";
import { CardWidgetOne } from "@/components/Cards";

type Feature = {
  Icon: IconType;
  title: string;
  listItems: string[];
};

const FEATURES: Feature[] = [
  {
    Icon: IoIosAirplane,
    title: "Travel Assistant",
    listItems: [
      "End-to-end travel planning",
      "Real-time Alerts & itinerary management",
      "Loyalty point optimization",
    ],
  },
  {
    Icon: IoIosMail,
    title: "Email Assistant",
    listItems: [
      "Smart filtering & prioritization",
      "AI-powered response drafting",
      "Unified communication hub",
    ],
  },
  {
    Icon: GoTasklist,
    title: "Scheduling Assistant",
    listItems: [
      "Meeting synthesis & scheduling",
      "Focus time protection",
      "Dynamic task management",
    ],
  },
];

export default function Home() {
  return (
    <div className="landing min-h-screen pt-5">
      <Navbar/>
      <main className=" md:items-center mt-[30px]">
        <section className="pt-[30px] px-[20px] md:grid md-grid md:grid-cols-[auto,35%] md:justify-between md:items-center">
          <div className="z-[100000]">
            <span className="text-[14px] bg-[#0F2A3F]/20 px-[15px] py-[6px] rounded-[10px] text-white uppercase">Your AI Chief of Staff for Daily Productivity</span>
            <h1 className="text-white md:text-[70px] font-extralight leading-none">Aura</h1>
            <p className="text-white text-[16px] w-[90%]">One assistant that handles travel, email, and scheduling - so you can focus on what matters</p>
            <div className="flex gap-6 mt-[20px] md:flex-row flex-col">
              <Link href="/" className="py-[8px] px-[25px] rounded-[16px] bg-[#fff] text-[#C69320] hover:text-[#FCC201] flex justify-center items-center"><IoIosPlayCircle className="mr-2 text-xl" /> Watch Demo Video</Link>
              <Link href="/" className="py-[8px] px-[25px] rounded-[16px] bg-[#C69320] text-white hover:bg-[#FCC201] flex justify-center items-center">Get Started <IoIosArrowRoundForward className="ml-2 text-xl"/></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-[20px]">
              {FEATURES.map((feature, index) => (
                <CardWidgetOne key={index} Icon={feature.Icon} title={feature.title} listItems={feature.listItems}/>
              ))}
            </div>
          </div>
          <Image src="/hero_img.png" alt="AI Chatbot helping with task etc" width={700} height={700}/>
        </section>
      </main>
      <footer />
    </div>
  );
}