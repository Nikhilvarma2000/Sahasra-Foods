import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowRight, FaStar, FaShippingFast, FaAward, FaLeaf } from "react-icons/fa"
import { ChevronDown } from "lucide-react"

const SLIDES = [
  {
    image: "https://t3.ftcdn.net/jpg/04/20/07/28/360_F_420072816_fF0EFAl8TZfoQjJMMj0QH9SL7Z9VcrP8.jpg",
    tag: "Traditional Family Recipes",
    title: "Authentic\nAndhra Pickles",
    subtitle: "Prepared with love, premium ingredients, and recipes passed down through generations.",
    accent: "#D4A437",
  },
  {
    image: "https://bhimavarampickels.com/wp-content/uploads/2025/03/chicken-piclle.webp",
    tag: "Pure Homemade Goodness",
    title: "Taste That\nFeels Like Home",
    subtitle: "Fresh ingredients. Rich flavors. No preservatives. Pure homemade goodness crafted daily.",
    accent: "#6E0E12",
  },
  {
    image: "https://sumadhurafoods.com/cdn/shop/files/I5A1821.jpg?v=1716974990",
    tag: "Small Batch Heritage",
    title: "Handcrafted\nWith Tradition",
    subtitle: "Every jar prepared in small batches with authentic Andhra spice blends and heritage care.",
    accent: "#0B5D3B",
  },
]

const STATS = [
  { icon: FaStar,         value: "5000+",     label: "Happy Customers" },
  { icon: FaShippingFast, value: "Pan India",  label: "Fast Delivery"   },
  { icon: FaAward,        value: "100%",       label: "Homemade"        },
  { icon: FaLeaf,         value: "Zero",       label: "Preservatives"   },
]

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const slide = SLIDES[activeIndex]

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      style={{ height: "clamp(560px, 88vh, 900px)" }}
    >
      {/* ─── BACKGROUND: Swiper handles image crossfades ─── */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          speed={1100}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          className="h-full hero-swiper"
          onSlideChange={(s) => {
            setActiveIndex(s.realIndex)
            setAnimKey((k) => k + 1)
          }}
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={i} className="overflow-hidden">
              <div
                className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url(${s.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ─── GRADIENT OVERLAYS ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-transparent to-black/35" />
        {/* Colour accent glow */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[340px]"
          style={{
            background: `radial-gradient(ellipse at 20% 100%, ${slide.accent}28 0%, transparent 65%)`,
            transition: "background 1.8s ease",
          }}
        />
      </div>

      {/* ─── HERO TEXT CONTENT (animated per slide) ─── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-8 sm:pb-10">

        {/* TEXT BLOCK */}
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={animKey}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18, transition: { duration: 0.22 } }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-2xl"
            >
              {/* TAG CHIP */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/12 bg-white/8 backdrop-blur-md text-[10px] tracking-[3px] uppercase font-bold text-white/90 mb-5">
                <span style={{ color: slide.accent }}>◆</span>
                {slide.tag}
              </div>

              {/* TITLE */}
              <h1
                className="leading-[1.06] font-bold text-white tracking-tight mb-5 whitespace-pre-line"
                style={{
                  fontFamily: "'Cinzel', 'Georgia', serif",
                  fontSize: "clamp(2.2rem, 6.5vw, 4.8rem)",
                  textShadow: "0 4px 28px rgba(0,0,0,0.5)",
                }}
              >
                {slide.title}
              </h1>

              {/* SUBTITLE */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-300/90 leading-relaxed mb-8 max-w-xl">
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={scrollToProducts}
                  className="group relative h-13 px-8 rounded-xl text-white font-bold text-sm flex items-center gap-2.5 active:scale-[0.97] transition-transform cursor-pointer touch-manipulation overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6E0E12 0%, #a81218 100%)",
                    boxShadow: "0 12px 36px rgba(110,14,18,0.52)",
                  }}
                >
                  <span className="relative z-10">Order Now</span>
                  <FaArrowRight
                    size={11}
                    className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/12 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>

                <button
                  onClick={scrollToProducts}
                  className="h-13 px-6 rounded-xl border border-white/18 bg-white/8 backdrop-blur-md text-white font-semibold text-sm active:scale-[0.97] transition-all cursor-pointer touch-manipulation hover:bg-white/14 hover:border-white/28"
                >
                  View Menu
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STATS STRIP */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="text-[#D4A437] flex-shrink-0" size={13} />
                <span className="text-white font-bold text-xs sm:text-sm leading-none">{value}</span>
                <span className="text-white/45 text-xs leading-none">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.button
        onClick={scrollToProducts}
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-9 h-9 rounded-full border border-white/20 bg-white/8 backdrop-blur-md flex items-center justify-center cursor-pointer text-white/50 hover:text-white hover:bg-white/15 transition-all"
      >
        <ChevronDown size={16} />
      </motion.button>

      <style>{`
        /* Background image zoom-out when slide becomes active */
        .hero-bg {
          transform: scale(1.08);
        }
        .hero-swiper .swiper-slide-active .hero-bg {
          transform: scale(1);
          transition: transform 8s linear;
        }
        .hero-swiper .swiper-slide:not(.swiper-slide-active) .hero-bg {
          transform: scale(1.08);
          transition: none;
        }
        /* Pagination styling */
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.38) !important;
          border: 1px solid rgba(255,255,255,0.22);
          opacity: 0.75 !important;
          width: 7px !important;
          height: 7px !important;
        }
        .swiper-pagination-bullet-active {
          background: #D4A437 !important;
          width: 24px !important;
          border-radius: 4px !important;
          opacity: 1 !important;
          border-color: #D4A437 !important;
        }
        .swiper-pagination {
          bottom: 20px !important;
          z-index: 30 !important;
        }
      `}</style>
    </section>
  )
}

export default Hero
