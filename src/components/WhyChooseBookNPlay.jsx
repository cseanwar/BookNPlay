"use client";

import {
  CalendarCheck,
  MapPinned,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Instant Booking",
    description:
      "Reserve your favorite sports facilities in just a few clicks without any hassle.",
    icon: CalendarCheck,
  },
  {
    id: 2,
    title: "Multiple Sports Venues",
    description:
      "Explore football turfs, badminton courts, swimming pools, tennis courts and more.",
    icon: MapPinned,
  },
  {
    id: 3,
    title: "Secure Authentication",
    description:
      "Your bookings and personal information stay safe with modern authentication security.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Premium Experience",
    description:
      "Enjoy a smooth and modern sports facility booking experience anytime, anywhere.",
    icon: Trophy,
  },
];

const WhyChooseBookNPlay = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Why Choose BookNPlay
          </h2>

          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            BookNPlay provides a seamless and modern platform to discover,
            reserve, and manage sports facilities with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group bg-[#F8FAFC] rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2"
              >

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
                  <Icon className="text-white" size={30} />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-[#0F172A] group-hover:text-[#22C55E] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="mt-4 text-[#64748B] leading-relaxed text-sm">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookNPlay;