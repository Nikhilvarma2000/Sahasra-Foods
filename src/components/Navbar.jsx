import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"
import { Link } from "react-scroll"
import { FaShoppingBag } from "react-icons/fa"
import logo from "../assets/logos/logo.png"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  // SCROLL BOUNDARY TRACKER
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // NAVIGATION ROUTE CONFIG
  const navLinks = [
    { name: "Home", to: "home" },
    { name: "Products", to: "products" },
    { name: "Process", to: "process" },
    { name: "About", to: "about" },
    { name: "Why Us", to: "why-us" },
    { name: "Contact", to: "contact" },
  ]

  return (
    <>
      {/* NAVBAR CONTAINER FRAME */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-[#0b1d17]/90 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            
            {/* BRAND LOGO CONTEXT LAYER */}
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Sahasra Foods"
                  className="w-12 h-12 sm:w-13 sm:h-13 object-cover rounded-full border-2 border-[#D4A437] shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-[#D4A437]/10 blur-xs"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-wide leading-none" style={{ fontFamily: "'Cinzel', serif" }}>
                  Sahasra
                </h1>
                <p className="text-[10px] tracking-[4px] text-[#D4A437] uppercase mt-0.5 font-bold">
                  Foods
                </p>
              </div>
            </Link>

            {/* HIGH-DENSITY DESKTOP LINK LINKS */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  spy={true}
                  className="relative cursor-pointer text-[14px] font-semibold text-white/80 hover:text-[#D4A437] transition-colors duration-300 group"
                  activeClass="text-[#D4A437]"
                >
                  {item.name}
                  <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-[#D4A437] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              ))}
            </div>

            {/* EXTERNAL INTERACTIVE ACTION WRAPPERS */}
            <div className="flex items-center gap-4">
              {/* DESKTOP ORDER NOW DIRECT SCROLL CTA */}
              <Link
                to="products"
                smooth={true}
                duration={500}
                offset={-80}
                className="hidden md:flex items-center gap-2.5 px-6 h-11 rounded-xl bg-gradient-to-r from-[#D4A437] to-[#C59328] text-[#121212] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <FaShoppingBag size={12} />
                <span>Order Now</span>
              </Link>

              {/* MOBILE MENU INTERFACE TRIGGER */}
              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden text-2xl text-white hover:text-[#D4A437] transition-colors p-1"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* COMPACT RESPONSIVE MOBILE MENU SHEET */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* SIDEBAR CONTAINER BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[999]"
            />

            {/* SIDEBAR MAIN MENU WRAPPER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-[80%] max-w-sm h-screen bg-[#FFFDF9] z-[1000] shadow-2xl p-6 border-l border-[#D4A437]/10 flex flex-col overflow-y-auto no-scrollbar"
            >
              {/* DRAWER TOP BAR CONTROLS */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-[#6E0E12]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Sahasra
                  </h2>
                  <p className="text-[10px] tracking-[3px] text-[#0B5D3B] uppercase mt-0.5 font-bold">
                    Foods
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenu(false)}
                  className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 text-gray-700 flex items-center justify-center active:scale-90 transition-all"
                >
                  <HiX size={18} />
                </button>
              </div>

              {/* MOBILE SCROLL INTERACTION ANCHORS */}
              <div className="flex flex-col flex-1 divide-y divide-gray-100/60">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    onClick={() => setMobileMenu(false)}
                    className="text-base font-semibold text-gray-800 hover:text-[#6E0E12] transition-colors cursor-pointer py-4 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* COMPACT DRAWER ORDER ACTION BUTTON */}
              <Link
                to="products"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setMobileMenu(false)}
                className="mt-8 w-full h-12 rounded-xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white font-bold shadow-md flex items-center justify-center gap-2.5 uppercase tracking-wide text-xs cursor-pointer active:scale-[0.99] transition-transform"
              >
                <FaShoppingBag size={12} />
                <span>Order Now</span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar