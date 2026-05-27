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
      icon: <FaShoppingBag size={22} />,
      title: "Browse Products",
      description:
        "Explore authentic homemade pickles, powders and traditional snacks prepared fresh daily.",
      color: "#0B5D3B", // Emerald Green
    },
    {
      id: "02",
      icon: <FaWhatsapp size={24} />,
      title: "Add & Confirm",
      description:
        "Customize products, add them to cart and confirm your order through WhatsApp instantly.",
      color: "#D4A437", // Gold
    },
    {
      id: "03",
      icon: <FaTruck size={22} />,
      title: "Fresh Delivery",
      description:
        "We prepare your order carefully and deliver fresh homemade flavours directly to your doorstep.",
      color: "#6E0E12", // Brand Maroon
    },
    {
      id: "04",
      icon: <FaSmile size={22} />,
      title: "Enjoy Taste",
      description:
        "Experience rich Andhra homemade flavours crafted with tradition and premium ingredients.",
      color: "#0B5D3B", // Emerald Green
    },
  ]

  return (
    <section id="process" className="relative overflow-hidden py-24 bg-[#FFFBF7]">
      {/* BRAND RADIAL BACKDROP GLOWS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4A437]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0B5D3B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* SECTION HEADER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex px-4 py-1.5 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-4">
            <p className="text-[#6E0E12] text-xs tracking-[3px] uppercase font-bold">
              Simple Ordering Process
            </p>
          </div>

          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#121212] tracking-tight mb-4"
            style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
          >
            How To <span className="text-[#6E0E12]">Order</span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto font-medium">
            Ordering your favorite homemade Andhra foods is quick, simple and completely hassle free.
          </p>
        </motion.div>

        {/* STEPS GRID WRAPPER */}
        <div className="relative">
          {/* DESKTOP INTEGRATED CONNECTOR TRACK */}
          <div className="hidden xl:block absolute top-[70px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#0B5D3B]/20 via-[#D4A437]/20 to-[#6E0E12]/20 z-0 pointer-events-none" />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* FLOATING INDEX NUMBER */}
                <div 
                  className="absolute top-4 right-5 text-5xl font-black opacity-[0.06] select-none italic font-serif"
                  style={{ color: step.color }}
                >
                  {step.id}
                </div>

                {/* PREMIUM ICON VAULT CONTAINER */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-xs mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    backgroundColor: `${step.color}12`, 
                    color: step.color,
                    border: `1px solid ${step.color}18`
                  }}
                >
                  {step.icon}
                </div>

                {/* STEP TITLE */}
                <h3 
                  className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight"
                  style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                >
                  {step.title}
                </h3>

                {/* STEP DESCRIPTION */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* BOTTOM AMBIENT CARD OVERLAY DECORATION */}
                <div 
                  className="absolute -bottom-16 -right-16 w-32 h-32 blur-2xl rounded-full opacity-40 pointer-events-none"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OrderProcess