import { motion } from "framer-motion"
import {
  FaLeaf,
  FaMortarPestle,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa"
import { GiHotSpices, GiMeal } from "react-icons/gi"

function WhyChooseUs() {
  const features = [
    {
      icon: <GiMeal size={24} />,
      title: "Homemade Recipes",
      description: "Prepared using authentic traditional Andhra homemade cooking methods passed down through generations.",
      color: "#0B5D3B",
    },
    {
      icon: <FaLeaf size={22} />,
      title: "Fresh Ingredients",
      description: "Only premium-quality fresh ingredients, native cold-pressed oils, and natural spices are used.",
      color: "#D4A437",
    },
    {
      icon: <GiHotSpices size={24} />,
      title: "Authentic Taste",
      description: "Rich native flavors that bring the unmatched warmth and comfort of home food to your plate.",
      color: "#6E0E12",
    },
    {
      icon: <FaShieldAlt size={22} />,
      title: "Hygienic Preparation",
      description: "Crafted in small controlled batches with utmost cleanliness and zero chemical preservatives.",
      color: "#0B5D3B",
    },
    {
      icon: <FaMortarPestle size={22} />,
      title: "Traditional Spices",
      description: "Special custom stone-ground spice blends inspired by regional heritage and culinary secrets.",
      color: "#D4A437",
    },
    {
      icon: <FaShippingFast size={22} />,
      title: "Fast Delivery",
      description: "Freshly packed and securely shipped through premier delivery networks right to your doorstep.",
      color: "#6E0E12",
    },
  ]

  return (
    <section id="why-us" className="relative py-24 bg-gradient-to-b from-[#FFFDF9] to-[#FFF9EE] overflow-hidden">
      {/* BRAND BACKDROP ACCENT LIGHTS */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#D4A437]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0B5D3B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-4">
            <p className="text-[#6E0E12] font-bold tracking-[3px] uppercase text-xs">
              Why Choose Us
            </p>
          </div>

          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] mb-4"
            style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
          >
            Crafted With <span className="text-[#6E0E12]">Tradition</span>, Served With Love
          </h2>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto font-medium">
            We combine authentic homemade recipes, premium ingredients, and traditional Andhra flavours to deliver a truly unforgettable culinary journey.
          </p>
        </motion.div>

        {/* FEATURES INFRASTRUCTURE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Subtle Internal Gradient Background Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}03 0%, transparent 100%)`
                }}
              />

              {/* CLEAN VISUAL ICON EMBED VAULT */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xs mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10"
                style={{ 
                  backgroundColor: `${feature.color}10`, 
                  color: feature.color,
                  border: `1px solid ${feature.color}15`
                }}
              >
                {feature.icon}
              </div>

              {/* CARD TEXT CONTENT DATA */}
              <div className="relative z-10">
                <h3 
                  className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2.5 tracking-tight"
                  style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                >
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* SUBTLE BLUR CORNER GRAPHIC DECORATOR */}
              <div 
                className="absolute -bottom-12 -right-12 w-24 h-24 blur-xl rounded-full opacity-30 pointer-events-none"
                style={{ backgroundColor: feature.color }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs