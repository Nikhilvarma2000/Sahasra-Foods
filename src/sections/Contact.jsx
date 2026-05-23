import { motion } from "framer-motion"

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa"

function Contact() {

  const handleWhatsApp = () => {

    const message =
      "Hello Sahasra Foods 👋 I would like to place an order."

    const url =
      `https://wa.me/917075076825?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 bg-[#FFF9EE]"
    >

      {/* GLOWS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4A437]/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0B5D3B]/10 blur-3xl rounded-full"></div>

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >

          <div className="inline-flex px-5 py-2 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-6">

            <p className="text-[#6E0E12] text-xs sm:text-sm tracking-[3px] uppercase font-semibold">
              Contact Us
            </p>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-[Cinzel] leading-tight text-[#1A1A1A] mb-6">

            Get In
            <span className="text-[#6E0E12]">
              {" "}Touch
            </span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Reach out to order authentic homemade Andhra foods freshly prepared with premium ingredients.
          </p>
        </motion.div>

        {/* CONTACT CARD */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0B5D3B] via-[#145c3f] to-[#6E0E12] p-8 sm:p-12 text-white"
          >

            {/* GLOW */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <div className="inline-flex px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 mb-8 text-sm font-semibold">
                Fresh Homemade Orders
              </div>

              <h3 className="text-4xl sm:text-5xl font-bold font-[Cinzel] leading-tight mb-6">

                Let’s Serve
                Authentic Flavours
              </h3>

              <p className="text-white/80 leading-relaxed mb-10 max-w-lg">
                Order delicious homemade pickles, powders and traditional snacks directly through WhatsApp with fast response and fresh preparation.
              </p>

              <button
                onClick={handleWhatsApp}
                className="group h-16 px-8 rounded-2xl bg-white text-[#1A1A1A] font-semibold flex items-center justify-center gap-4 hover:scale-105 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
              >

                <FaWhatsapp className="text-2xl text-[#25D366]" />

                Order on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className="rounded-[36px] bg-white border border-[#D4A437]/10 p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
          >

            <div className="space-y-8">

              {/* PHONE */}
              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-[22px] bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white text-xl flex items-center justify-center shadow-lg shrink-0">

                  <FaPhoneAlt />
                </div>

                <div>

                  <p className="text-sm uppercase tracking-[3px] text-gray-500 mb-2">
                    Phone Number
                  </p>

                  <h3 className="text-2xl font-bold text-[#1A1A1A]">
                    +91 7075076825
                  </h3>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-[22px] bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white text-xl flex items-center justify-center shadow-lg shrink-0">

                  <FaMapMarkerAlt />
                </div>

                <div>

                  <p className="text-sm uppercase tracking-[3px] text-gray-500 mb-2">
                    Address
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] leading-relaxed">
                    Nacharam,
                    HMT Nagar Street No. 9,
                    Hyderabad - 500076
                  </h3>
                </div>
              </div>

              {/* NOTE */}
              <div className="mt-10 p-6 rounded-[28px] bg-[#FFF9EE] border border-[#D4A437]/10">

                <p className="text-gray-600 leading-relaxed">
                  We currently accept orders directly through WhatsApp for a faster and more personalized homemade food ordering experience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact