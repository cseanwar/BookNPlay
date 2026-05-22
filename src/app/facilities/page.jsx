import FacilityCard from "@/components/FacilityCard";
import { Button, Label, SearchField } from "@heroui/react";
import { Filter } from "lucide-react";
import React from "react";

const AllFacilitiesPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`);
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

      <div className="flex justify-between items-center mb-5">
        <div className="w-100 space-y-4">
          <SearchField fullWidth name="search">
            {/* <Label>Search</Label> */}
            <SearchField.Group className="bg-[#33415510]">
              <SearchField.SearchIcon className="text-[#22C55E]" />
              <SearchField.Input className="text-[#22C55E] font-semibold" placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <Button
          variant="flat"
          startContent={<Filter className="w-4 h-4" />}
          className="rounded-full font-bold"
        >
          Filters
        </Button>
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
