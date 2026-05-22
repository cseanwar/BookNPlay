"use client";

import { useState } from "react";
import FacilityCard from "./FacilityCard";

const ITEMS_PER_PAGE = 3;

const FeaturedPaginationCard = ({ facilities }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);

  const paginated = facilities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-8">
      {/* Facilities Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => {
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`
                      flex h-11 w-11 items-center justify-center rounded-xl
                      border-2 text-sm font-bold transition-all duration-200
                      ${
                        isActive
                          ? "border-green-500 bg-green-500 text-white shadow-md shadow-green-200"
                          : "border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:text-green-600"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedPaginationCard;