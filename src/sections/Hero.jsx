import { Swiper, SwiperSlide } from "swiper/react"
import {
  Autoplay,
  Pagination,
  EffectFade,
} from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

import { motion } from "framer-motion"

import {
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa"

function Hero() {

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop",
      title: "Authentic Andhra Pickles",
      subtitle:
        "Prepared with traditional recipes, homemade love, and premium ingredients.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      title: "Taste That Feels Like Home",
      subtitle:
        "Fresh ingredients. Rich flavors. No preservatives. Pure homemade goodness.",
    },

    {
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop",
      title: "Handcrafted With Tradition",
      subtitle:
        "Every jar is carefully prepared in small batches with authentic Andhra spice blends.",
    },
  ]

  // SCROLL TO PRODUCTS
  const handleExplore = () => {

    const section =
      document.getElementById("products")

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  // WHATSAPP
  const handleWhatsApp = () => {

    const message =
      "Hello Sahasra Foods 👋 I would like to know more about your homemade products."

    const whatsappUrl =
      `https://wa.me/919150299458?text=${encodeURIComponent(message)}`

    window.open(
      whatsappUrl,
      "_blank"
    )
  }

  return (
    <section
      id="home"
      className="relative"
    >

      <Swiper
        modules={[
          Autoplay,
          Pagination,
          EffectFade,
        ]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-screen"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div
              className="relative h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"></div>

              {/* GLOW */}
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A437]/20 blur-3xl rounded-full"></div>

              {/* CONTENT */}
              <div className="relative z-10 h-full flex items-center">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 60,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="max-w-3xl"
                  >

                    {/* BADGE */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs sm:text-sm tracking-[3px] uppercase font-semibold mb-6">

                      🔥 Homemade • Traditional • Premium
                    </div>

                    {/* HEADING */}
                    <h1 className="text-5xl sm:text-6xl lg:text-8xl leading-[1.05] font-bold text-white font-[Cinzel] mb-6">

                      {slide.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-base sm:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-10 max-w-2xl">

                      {slide.subtitle}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

                      {/* EXPLORE */}
                      <button
                        onClick={handleExplore}
                        className="group h-14 sm:h-16 px-8 rounded-2xl bg-gradient-to-r from-[#6E0E12] to-[#8d141a] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      >

                        Explore Products

                        <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                      </button>

                      {/* WHATSAPP */}
                      <button
                        onClick={handleWhatsApp}
                        className="h-14 sm:h-16 px-8 rounded-2xl border border-[#D4A437]/40 bg-white/10 backdrop-blur-xl text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-[#D4A437] hover:text-black transition-all duration-300"
                      >

                        <FaWhatsapp className="text-lg sm:text-xl" />

                        Order on WhatsApp
                      </button>
                    </div>

                    {/* STATS */}
                    <div className="flex flex-wrap gap-4 mt-12">

                      <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white text-sm">
                        ⭐ 5000+ Happy Customers
                      </div>

                      <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white text-sm">
                        🚚 Fast Delivery
                      </div>

                      <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white text-sm">
                        🌶️ Authentic Andhra Taste
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Hero