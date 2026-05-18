import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-slate-700 pb-16">
          <div className="lg:col-span-2">
            <Image
              src="/logo-footer.png"
              width={140}
              height={140}
              alt="BookNPlay Logo"
              className="object-contain"
            />

            <p className="mt-5 text-slate-300 leading-relaxed max-w-md">
              Book your favorite sports facilities anytime, anywhere. Discover
              football turfs, badminton courts, swimming pools, tennis courts
              and more with BookNPlay.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="bg-slate-800 hover:bg-[#22C55E] p-3 rounded-full transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-[#22C55E] p-3 rounded-full transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-[#22C55E] p-3 rounded-full transition-all duration-300"
              >
                <FaInstagramSquare size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-[#22C55E] p-3 rounded-full transition-all duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#22C55E] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/facility"
                  className="hover:text-[#22C55E] transition"
                >
                  All Facilities
                </Link>
              </li>

              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-[#22C55E] transition"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  href="/manage-my-facilities"
                  className="hover:text-[#22C55E] transition"
                >
                  Manage Facilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">Support</h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="#" className="hover:text-[#22C55E] transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#22C55E] transition">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[#22C55E] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>

            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Subscribe to receive updates, offers and sports inspiration.
            </p>

            <div className="flex items-center bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 outline-none flex-1 text-sm"
              />

              <button className="bg-[#22C55E] hover:bg-[#16A34A] px-5 py-3 transition">
                →
              </button>
            </div>
          </div>
        </div>

        <p className="pt-6 text-center text-sm text-slate-400">
          © 2026 BookNPlay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
