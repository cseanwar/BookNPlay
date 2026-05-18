import Image from "next/image";
import Marquee from "react-fast-marquee";

const categories = [
  {
    id: 1,
    title: "Football Turf",
    image: "/assets/football.jpg",
  },
  {
    id: 2,
    title: "Cricket Turf",
    image: "/assets/cricket.png",
  },
  {
    id: 3,
    title: "Badminton Court",
    image: "/assets/badminton.jpg",
  },
  {
    id: 4,
    title: "Tennis Court",
    image: "/assets/tennis.jpg",
  },
  {
    id: 5,
    title: "Swimming Pool",
    image: "/assets/swimming.jpg",
  },
  {
    id: 6,
    title: "Table Tennis Court",
    image: "/assets/table-tennis.webp",
  },
];

const PopularSportsCategories = () => {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="text-center mb-15 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
          Popular Sports Categories
        </h2>

        <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">
          Discover and book premium sports facilities for your favorite games.
        </p>
      </div>

      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        <div className="flex gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative w-75 h-75 overflow-hidden rounded-xl shadow-lg mx-4 cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-contain group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition duration-300" />

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-center w-full px-6">
                <h3 className="text-white text-2xl font-bold">
                  {category.title}
                </h3>

                <button className="mt-4 bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:scale-105">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default PopularSportsCategories;
