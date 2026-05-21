"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { User, Link2, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const passwordRef = useRef("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      await authClient.signOut();
      toast.success("Account created successfully!");
      router.push("/login");
    }
    if (error) { toast.error("Signup failed"); }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const inputStyle = {
    width: "100%", height: 52, paddingLeft: 48, paddingRight: 16,
    borderRadius: 14, border: "1.5px solid #E2E8F0", background: "#F8FAFC",
    fontSize: 15, color: "#0F172A", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block", fontSize: 11, fontWeight: 700, color: "#0F172A",
    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8,
  };
  const iconStyle = {
    position: "absolute", left: 16, top: "50%",
    transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none",
  };

  const handleFocus = (e) => e.target.style.borderColor = "#22C55E";
  const handleBlur  = (e) => e.target.style.borderColor = "#E2E8F0";

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div className="register-grid" style={{ width: "100%", maxWidth: 1100, background: "#fff", borderRadius: 20, boxShadow: "0 25px 60px rgba(0,0,0,0.12)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ── LEFT green panel ── */}
        <div className="register-left" style={{ position: "relative", background: "linear-gradient(135deg, #22C55E 0%, #15803D 55%, #14532D 100%)", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
          {/* Glow blobs */}
          <div style={{ position: "absolute", top: -120, right: -120, width: 320, height: 320, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: -120, left: -120, width: 260, height: 260, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />

          {/* Heading */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ color: "#fff", fontSize: 46, fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
              Join The Future<br />Of Sports Booking
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7, maxWidth: 340 }}>
              Create your BookNPlay account and start booking premium sports facilities in seconds.
            </p>
          </div>

          {/* Feature cards */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Security card */}
            <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldCheck color="#fff" size={22} />
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Secure Authentication</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5 }}>Protected login and account security for every user.</p>
              </div>
            </div>

            {/* Stat cards */}
            {[
              { label: "Registered Players", value: "15K+" },
              { label: "Premium Facilities",  value: "250+" },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "20px 24px" }}>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 4 }}>{label}</p>
                <p style={{ color: "#fff", fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT form ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 48px" }}>
          <div style={{ width: "100%", maxWidth: 440 }}>

            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 44, fontWeight: 900, color: "#0F172A", marginBottom: 10 }}>Create Account</h2>
              <p style={{ color: "#64748B", fontSize: 16 }}>Join BookNPlay and start your sports journey</p>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Full Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={17} style={iconStyle} />
                  <input required name="name" type="text" placeholder="Enter your full name"
                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label style={labelStyle}>Profile Image URL</label>
                <div style={{ position: "relative" }}>
                  <Link2 size={17} style={iconStyle} />
                  <input name="image" type="url" placeholder="https://example.com/photo.jpg"
                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={17} style={iconStyle} />
                  <input required name="email" type="email" placeholder="john@example.com"
                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              {/* Password + Confirm — side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={17} style={iconStyle} />
                    <input required name="password" type="password" placeholder="Create password"
                      style={inputStyle}
                      onChange={(e) => (passwordRef.current = e.target.value)}
                      onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={17} style={iconStyle} />
                    <input required name="confirmPassword" type="password" placeholder="Confirm password"
                      style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "#64748B", marginTop: -4 }}>
                Password must contain uppercase, lowercase and number.
              </p>

              {/* Submit */}
              <button type="submit" style={{
                width: "100%", height: 54, borderRadius: 14, border: "none",
                background: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
                color: "#fff", fontSize: 16, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8,
                boxShadow: "0 8px 28px rgba(34,197,94,0.35)",
                fontFamily: "inherit", marginTop: 4,
              }}>
                Create Account <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              <span style={{ color: "#94A3B8", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            </div>

            {/* Google */}
            <button onClick={handleGoogleSignin} style={{
              width: "100%", height: 54, borderRadius: 14,
              background: "#fff", border: "1.5px solid #E2E8F0",
              color: "#0F172A", fontSize: 15, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10, fontFamily: "inherit",
            }}>
              <FcGoogle size={22} /> Sign up with Google
            </button>

            {/* Footer */}
            <p style={{ textAlign: "center", color: "#64748B", marginTop: 24, fontSize: 15 }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#16A34A", fontWeight: 700, textDecoration: "none" }}>
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .register-grid { grid-template-columns: 1fr !important; }
          .register-left { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;