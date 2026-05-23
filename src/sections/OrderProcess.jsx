import { motion } from "framer-motion"

import {
  FaShoppingBag,
  FaWhatsapp,
  FaTruck,
  FaSmile,
} from "react-icons/fa"

function OrderProcess() {

  const steps = [

    {
      id: "01",
      icon: <FaShoppingBag />,
      title: "Browse Products",
      description:
        "Explore authentic homemade pickles, powders and traditional snacks prepared fresh daily.",
    },

    {
      id: "02",
      icon: <FaWhatsapp />,
      title: "Add & Confirm",
      description:
        "Customize products, add them to cart and confirm your order through WhatsApp instantly.",
    },

    {
      id: "03",
      icon: <FaTruck />,
      title: "Fresh Delivery",
      description:
        "We prepare your order carefully and deliver fresh homemade flavours directly to your doorstep.",
    },

    {
      id: "04",
      icon: <FaSmile />,
      title: "Enjoy Authentic Taste",
      description:
        "Experience rich Andhra homemade flavours crafted with tradition and premium ingredients.",
    },
  ]

  return (
    <section
      className="relative overflow-hidden py-24 bg-[#fffaf1]"
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
              Simple Ordering Process
            </p>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-[Cinzel] leading-tight text-[#1A1A1A] mb-6">

            How To
            <span className="text-[#6E0E12]">
              {" "}Order
            </span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Ordering your favorite homemade Andhra foods is quick, simple and completely hassle free.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">

          {steps.map((step, index) => (

            <motion.div
              key={step.id}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[34px] bg-white border border-[#D4A437]/10 p-7 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500"
            >

              {/* NUMBER */}
              <div className="absolute top-5 right-5 text-6xl font-bold text-[#D4A437]/10">

                {step.id}
              </div>

              {/* ICON */}
              <div className="w-20 h-20 rounded-[26px] bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white text-3xl flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-all duration-500">

                {step.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-5 font-[Cinzel] leading-tight">

                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">

                {step.description}
              </p>

              {/* GLOW */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D4A437]/10 blur-3xl rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OrderProcess