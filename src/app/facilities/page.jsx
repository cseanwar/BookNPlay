"use client";

import FacilityCard from "@/components/FacilityCard";
import { useEffect, useState } from "react";
import { Filter, Search, X } from "lucide-react";

const SPORT_TYPES = [
  "All",
  "Football",
  "Cricket",
  "Badminton",
  "Swimming",
  "Tennis",
  "Table Tennis",
];

const AllFacilitiesPage = () => {
  const [facilities, setFacilities]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim())          params.set("search", search.trim());
        if (selectedType !== "All") params.set("type", selectedType);

        const res  = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?${params.toString()}`
        );
        const data = await res.json();
        setFacilities(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchFacilities, 400);
    return () => clearTimeout(timer);
  }, [search, selectedType]);

  const clearSearch = () => setSearch("");
  const clearAll    = () => { setSearch(""); setSelectedType("All"); };
  const hasFilters  = search.trim() || selectedType !== "All";

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-200 bg-green-50 text-[#22C55E] text-sm font-semibold">
            🏟️ All Venues
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mt-2">
            Explore Sports Facilities
          </h1>
          <p className="mt-4 text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed">
            Discover premium football turfs, badminton courts, swimming pools,
            tennis arenas and more near you.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search by facility name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition placeholder:text-gray-400"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-9 bg-gray-200 shrink-0" />

            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={15} className="text-gray-400 shrink-0" />
              {SPORT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 ${
                    selectedType === type
                      ? "bg-[#22C55E] text-white border-[#22C55E]"
                      : "bg-white text-slate-500 border-gray-200 hover:border-green-300 hover:text-green-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-red-500 text-xs font-semibold hover:text-red-600 whitespace-nowrap sm:ml-auto"
              >
                <X size={13} /> Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center mb-6 flex-wrap gap-10">
          <p className="text-sm text-gray-400">
            {loading
              ? "Searching…"
              : `${facilities.length} facilit${facilities.length === 1 ? "y" : "ies"} found`}
          </p>

          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              {search && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                  &quot;{search}&quot;
                  <button onClick={clearSearch} className="hover:text-green-900">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedType !== "All" && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {selectedType}
                  <button onClick={() => setSelectedType("All")} className="hover:text-green-900">
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded-full w-1/3" />
                  <div className="h-5 bg-gray-200 rounded-full" />
                  <div className="h-3 bg-gray-200 rounded-full w-2/3" />
                  <div className="h-10 bg-gray-200 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>

        ) : facilities.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 text-4xl">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-400 text-base mb-8">
              Try adjusting your search or filter to find what you are looking for.
            </p>
            <button
              onClick={clearAll}
              className="bg-linear-to-r from-[#22C55E] to-[#15803D] text-white font-bold px-8 py-3 rounded-xl text-sm hover:opacity-90 transition"
            >
              Clear filters
            </button>
          </div>

        ) : (
          /* Facility grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllFacilitiesPage;