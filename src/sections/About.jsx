import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ChefHat, 
  Flame, 
  ArrowRight,
  UtensilsCrossed
} from "lucide-react"

export default function About() {
  const [activeTab, setActiveTab] = useState("legacy")

  // SMOOTH SCROLL TO PRODUCTS INVENTORY
  const scrollToProducts = () => {
    const section = document.getElementById("products")
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const tabsConfig = {
    legacy: {
      title: "Secret Family Recipes",
      subtitle: "Passed down across generations",
      description: "Our kitchens operate entirely on the sacred heirloom formulas crafted by our grandmothers in rural Andhra. Every measurements mix, curing timeline, and spice ratio is kept exactly as it was written decades ago to guarantee that one authentic spoonful of home comfort.",
      highlights: ["3 Generations of Craft", "Authentic Native Flavors", "Pure Nostalgic Spice Profiles"]
    },
    method: {
      title: "The Stone-Ground Way",
      subtitle: "Honoring slow culinary patience",
      description: "We completely reject modern high-speed electric grinders that overheat and burn out organic spice oils. Instead, our ingredients are slow stone-ground and hand-pounded to keep flavor locked inside. Our premium mangoes, lemons, and chilies undergo complete patient sun-curing.",
      highlights: ["Slow Sun-Cured Processing", "Traditional Hand Pounding", "Native Cold-Pressed Oils"]
    },
    purity: {
      title: "Zero Preservatives Promise",
      subtitle: "Pure food grade security",
      description: "Sahasra Foods operates under extreme hygiene checkpoints. We refuse chemical acids, commercial tasting powders, artificial color enhancements, and synthetic extenders. Your pickles are protected entirely by native sea salt, natural turmeric antiseptic layers, and premium organic oils.",
      highlights: ["100% All-Natural Preservation", "Small Batch Quality Control", "Strict Cleanroom Packaging"]
    }
  }

  return (
    <section id="about" className="relative py-24 bg-[#FFFDF9] overflow-hidden border-b border-gray-100">
      {/* BRAND AMBIENT RADIAL GRAPHIC ACCENTS */}
      <div className="absolute top-12 left-[-10%] w-[550px] h-[550px] bg-[#D4A437]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-[-10%] w-[550px] h-[550px] bg-[#0B5D3B]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE COLUMN: PREMIUM LUXURY INTERACTIVE MEDIA COLLAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative flex justify-center w-full"
          >
            {/* Master Photo Frame Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl border border-gray-200/60 p-3 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img
                  src="https://bhimavarampickels.com/wp-content/uploads/2025/03/chicken-piclle.webp"
                  alt="AuthentRE Andhra Hand-Crafted Spices"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Quality Seal Emblem */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 bg-white border border-gray-100/80 px-5 py-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-md flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6E0E12]/5 text-[#6E0E12] flex items-center justify-center border border-[#6E0E12]/10">
                  <UtensilsCrossed size={18} />
                </div>
                <div className="text-left">
                  <span className="text-2xl font-black text-[#1A1A1A] block leading-none font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
                    100%
                  </span>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 block leading-none">
                    Homemade Care
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE COLUMN: EDITORIAL BRAND NARRATIVE AND CONSOLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col items-start w-full"
          >
            {/* Premium Category Pill */}
            <div className="inline-flex px-4 py-1.5 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-5">
              <p className="text-[#6E0E12] font-black tracking-[3px] uppercase text-[10px]">
                Our Kitchen Story
              </p>
            </div>

            <h2 
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] mb-6 leading-[1.15]"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
            >
              Preserving The Rich <span className="text-[#6E0E12]">Emotional Warmth</span> Of Heritage Spices
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium mb-8 max-w-xl">
              Sahasra Foods was born from a simple kitchen table dream: to safeguard the complex, deep culinary legacy of classic Andhra households and ship it fresh straight to families across the nation.
            </p>

            {/* DYNAMIC STORY LINE TAB NAVIGATION CHIPS */}
            <div className="flex w-full items-center gap-2 border-b border-gray-100 pb-3 mb-6 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab("legacy")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "legacy" ? "bg-[#6E0E12] text-white shadow-md shadow-[#6E0E12]/10" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                Our Legacy
              </button>
              <button 
                onClick={() => setActiveTab("method")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "method" ? "bg-[#0B5D3B] text-white shadow-md shadow-[#0B5D3B]/10" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                The Method
              </button>
              <button 
                onClick={() => setActiveTab("purity")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "purity" ? "bg-[#D4A437] text-[#121212] shadow-md shadow-[#D4A437]/10" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                Purity Promise
              </button>
            </div>

            {/* DYNAMIC TEXT BOX ENGINE CONTENT CONTROLLER */}
            <div className="min-h-[180px] w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex flex-col gap-4"
                >
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 tracking-tight font-serif flex items-center gap-2">
                      {activeTab === "legacy" && <Heart size={16} className="text-[#6E0E12]" />}
                      {activeTab === "method" && <ChefHat size={16} className="text-[#0B5D3B]" />}
                      {activeTab === "purity" && <ShieldCheck size={16} className="text-[#D4A437]" />}
                      {tabsConfig[activeTab].title}
                    </h4>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                      {tabsConfig[activeTab].subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">
                    {tabsConfig[activeTab].description}
                  </p>

                  {/* Horizontal High-End Checkmarks Container */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    {tabsConfig[activeTab].highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                        <Sparkles size={11} className="text-[#D4A437] fill-[#D4A437]/20" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ACTION DISPATCH CONTROLLER TRIGGER BUTTON */}
            <button
              onClick={scrollToProducts}
              className="group h-13 px-8 rounded-xl bg-[#0B5D3B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0B5D3B]/10 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center gap-2 mt-8 cursor-pointer"
            >
              <span>Explore Our Menu</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}