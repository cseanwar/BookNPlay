import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { LuMapPin, LuUsers, LuClock3 } from "react-icons/lu";
import { PiTagBold, PiCurrencyDollarBold } from "react-icons/pi";
import BookingCard from "@/components/BookingCard";
import Image from "next/image";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${id}`,
    {
      cache: "no-store",
    }
  );

  const facility = await res.json();

  const {
    facilityName,
    imageUrl,
    facility_type,
    price_per_hour,
    location,
    capacity,
    available_slots,
    description,
  } = facility;

  const stats = [
    {
      icon: <LuMapPin size={18} />,
      label: "Location",
      value: location,
    },
    {
      icon: <LuUsers size={18} />,
      label: "Capacity",
      value: `${capacity} Players`,
    },
    {
      icon: <PiTagBold size={18} />,
      label: "Sport Type",
      value: facility_type,
    },
    {
      icon: <PiCurrencyDollarBold size={18} />,
      label: "Price",
      value: `৳${price_per_hour}/hr`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      {/* HERO */}
      <div className="relative h-85 md:h-105 overflow-hidden">
        <Image
          src={imageUrl}
          alt={facilityName}
          fill
          priority
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        {/* content */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-10">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition mb-5 font-medium"
          >
            <BiArrowBack size={22} />
            Back to Facilities
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-green-500/90 backdrop-blur-md text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              {facility_type}
            </span>

            <span className="bg-white/15 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
              <span className="inline-flex items-center gap-2">
                <LuMapPin size={16} />
                {location}
              </span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl">
            {facilityName}
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          
          {/* LEFT */}
          <div className="space-y-8">
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                    {item.icon}
                  </div>

                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                    {item.label}
                  </p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-7 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                  <LuClock3 size={22} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Facility Overview
                  </p>

                  <h2 className="text-3xl font-black text-gray-900">
                    About This Facility
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 leading-8 text-[17px] text-justify">
                {description}
              </p>

              {/* opening hours */}
              <div className="mt-8 bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg">
                  <LuClock3 size={24} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-green-700 font-bold mb-1">
                    Available Slots
                  </p>

                  <h3 className="text-xl font-black text-gray-900">
                    {available_slots}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-8">
            <BookingCard facility={facility} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;