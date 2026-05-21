"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import ManageFacilityCard from "@/components/ManageFacilityCard";

const ManageFacilitiesPage = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [facilities, setFacilities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFacilities = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities?email=${user.email}`,
      );

      const data = await res.json();

      setFacilities(data);

      setLoading(false);
    };

    fetchFacilities();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">
            ⚙️ Facility Management
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#0B1B35]">
            Manage My Facilities
          </h1>

          <p className="text-gray-500 text-lg mt-4">
            Update or delete your sports facilities.
          </p>
        </div>

        {/* Empty state */}
        {facilities.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <div className="text-7xl mb-6">🏟️</div>

            <h2 className="text-3xl font-bold text-[#0B1B35] mb-3">
              No Facilities Found
            </h2>

            <p className="text-gray-500 text-lg">
              You haven’t added any facilities yet.
            </p>
          </div>
        ) : (
          /* Facilities Grid */
          <div className="max-w-7xl mx-auto px-4 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
              {facilities.map((facility) => (
                <ManageFacilityCard
                  key={facility._id}
                  facility={facility}
                  facilities={facilities}
                  setFacilities={setFacilities}
                />
              ))}
            </div>
          </div>
          //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">

          //     {facilities.map((facility) => (
          //       <ManageFacilityCard
          //         key={facility._id}
          //         facility={facility}
          //       />
          //     ))}

          //   </div>
        )}
      </div>
    </section>
  );
};

export default ManageFacilitiesPage;
