"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  "/Banner1.jpg",
  "/banner-football.jpg",
  "/banner-cricket.jpg",
  "/banner-badminton.jpg",
  "/banner-swimming.webp",
  "/banner-tenis.webp",
  "/banner-table-tenis.webp",
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-bottom transition-opacity duration-2000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] leading-tight">
            Book Your Favorite Sports Facilities
          </h1>

          <p className="mt-4 text-gray-200 text-lg max-w-2xl mx-auto">
            Explore football turfs, badminton courts, swimming lanes, tennis
            courts and more.
          </p>

          <Link href={'/facilities'}>
            <button className="mt-12 bg-linear-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              Explore Facilities
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
