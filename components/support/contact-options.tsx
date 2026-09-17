import { ArrowUpRight, Clock, Mail, MessageCircle } from "lucide-react";

const options = [
  {
    icon: Mail,
    title: "Email Us",
    desc: "Drop us a line and we'll get back to you soon.",
    bg: "#FCE7D0",
    badge: "bg-white/70 text-[#C25D14]",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Quick answers, real people.",
    bg: "#DCE7D0",
    badge: "bg-white/70 text-[#4A6B2E]",
  },
  {
    icon: Clock,
    title: "Response Time",
    desc: "Within 24 hours",
    bg: "#E8E0F2",
    badge: "bg-white/70 text-[#6E4FA3]",
  },
] as const;

export function ContactOptions() {
  return (
    <section className="bg-[#F5EEE3] pb-24 pt-20 sm:pb-32">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => {
          const Icon = o.icon;
          return (
            <a
              key={o.title}
              href="#ct-help"
              className="group flex h-[226px] flex-col justify-between rounded-[24px] p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(70,45,25,0.1)] active:scale-[0.98]"
              style={{ backgroundColor: o.bg }}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${o.badge} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon size={21} strokeWidth={2} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[17px] font-semibold text-[#302017]">
                  {o.title}
                </span>
                <span className="mt-1.5 block text-[14.5px] leading-snug text-[#6F665F]">
                  {o.desc}
                </span>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#302017]/15 bg-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.2}
                  className="text-[#6F665F]"
                  aria-hidden="true"
                />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}