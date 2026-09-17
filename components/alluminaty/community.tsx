"use client";

import { Users, CalendarHeart, GraduationCap, Briefcase, MessageSquareText } from "lucide-react";
import CommunityOrbit, {
  type OrbitItem,
  type OrbitStat,
  type OrbitTag,
} from "@/components/ui/builders-community-hero";

const memoji = (n: number) => `https://raw.githubusercontent.com/alohe/memojis/main/png/memo_${n}.png`;

function ThreadAvatar() {
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-[#dfe6f5]">
      <img
        src={memoji(33)}
        alt=""
        draggable={false}
        className="h-full w-full translate-y-[8%] scale-[1.1] object-cover object-top"
      />
    </span>
  );
}

// Outer ring left→right, then inner ring left→right. Alumni-network flavour.
const items: OrbitItem[] = [
  { kind: "status", ring: "outer", angle: 132, label: "Reunion planned" },
  { kind: "card", ring: "outer", angle: 112.6, emoji: "🎓", badge: 12 },
  { kind: "pill", ring: "outer", angle: 90, icon: <ThreadAvatar />, label: "8 new posts" },
  { kind: "pill", ring: "outer", angle: 67.6, icon: "🌍", label: "18" },
  { kind: "avatar", ring: "outer", angle: 50.9, src: memoji(9), alt: "Alumnus", color: "#c4bceb" },
  { kind: "pill", ring: "outer", angle: 35.2, icon: <MessageSquareText size={13} strokeWidth={2} />, label: "36" },
  { kind: "avatar", ring: "inner", angle: 137.2, src: memoji(19), alt: "Alumnus", color: "#ffdcb6" },
  { kind: "pill", ring: "inner", angle: 116.6, icon: "🤝", label: "24" },
  { kind: "avatar", ring: "inner", angle: 90, src: memoji(35), alt: "Alumnus", color: "#c0cef3", size: 48 },
  { kind: "card", ring: "inner", angle: 63.3, emoji: "🏫" },
  { kind: "check", ring: "inner", angle: 41.8 },
];

const stats: OrbitStat[] = [
  { value: "500+", label: "Verified alumni" },
  { value: "18", label: "Countries connected" },
  { value: "10", label: "Houses & batches" },
];

const tags: OrbitTag[] = [
  { icon: <Users strokeWidth={2} />, label: "Verified directory" },
  { icon: <CalendarHeart strokeWidth={2} />, label: "Reunions & events" },
  { icon: <GraduationCap strokeWidth={2} />, label: "Mentorship" },
  { icon: <Briefcase strokeWidth={2} />, label: "Alumni job board" },
];

export function AzCommunity() {
  return (
    <div className="w-full pt-14">
      <CommunityOrbit
        items={items}
        stats={stats}
        headline={
          <>
            One school. One network.
            <br className="hidden sm:block" /> Connected for life.
          </>
        }
        tags={tags}
      />
    </div>
  );
}
