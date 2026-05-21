import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { Calendar, CheckCircle, Eye, MapPin, Ticket } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 font-medium text-lg">
          Please log in to view your bookings.
        </p>
      </div>
    );
  }

  let bookings = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user.id}`, {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    bookings = await res.json();
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-xl font-semibold">
          Failed to load bookings. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center text-center mb-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold sm:text-4xl tracking-tight mb-3 text-[#0C0B0B]">
          My Bookings
        </h1>
        <p className="text-[#6C696D] text-sm sm:text-base leading-relaxed">
          Track, manage and organize all your sports facility reservations in
          one premium modern dashboard.
        </p>
      </div>

      {/* Main Content Area */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 px-4 text-[#6C696D] bg-white shadow-sm rounded-2xl border border-gray-100 max-w-xl mx-auto">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            No bookings yet
          </p>
          <p className="mb-6 text-sm text-gray-500">
            You haven’t booked any sports facility yet. Explore premium venues
            and start your next game today.
          </p>
          <Link href="/facilities">
            <Button className="rounded-xl font-medium bg-linear-to-r from-[#22C55E] to-[#16A34A] text-white px-6">
              Explore Facilities
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/80 min-h-[180px]"
            >
              {/* Left Image Section - Locked to 3/12 of the card width on desktop */}
              <div className="relative w-full h-48 md:h-full md:col-span-3 min-h-[180px] bg-gray-100 shrink-0">
                <Image
                  src={
                    booking.imageUrl?.trimStart() ||
                    "https://images.unsplash.com/photo-1540747737956-378724044282?w=500"
                  } // Added a temporary fallback to test if the URL itself is returning empty
                  alt={booking.facilityName}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 250px"
                />
              </div>

              {/* Right Content Section - Main info block spanning the remaining 9/12 columns */}
              <div className="md:col-span-9 flex flex-col justify-between p-5 sm:p-6 min-w-0 w-full">
                <div className="space-y-3">
                  {/* Status Badge */}
                  <div>
                    <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 p-3 rounded-full border border-amber-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Pending
                    </span>
                  </div>

                  {/* Facility Name Title */}
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight line-clamp-1">
                    {booking.facilityName}
                  </h2>

                  {/* Metadata Info Row */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#6C696D]">
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-gray-400 shrink-0" />
                      <span>
                        <strong className="text-gray-700 font-medium">
                          Booking Date:
                        </strong>{" "}
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
                          },
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Pricing & Actions Footer Panel */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 mt-4 border-t border-gray-100">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400">
                      Total Paid
                    </span>
                    <p className="text-xl font-extrabold text-[#15A1BF]">
                      ${booking.totalPrice?.toLocaleString() || "0.00"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-initial">
                      <BookingCancelAlert bookingId={booking._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
