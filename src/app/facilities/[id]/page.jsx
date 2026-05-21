import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { LuMapPin, LuUsers } from "react-icons/lu";
import { PiTagBold } from "react-icons/pi";
import BookingCard from "@/components/BookingCard";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/facilities/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch facility");

  const facility = await res.json();
  const {
    facilityName,
    imageUrl,
    facility_type,
    price_per_hour,
    location,
    capacity,
    available_slots,
    description,
  } = facility;

  return (
    <div className="min-h-screen bg-[#f0f4f0]">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        {/* Back + actions */}
        <div className="mb-3">
          <Link
            href="/facilities"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#16a34a",
              fontSize: 20,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <BiArrowBack /> Back to All Facilities
          </Link>
        </div>

        {/* Two-column grid */}
        <div
          className="facility-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* LEFT info card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "36px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #f3f4f6",
              position: "sticky",
              top: 28,
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              About This Facility
            </h2>
            <div
              style={{
                width: 40,
                height: 4,
                background: "#22c55e",
                borderRadius: 4,
                marginBottom: 20,
              }}
            />
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              {description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                {
                  icon: <LuMapPin size={16} />,
                  label: "Location",
                  value: location,
                },
                {
                  icon: <LuUsers size={16} />,
                  label: "Capacity",
                  value: capacity,
                },
                {
                  icon: <PiTagBold size={16} />,
                  label: "Sport Type",
                  value: facility_type,
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "#f0fdf4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#22c55e",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT booking form */}
          <div style={{ minWidth: 0 }}>
            <BookingCard facility={facility} imageUrl={imageUrl} />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .facility-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
