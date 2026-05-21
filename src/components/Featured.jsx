import FacilityCard from "./FacilityCard";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const facilities = await res.json();

  return (
    <section className="py-20 bg-linear-to-b from-white via-[#f8fffb] to-green-50">
      <div className="px-4 lg:px-0 lg:max-w-7xl lg:mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-200 bg-green-50 text-green-600 text-sm font-semibold">
            ⚡ Premium Sports Venues
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B35] leading-tight">
            Featured Facilities
          </h1>

          {/* Subtitle */}
          <p className="text-[#6C696D] text-base md:text-lg mt-5 leading-relaxed">
            Discover top-rated sports facilities near you and book your next
            game instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
