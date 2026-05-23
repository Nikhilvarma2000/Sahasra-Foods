import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"
import { Link } from "react-scroll"

import logo from "../assets/logos/logo.png"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    "Home",
    "About",
    "Products",
    "Why Us",
    "Process",
    "Testimonials",
    "Contact",
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0b1d17cc] supports-[backdrop-filter]:bg-[#0b1d17aa] backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">

              <div className="relative">
                <img
                  src={logo}
                  alt="Sahasra Foods"
                  className="w-14 h-14 object-cover rounded-full shadow-2xl border-2 border-[#D4A437]"
                />

                <div className="absolute inset-0 rounded-full bg-[#D4A437]/20 blur-md"></div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white font-[Cinzel] leading-none">
                  Sahasra
                </h1>

                <p className="text-xs tracking-[4px] text-[#D4A437] uppercase mt-1">
                  Foods
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.toLowerCase().replace(" ", "")}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="relative cursor-pointer text-[15px] font-medium text-white/90 hover:text-[#D4A437] transition-all duration-300 group"
                >
                  {item}

                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4A437] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-4">

              <button className="hidden md:flex px-6 py-3 rounded-full bg-[#D4A437] text-black font-semibold hover:scale-105 hover:bg-[#f0bc3c] transition-all duration-300 shadow-2xl">
                Order Now
              </button>

              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden text-3xl text-white"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 w-[80%] max-w-sm h-screen bg-[#FFF9EE] z-50 shadow-2xl p-6 border-l border-[#D4A437]/20"
            >

              {/* Top */}
              <div className="flex justify-between items-center mb-12">

                <div>
                  <h2 className="text-3xl font-bold font-[Cinzel] text-[#6E0E12]">
                    Sahasra
                  </h2>

                  <p className="text-xs tracking-[4px] text-[#0B5D3B] uppercase mt-1">
                    Foods
                  </p>
                </div>

                <button
                  onClick={() => setMobileMenu(false)}
                  className="text-3xl text-[#6E0E12]"
                >
                  <HiX />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-7">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.toLowerCase().replace(" ", "")}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setMobileMenu(false)}
                    className="text-lg font-medium text-[#1A1A1A] hover:text-[#6E0E12] transition-all duration-300 cursor-pointer border-b border-gray-200 pb-3"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <button className="mt-10 w-full py-4 rounded-full bg-[#0B5D3B] text-white font-semibold shadow-2xl hover:bg-[#09482e] transition-all duration-300">
                Order on WhatsApp
              </button>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4A437]/20 blur-3xl rounded-full"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar