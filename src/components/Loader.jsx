import { motion } from "framer-motion"
import logo from "../assets/logos/logo.png"

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const GOLD   = "#D4A437"
const GREEN  = "#0B5D3B"
const BG     = "#070F0B"

/* ─────────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────────── */
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0],
        scale:   [0, 1, 0],
        y:       [0, -30, -60],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
        ease: "easeOut",
      }}
      style={{
        position: "absolute",
        left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        borderRadius: "50%",
        background: GOLD,
        filter: `blur(${size / 4}px)`,
        pointerEvents: "none",
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   LETTER-BY-LETTER TITLE
───────────────────────────────────────────── */
function AnimatedTitle({ text, delay = 0 }) {
  return (
    <span style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

/* ─────────────────────────────────────────────
   ORBITAL RING
───────────────────────────────────────────── */
function OrbitalRing({ size, speed, color, opacity, dashed, clockwise = true, thickness = 1 }) {
  return (
    <motion.div
      animate={{ rotate: clockwise ? 360 : -360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        border: `${thickness}px ${dashed ? "dashed" : "solid"} transparent`,
        borderTopColor: color,
        borderRightColor: dashed ? color : "transparent",
        opacity,
        flexShrink: 0,
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   LOADING BAR
───────────────────────────────────────────── */
function LoadingBar() {
  return (
    <div style={{
      width: 160, height: 2,
      background: "rgba(212,164,55,0.15)",
      borderRadius: 999, overflow: "hidden",
      marginTop: 36,
    }}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        style={{
          width: "60%", height: "100%",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          borderRadius: 999,
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   LOADER
───────────────────────────────────────────── */
export default function Loader() {
  const particles = [
    { x: 12, y: 70, size: 4, delay: 0.0, duration: 3.2 },
    { x: 22, y: 50, size: 3, delay: 0.8, duration: 2.8 },
    { x: 35, y: 80, size: 5, delay: 1.4, duration: 3.6 },
    { x: 62, y: 75, size: 3, delay: 0.3, duration: 2.5 },
    { x: 74, y: 55, size: 4, delay: 1.1, duration: 3.1 },
    { x: 85, y: 72, size: 3, delay: 0.6, duration: 2.9 },
    { x: 48, y: 20, size: 3, delay: 2.0, duration: 3.4 },
    { x: 88, y: 30, size: 4, delay: 1.7, duration: 2.6 },
    { x: 8,  y: 28, size: 3, delay: 2.4, duration: 3.0 },
    { x: 55, y: 88, size: 4, delay: 0.5, duration: 3.3 },
  ]

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: BG,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >

      {/* ── Deep radial background glows ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 50% at 50% 50%, ${GREEN}30 0%, transparent 70%),
          radial-gradient(ellipse 40% 35% at 50% 50%, ${GOLD}15 0%, transparent 60%)
        `,
      }} />

      {/* ── Subtle grid texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
        backgroundImage: `
          linear-gradient(${GOLD}40 1px, transparent 1px),
          linear-gradient(90deg, ${GOLD}40 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
      }} />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* ════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════ */}
      <div style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        alignItems: "center",
      }}>

        {/* ── Orbital ring stack ── */}
        <div style={{
          position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 220, height: 220, flexShrink: 0,
        }}>

          {/* Outer pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 210, height: 210, borderRadius: "50%",
              border: `1px solid ${GOLD}`,
            }}
          />

          {/* Fast inner spinner */}
          <OrbitalRing size={192} speed={4}  color={GOLD}  opacity={0.9} thickness={2} clockwise={true}  />

          {/* Medium dashed ring */}
          <OrbitalRing size={168} speed={9}  color={GOLD}  opacity={0.30} dashed thickness={1} clockwise={false} />

          {/* Slow outer accent */}
          <OrbitalRing size={210} speed={16} color={GREEN} opacity={0.50} thickness={1} clockwise={true}  />

          {/* ── Logo ── */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10 }}
          >
            {/* Gold glow behind logo */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 18px 4px ${GOLD}30`,
                  `0 0 55px 14px ${GOLD}55`,
                  `0 0 18px 4px ${GOLD}30`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                borderRadius: "50%",
                border: `3px solid ${GOLD}`,
              }}
            >
              <img
                src={logo}
                alt="Sahasra Foods"
                style={{
                  width: 120, height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </motion.div>

            {/* Inner glow overlay */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
          </motion.div>

        </div>

        {/* ── Brand Name ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: 28, textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >

          {/* SAHASRA */}
          <h1 style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(2.2rem, 6vw, 3rem)",
            fontWeight: 800, color: "#fff",
            letterSpacing: "0.18em",
            lineHeight: 1, margin: 0,
          }}>
            <AnimatedTitle text="SAHASRA" delay={0.35} />
          </h1>

          {/* FOODS — gold underline */}
          <div style={{ position: "relative", marginTop: 4 }}>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ delay: 0.9, duration: 0.9 }}
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: 13, color: GOLD,
                fontWeight: 600, margin: 0,
                textTransform: "uppercase",
              }}
            >
              Foods
            </motion.p>
            {/* animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
              style={{
                position: "absolute", bottom: -5, left: 0, right: 0,
                height: 1,
                background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
                transformOrigin: "center",
              }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            style={{
              color: "#fff",
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: 18, fontWeight: 500,
            }}
          >
            Authentic Andhra Flavours
          </motion.p>
        </motion.div>

        {/* ── Loading bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <LoadingBar />
        </motion.div>

        {/* ── Loading label ── */}
        <motion.p
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
          style={{
            color: `${GOLD}80`, fontSize: 9,
            letterSpacing: "0.28em", textTransform: "uppercase",
            marginTop: 10, fontWeight: 600,
          }}
        >
          Loading
        </motion.p>
      </div>

    </div>
  )
}