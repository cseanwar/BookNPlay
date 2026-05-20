import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import { LuMapPin } from "react-icons/lu";
import { RiArrowRightUpLine } from "react-icons/ri";
import { PiUsersBold, PiCalendarBold } from "react-icons/pi";

const FacilityCard = ({ facility }) => {
  const {
    _id,
    imageUrl,
    price_per_hour,
    facilityName,
    facility_type,
    location,
    capacity,
    available_slots,
  } = facility;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#22C55E]/30 hover:shadow-2xl transition-all duration-500">

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">

        <Image
          src={imageUrl?.trimStart()}
          alt={facilityName}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />

        {/* Facility Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#22C55E] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
            {facility_type}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-md text-[#0F172A] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            ৳ {price_per_hour}/hr
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Location */}
        <div className="flex items-center gap-2 text-[#64748B] text-sm mb-3">
          <LuMapPin className="text-[#22C55E]" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#0F172A] group-hover:text-[#22C55E] transition-colors duration-300 line-clamp-1">
          {facilityName}
        </h2>

        {/* Info */}
        <div className="flex items-center justify-between mt-5 text-sm text-[#64748B]">

          {/* Capacity */}
          <div className="flex items-center gap-2">
            <PiUsersBold className="text-[#22C55E] text-lg" />
            <span>{capacity} Players</span>
          </div>

          {/* Available Slots */}
          <div className="flex items-center gap-2">
            <PiCalendarBold className="text-[#22C55E] text-lg" />
            <span>{available_slots} Slots</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-5" />

        {/* Button */}
        <Link href={`/facilities/${_id}`}>
          <Button
            className="w-full bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white font-semibold rounded-xl py-6 text-base transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            Book Now
            <RiArrowRightUpLine className="text-lg" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FacilityCard;