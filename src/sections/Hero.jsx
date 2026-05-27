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
import { FaArrowRight, FaStar, FaShippingFast, FaAward } from "react-icons/fa"

function Hero() {

  // UPDATED WITH MANGO, GONGURA, AND CHICKEN PICKLE IMAGES
  const slides = [
    {
      image:
        "https://t3.ftcdn.net/jpg/04/20/07/28/360_F_420072816_fF0EFAl8TZfoQjJMMj0QH9SL7Z9VcrP8.jpg",
      title: "Authentic Andhra Pickles",
      subtitle:
        "Prepared with traditional recipes, homemade love, and premium ingredients.",
    },
    {
      image:
        "https://bhimavarampickels.com/wp-content/uploads/2025/03/chicken-piclle.webp",
      title: "Taste That Feels Like Home",
      subtitle:
        "Fresh ingredients. Rich flavors. No preservatives. Pure homemade goodness.",
    },
    {
      image:
        "https://sumadhurafoods.com/cdn/shop/files/I5A1821.jpg?v=1716974990",
      title: "Handcrafted With Tradition",
      subtitle:
        "Every jar is carefully prepared in small batches with authentic Andhra spice blends.",
    },
  ]

  const handleOrderNow = () => {
    const section = document.getElementById("products")
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="h-[80vh] sm:h-[85vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4A437]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
                <div className="max-w-3xl">
                  
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs tracking-[3px] uppercase font-bold mb-6"
                  >
                    <span className="text-[#D4A437]">🔥</span> Homemade • Traditional • Premium
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-4xl sm:text-6xl lg:text-7xl leading-[1.08] font-bold text-white font-serif tracking-tight mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed mb-10 max-w-2xl drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button
                      onClick={handleOrderNow}
                      className="group relative h-14 px-10 rounded-xl bg-gradient-to-r from-[#6E0E12] to-[#92141a] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 hover:from-[#821217] hover:to-[#a61820] transition-all duration-300 shadow-[0_15px_35px_rgba(110,14,18,0.4)] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Order Now</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-wrap items-center gap-4 mt-12 border-t border-white/10 pt-8"
                  >
                    <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
                      <FaStar className="text-[#D4A437] text-xs" />
                      <span>5000+ Happy Customers</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
                    <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
                      <FaShippingFast className="text-[#D4A437] text-sm" />
                      <span>Fast Delivery Across India</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
                    <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
                      <FaAward className="text-[#D4A437] text-xs" />
                      <span>Authentic Andhra Taste</span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.5) !important; border: 1px solid rgba(255,255,255,0.4); opacity: 0.6; }
        .swiper-pagination-bullet-active { background: #D4A437 !important; width: 20px !important; border-radius: 4px !important; opacity: 1; border-color: #D4A437; }
        .swiper-pagination { bottom: 24px !important; }
      `}</style>
    </section>
  )
}

export default Hero