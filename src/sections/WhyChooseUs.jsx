import { motion } from "framer-motion"

import {
  FaLeaf,
  FaMortarPestle,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa"

import {
  GiHotSpices,
  GiMeal,
} from "react-icons/gi"

function WhyChooseUs() {

  const features = [
    {
      icon: <GiMeal />,
      title: "Homemade Recipes",
      description:
        "Prepared using authentic traditional Andhra homemade cooking methods.",
    },

    {
      icon: <FaLeaf />,
      title: "Fresh Ingredients",
      description:
        "Only premium-quality fresh ingredients and natural spices are used.",
    },

    {
      icon: <GiHotSpices />,
      title: "Authentic Taste",
      description:
        "Rich traditional flavours that bring the warmth of home food.",
    },

    {
      icon: <FaShieldAlt />,
      title: "Hygienic Preparation",
      description:
        "Prepared with utmost cleanliness and food safety standards.",
    },

    {
      icon: <FaMortarPestle />,
      title: "Traditional Spices",
      description:
        "Special homemade spice blends inspired by Andhra traditions.",
    },

    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      description:
        "Freshly packed and safely delivered directly to your doorstep.",
    },
  ]

  return (
    <section
      id="whyus"
      className="relative py-24 bg-gradient-to-b from-[#FFF9EE] to-[#f8ecd3] overflow-hidden"
    >

      {/* Background Effects */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4A437]/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0B5D3B]/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >

          <div className="inline-block px-5 py-2 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-6">
            <p className="text-[#6E0E12] font-semibold tracking-[3px] uppercase text-sm">
              Why Choose Us
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-[Cinzel] leading-tight text-[#1A1A1A] mb-6">
            Crafted With
            <span className="text-[#6E0E12]"> Tradition, </span>
            Served With Love
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            We combine authentic homemade recipes, premium ingredients,
            and traditional Andhra flavours to deliver a truly unforgettable taste experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 rounded-[30px] p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A437]/10 to-[#0B5D3B]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Icon */}
              <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6E0E12] to-[#0B5D3B] flex items-center justify-center text-3xl text-white shadow-2xl mb-8 group-hover:scale-110 transition-all duration-500">

                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">

                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D4A437]/10 blur-3xl rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs