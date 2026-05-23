import { motion } from "framer-motion"

function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-[#FFF9EE] overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4A437]/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0B5D3B]/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl group">

              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop"
                alt="Homemade Pickles"
                className="w-full h-[600px] object-cover group-hover:scale-110 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -bottom-10 -right-5 bg-white p-6 rounded-3xl shadow-2xl border border-[#D4A437]/20 backdrop-blur-xl"
            >
              <h3 className="text-5xl font-bold text-[#6E0E12] font-[Cinzel]">
                15+
              </h3>

              <p className="text-[#0B5D3B] font-medium mt-2">
                Years of Traditional Taste
              </p>
            </motion.div>

            {/* Small Floating Image */}
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -top-10 -left-10 hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
                alt="Traditional Food"
                className="w-52 h-52 rounded-3xl object-cover border-8 border-[#FFF9EE] shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            {/* Tag */}
            <div className="inline-block px-5 py-2 rounded-full bg-[#D4A437]/10 border border-[#D4A437]/20 mb-6">
              <p className="text-[#6E0E12] font-semibold tracking-[3px] uppercase text-sm">
                About Sahasra Foods
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-bold leading-tight font-[Cinzel] text-[#1A1A1A] mb-8">
              Bringing Authentic
              <span className="text-[#6E0E12]"> Andhra Flavours </span>
              To Every Home
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Sahasra Foods, every pickle is crafted with love, tradition,
              and premium ingredients. Our recipes are inspired by authentic
              Andhra homemade cooking methods passed down through generations.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              We prepare every batch hygienically using fresh ingredients,
              traditional spices, and homemade techniques to preserve the rich
              taste and emotional warmth of true homemade food.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">

              <div className="bg-white/70 backdrop-blur-xl border border-[#D4A437]/20 p-5 rounded-2xl shadow-lg">
                <h4 className="text-[#6E0E12] font-bold text-lg mb-2">
                  Homemade Recipes
                </h4>

                <p className="text-gray-600 text-sm">
                  Authentic traditional recipes prepared with homemade care.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-[#D4A437]/20 p-5 rounded-2xl shadow-lg">
                <h4 className="text-[#6E0E12] font-bold text-lg mb-2">
                  Premium Ingredients
                </h4>

                <p className="text-gray-600 text-sm">
                  Freshly sourced spices and high-quality natural ingredients.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-[#D4A437]/20 p-5 rounded-2xl shadow-lg">
                <h4 className="text-[#6E0E12] font-bold text-lg mb-2">
                  Hygienic Preparation
                </h4>

                <p className="text-gray-600 text-sm">
                  Clean and carefully prepared small-batch production process.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-[#D4A437]/20 p-5 rounded-2xl shadow-lg">
                <h4 className="text-[#6E0E12] font-bold text-lg mb-2">
                  Authentic Taste
                </h4>

                <p className="text-gray-600 text-sm">
                  Rich Andhra flavours that remind you of home.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="px-8 py-4 rounded-full bg-[#0B5D3B] text-white font-semibold shadow-2xl hover:scale-105 hover:bg-[#09482e] transition-all duration-300">
              Explore Products
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About