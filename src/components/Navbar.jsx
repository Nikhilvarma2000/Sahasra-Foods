import { useEffect, useState } from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi"

import { Link } from "react-scroll"

import {
  FaWhatsapp,
} from "react-icons/fa"

import logo from "../assets/logos/logo.png"

function Navbar() {

  const [scrolled, setScrolled] =
    useState(false)

  const [mobileMenu, setMobileMenu] =
    useState(false)

  // SCROLL EFFECT
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [])

  // WHATSAPP
  const handleWhatsApp = () => {

    const message =
      "Hello Sahasra Foods 👋 I would like to place an order."

    const url =
      `https://wa.me/917075076825?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  // NAVIGATION LINKS
  const navLinks = [

    {
      name: "Home",
      to: "home",
    },

    {
      name: "Products",
      to: "products",
    },

    {
      name: "Process",
      to: "process",
    },

    {
      name: "About",
      to: "about",
    },

    {
      name: "Why Us",
      to: "why-us",
    },

    {
      name: "Contact",
      to: "contact",
    },
  ]

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-[#0b1d17cc] backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 cursor-pointer"
            >

              <div className="relative">

                <img
                  src={logo}
                  alt="Sahasra Foods"
                  className="w-14 h-14 object-cover rounded-full border-2 border-[#D4A437] shadow-2xl"
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
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10">

              {navLinks.map((item, index) => (

                <Link
                  key={index}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  spy={true}
                  className="relative cursor-pointer text-[15px] font-medium text-white/90 hover:text-[#D4A437] transition-all duration-300 group"
                  activeClass="text-[#D4A437]"
                >

                  {item.name}

                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4A437] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* CTA */}
              <button
                onClick={handleWhatsApp}
                className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full bg-[#D4A437] text-black font-semibold hover:scale-105 hover:bg-[#f0bc3c] transition-all duration-300 shadow-2xl"
              >

                <FaWhatsapp />

                Order Now
              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() =>
                  setMobileMenu(true)
                }
                className="lg:hidden text-3xl text-white"
              >

                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {mobileMenu && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileMenu(false)
              }
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.4,
              }}
              className="fixed top-0 right-0 w-[82%] max-w-sm h-screen bg-[#FFF9EE] z-[1000] shadow-2xl p-6 border-l border-[#D4A437]/20 overflow-y-auto"
            >

              {/* TOP */}
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
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="text-3xl text-[#6E0E12]"
                >

                  <HiX />
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-2">

                {navLinks.map((item, index) => (

                  <Link
                    key={index}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="text-lg font-medium text-[#1A1A1A] hover:text-[#6E0E12] transition-all duration-300 cursor-pointer border-b border-gray-200 py-4"
                  >

                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleWhatsApp}
                className="mt-10 w-full h-14 rounded-2xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white font-semibold shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
              >

                <FaWhatsapp />

                Order on WhatsApp
              </button>

              {/* GLOW */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4A437]/20 blur-3xl rounded-full"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar