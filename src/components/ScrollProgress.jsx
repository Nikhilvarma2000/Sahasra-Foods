import { motion, useScroll } from "framer-motion"

function ScrollProgress() {

  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] origin-left z-[9999]"
      style={{
        scaleX: scrollYProgress,
        background:
          "linear-gradient(to right, #D4A437, #0B5D3B, #6E0E12)",
      }}
    />
  )
}

export default ScrollProgress