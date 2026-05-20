import FacilityCard from "@/components/FacilityCard";
import React from "react";

const AllFacilitiesPage = async () => {
  const res = await fetch("http://localhost:5000/facilities");
  const facilities = await res.json();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A]">
          Explore Sports Facilities
        </h1>

        <p className="mt-4 text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed">
          Discover premium football turfs, badminton courts, swimming pools,
          tennis arenas and more near you.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {facilities.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>
    </div>
  );
};

export default AllFacilitiesPage;
