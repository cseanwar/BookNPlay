"use client";

import { authClient } from "@/lib/auth-client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock3,
  Building2,
  ShieldCheck,
  Zap,
  Headphones,
  Check,
} from "lucide-react";
import Image from "next/image";

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const HOURS_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function BookingCard({ facility, imageUrl }) {
  const { facilityName, price_per_hour } = facility;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = useMemo(() => {
    return (parseFloat(price_per_hour) * hours).toFixed(2);
  }, [price_per_hour, hours]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    const bookingData = {
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      userImage: session.user.image,

      facilityId: facility._id,
      facilityName: facility.facilityName,
      imageUrl: facility.imageUrl,

      bookingDate,
      timeSlot,
      hours,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      setSuccess(true);
      setBookingDate("");
      setTimeSlot("");
      setHours(1);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-600" size={42} />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Booking Confirmed!
        </h2>

        <p className="text-gray-500 mb-8">
          Your booking request has been submitted successfully.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/my-bookings")}
            className="w-full h-14 rounded-2xl bg-linear-to-r from-green-500 to-emerald-700 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            View My Bookings
          </button>

          <button
            onClick={() => setSuccess(false)}
            className="w-full h-14 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700"
          >
            Book Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-xl">
      {/* HERO IMAGE */}
      <div className="relative h-65 overflow-hidden">
        <Image
          src={imageUrl}
          alt={facilityName}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#22C55E] to-[#16A34A]" />

        <div className="absolute bottom-8 left-8 text-white">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-white/70 mb-3">
            Book This Facility
          </p>

          <div className="flex items-end gap-2">
            <h2 className="text-5xl font-black">${price_per_hour}</h2>

            <span className="text-white/70 mb-1">/ hour</span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-7">
        {/* Facility Name */}
        <div>
          <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
            Facility Name
          </label>

          <div className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 flex items-center gap-3">
            <Building2 className="text-gray-400" size={18} />

            <span className="font-semibold text-gray-800">{facilityName}</span>
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Date */}
          <div>
            <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
              Booking Date
            </label>

            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="date"
                required
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none focus:border-green-500 transition-all"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
              Time Slot
            </label>

            <div className="relative">
              <Clock3
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <select
                required
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none focus:border-green-500 transition-all appearance-none"
              >
                <option value="">Select Time</option>

                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Duration
          </label>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {HOURS_OPTIONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHours(h)}
                className={`h-14 rounded-2xl font-bold transition-all duration-300 border-2 ${
                  hours === h
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-200 text-gray-500 hover:border-green-300"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <Clock3 className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900">TOTAL PRICE</p>

              <p className="text-sm text-gray-500">
                {hours}h × ${price_per_hour}/hour
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-black text-green-700">${totalPrice}</h2>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-14 rounded-2xl text-white font-bold text-lg shadow-lg transition-all duration-300 ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-linear-to-r from-green-500 to-emerald-700 hover:scale-[1.01]"
          }`}
        >
          {loading
            ? "Processing..."
            : user
              ? "Confirm Booking"
              : "Login to Book"}
        </button>

        {/* LOGIN TEXT */}
        {!user && (
          <p className="text-center text-sm text-gray-400">
            You must login before booking a facility.
          </p>
        )}

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            {
              icon: <ShieldCheck size={20} />,
              title: "Secure Booking",
            },
            {
              icon: <Zap size={20} />,
              title: "Instant Request",
            },
            {
              icon: <Headphones size={20} />,
              title: "24/7 Support",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-gray-100 rounded-2xl p-5 bg-gray-50 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-3">
                {item.icon}
              </div>

              <p className="text-sm font-semibold text-gray-700">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
