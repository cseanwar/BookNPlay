import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import FacilityCard from "./FacilityCard";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const facilities = await res.json();

  return (
    <div className="my-10 px-4 lg:px-0 lg:max-w-7xl lg:mx-auto">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#0C0B0B] font-normal mb-2">
            Featured Facilities
          </h1>
          <p className="text-[#6C696D] text-base md:text-lg">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link href={"/destinations"} className="shrink-0">
          <Button
            variant="outline"
            className="rounded-2xl px-6 py-6 bg-linear-to-r from-[#22C55E] to-[#16A34A] w-full sm:w-auto"
          >
            ALL FACILITIES
            <FaArrowRightLong />
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {facilities.map((facility) => (
          <FacilityCard key={facility._id} destination={facility} />
        ))}
      </div>
    </div>
  );
};

export default Featured;