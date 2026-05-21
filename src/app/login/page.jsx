/* eslint-disable react/no-unescaped-entities */
"use client";


import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) { toast.success("Logged in successfully!"); router.push("/"); }
    if (error) { toast.error("Email or password is incorrect"); }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>
      <div style={{ width: "100%", maxWidth: 1100, background: "#fff", borderRadius: 20, boxShadow: "0 25px 60px rgba(0,0,0,0.12)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}
           className="login-grid">

        {/* ── LEFT: green panel ── */}
        <div style={{ position: "relative", background: "linear-gradient(135deg, #16A34A 0%, #15803D 50%, #14532D 100%)", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}
             className="login-left">

          {/* Glow blobs */}
          <div style={{ position: "absolute", top: -120, right: -120, width: 320, height: 320, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: -100, left: -100, width: 260, height: 260, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />

          {/* Heading */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
              Book Sports<br />Facilities Easily
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, maxWidth: 360 }}>
              Continue booking your favorite sports facilities with BookNPlay. Fast, modern and seamless.
            </p>
          </div>

          {/* Stat cards */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Active Bookings", value: "12K+" },
              { label: "Sports Facilities", value: "250+" },
              { label: "Support", value: "24/7" },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: "20px 24px" }}>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 4 }}>{label}</p>
                <p style={{ color: "#fff", fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 48px" }}>
          <div style={{ width: "100%", maxWidth: 420 }}>

            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 48, fontWeight: 900, color: "#0F172A", marginBottom: 10 }}>Login</h2>
              <p style={{ color: "#64748B", fontSize: 17 }}>Login to continue your sports journey</p>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
                  <input
                    required name="email" type="email"
                    placeholder="john@example.com"
                    style={{ width: "100%", height: 56, paddingLeft: 48, paddingRight: 16, borderRadius: 16, border: "1.5px solid #E2E8F0", background: "#F8FAFC", fontSize: 15, color: "#0F172A", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#22C55E"}
                    onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
                  <input
                    required name="password" type="password"
                    placeholder="Enter your password"
                    style={{ width: "100%", height: 56, paddingLeft: 48, paddingRight: 16, borderRadius: 16, border: "1.5px solid #E2E8F0", background: "#F8FAFC", fontSize: 15, color: "#0F172A", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#22C55E"}
                    onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" style={{ color: "#16A34A", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: "100%", height: 56, borderRadius: 16, border: "none",
                  background: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                  boxShadow: "0 8px 28px rgba(34,197,94,0.35)",
                  fontFamily: "inherit", marginTop: 4,
                }}
              >
                Login <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "28px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
              <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              style={{
                width: "100%", height: 56, borderRadius: 16,
                background: "#fff", border: "1.5px solid #E2E8F0",
                color: "#0F172A", fontSize: 15, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10, fontFamily: "inherit",
              }}
            >
              <FcGoogle size={22} /> Sign in with Google
            </button>

            {/* Footer */}
            <p style={{ textAlign: "center", color: "#64748B", marginTop: 28, fontSize: 15 }}>
              Don't have an account?{" "}
              <Link href="/register" style={{ color: "#16A34A", fontWeight: 700, textDecoration: "none" }}>
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 768px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;