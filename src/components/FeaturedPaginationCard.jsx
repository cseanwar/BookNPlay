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
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {paginated.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "2px solid",
                  fontWeight: 700,
                  cursor: "pointer",
                  borderColor: currentPage === page ? "#22C55E" : "#E5E7Eb",
                  background: currentPage === page ? "#22C55E" : "#FFFFFF",
                  color: currentPage === page ? "#FFFFFF" : "#374151",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedPaginationCard;
