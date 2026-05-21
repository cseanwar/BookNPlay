"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  const { _id, facilityName, price_per_hour } = facility;
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
 
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot]       = useState("");
  const [hours, setHours]             = useState(1);
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [error, setError]             = useState("");
 
  const totalPrice = useMemo(
    () => (parseFloat(price_per_hour) * hours).toFixed(2),
    [price_per_hour, hours]
  );
  const today = new Date().toISOString().split("T")[0];
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      userEmail: user?.email,
      facilityId: _id,
      facilityName,
      bookingDate,
      timeSlot,
      hours: Number(hours),
      totalPrice: Number(totalPrice),
      imageUrl,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (!user) { router.push("/login"); return; }
    setLoading(true); setError("");
    try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      
      if (!res.ok) throw new Error();
      setSuccess(true); setBookingDate(""); setTimeSlot(""); setHours(1);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };
 
  if (success) {
    return (
      <div style={{ background: "#fff", borderRadius: 24, padding: 56, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="36" height="36" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Booking Confirmed!</h3>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 36 }}>Your booking is pending approval.</p>
        <button onClick={() => router.push("/my-bookings")}
          style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #22c55e, #15803d)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12, fontFamily: "inherit" }}>
          View My Bookings
        </button>
        <button onClick={() => setSuccess(false)}
          style={{ width: "100%", padding: "15px", borderRadius: 12, border: "2px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Book Again
        </button>
      </div>
    );
  }
 
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 };
  const inputStyle = { width: "100%", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, color: "#1f2937", outline: "none", fontFamily: "inherit", paddingTop: 14, paddingBottom: 14, boxSizing: "border-box" };
 
  return (
    /* Outer card — borderRadius 24 + overflow hidden clips hero image corners */
    <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6", overflow: "hidden" }}>
 
      {/* ── Hero image ── */}
      <div style={{ position: "relative", height: 220, background: "linear-gradient(135deg, #15803d, #22c55e)" }}>
        {imageUrl?.trimStart() && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl.trimStart()} alt={facilityName}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", position: "absolute", inset: 0 }}
          />
        )}
        {/* Dark left overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)" }} />
        {/* Price text */}
        <div style={{ position: "absolute", bottom: 28, left: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
            Book This Facility
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1 }}>${price_per_hour}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>/ hour</span>
          </div>
        </div>
      </div>
 
      {/* ── Form body ── */}
      <form onSubmit={handleSubmit} style={{ padding: "32px 32px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
 
        {/* Facility Name */}
        <div>
          <label style={labelStyle}>Facility Name</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 12 }}>
            <svg style={{ color: "#9ca3af", flexShrink: 0 }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-3.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V21"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{facilityName}</span>
          </div>
        </div>
 
        {/* Date + Time — 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Booking Date</label>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input type="date" required min={today} value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{ ...inputStyle, paddingLeft: 44, paddingRight: 12 }}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Time Slot</label>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <select required value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
                style={{ ...inputStyle, paddingLeft: 44, paddingRight: 36, appearance: "none" }}>
                <option value="">Select</option>
                {TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>
 
        {/* Duration pills */}
        <div>
          <label style={labelStyle}>Duration</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {HOURS_OPTIONS.map((h) => (
              <button key={h} type="button" onClick={() => setHours(h)}
                style={{
                  padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  border: "2px solid", cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
                  ...(hours === h
                    ? { background: "#fff", color: "#16a34a", borderColor: "#22c55e" }
                    : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" })
                }}>
                {h}h
              </button>
            ))}
          </div>
        </div>
 
        {/* Total price */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" fill="none" stroke="#22C55E" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4l3 3"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 3 }}>TOTAL PRICE</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{hours}h × ${price_per_hour} / hour</p>
            </div>
          </div>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#166534" }}>${totalPrice}</span>
        </div>
 
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, borderRadius: 10, padding: "12px 16px" }}>
            {error}
          </div>
        )}
 
        {/* Submit */}
        <button type="submit" disabled={loading}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none",
            background: loading ? "#86efac" : "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
            color: "#fff", fontSize: 16, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 6px 24px rgba(34,197,94,0.35)", fontFamily: "inherit",
          }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {loading ? "Processing…" : user ? "Confirm Booking" : "Login to Book"}
        </button>
 
        {!user && (
          <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: -8 }}>
            You must be logged in to make a booking.
          </p>
        )}
 
        {/* Trust badges */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { emoji: "🛡️", text: "Secure booking process" },
            { emoji: "⚡",  text: "Instant booking request" },
            { emoji: "🎧", text: "Flexible cancellation support" },
          ].map(({ emoji, text }) => (
            <div key={text} style={{ background: "#f9fafb", border: "1.5px solid #f3f4f6", borderRadius: 14, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
                {emoji}
              </div>
              <p style={{ fontSize: 11, color: "#374151", fontWeight: 500, lineHeight: 1.4 }}>{text}</p>
            </div>
          ))}
        </div>
 
      </form>
    </div>
  );
}