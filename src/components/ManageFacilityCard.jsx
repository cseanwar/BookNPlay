"use client";

import Image from "next/image";
import { MapPin, Pencil, Trash2, Users } from "lucide-react";

const ManageFacilityCard = ({ facility }) => {
  const {
    facilityName,
    imageUrl,
    location,
    capacity,
    facility_type,
    price_per_hour,
  } = facility;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      {/* IMAGE */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={facility.imageUrl}
          alt={facility.facilityName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

        {/* Badge */}
        <div className="absolute top-5 left-5 z-20">
          <span className="bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
            {facility_type}
          </span>
        </div>

        {/* Price */}
        <div className="absolute top-5 right-5 z-20">
          <span className="bg-white/90 backdrop-blur-md text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            ৳ {price_per_hour}/hr
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 z-20 text-white">
          <h2 className="text-4xl font-extrabold drop-shadow-xl">
            {facilityName}
          </h2>

          <div className="flex items-center gap-2 mt-3 text-gray-200">
            <MapPin size={17} />
            <p className="text-sm">{location}</p>
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-200">
            <Users size={17} />
            <p className="text-sm">{capacity} Players</p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="p-5 flex gap-4">
        <button className="flex-1 h-12 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
          <Pencil size={18} />
          Edit
        </button>

        <button className="flex-1 h-12 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2">
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageFacilityCard;
