import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaPlus,
  FaStar,
  FaFireAlt,
  FaHeart,
  FaShoppingBag,
  FaBolt,
  FaLeaf,
} from "react-icons/fa"

/* ─────────────────────────────────────────────
   SPICE CONFIG
───────────────────────────────────────────── */
const SPICE_MAP = {
  Mild:   { color: "#16a34a", bg: "rgba(22,163,74,0.14)",   flames: 1 },
  Medium: { color: "#d97706", bg: "rgba(217,119,6,0.14)",   flames: 2 },
  Spicy:  { color: "#dc2626", bg: "rgba(220,38,38,0.14)",   flames: 3 },
  Hot:    { color: "#7f1d1d", bg: "rgba(127,29,29,0.16)",   flames: 4 },
}

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          size={11}
          style={{ color: s <= Math.round(rating) ? "#D4A437" : "#D4A43740" }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
export default function ProductCard({ product, onOpen }) {
  const [liked, setLiked]       = useState(false)
  const [addedPop, setAddedPop] = useState(false)
  const spice = SPICE_MAP[product.spice] || SPICE_MAP.Medium

  const handleAdd = (e) => {
    e.stopPropagation()
    setAddedPop(true)
    setTimeout(() => setAddedPop(false), 1600)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onClick={() => onOpen(product)}
      style={{
        borderRadius: 28,
        overflow: "hidden",
        background: "#FFFDF5",
        border: "1px solid rgba(212,164,55,0.15)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
        cursor: "pointer",
        position: "relative",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 24px 72px rgba(0,0,0,0.14)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.07)")}
    >

      {/* ── IMAGE BLOCK ── */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>

        {/* Photo */}
        <motion.img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Gradient overlay — rich, cinematic */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.82) 100%)",
        }} />

        {/* Subtle grain texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5, pointerEvents: "none",
        }} />

        {/* ── TOP-LEFT: Spice + Best Seller ── */}
        <div style={{ position: "absolute", top: 14, left: 14, display: "flex", flexDirection: "column", gap: 7, zIndex: 10 }}>

          {/* Spice pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "5px 12px", borderRadius: 999,
            background: "rgba(0,0,0,0.40)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.04em",
          }}>
            <FaFireAlt style={{ color: spice.color, fontSize: 10 }} />
            {product.spice}
          </div>

          {/* Best Seller ribbon */}
          {product.bestSeller && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 999,
                background: "linear-gradient(135deg, #6E0E12, #9B1B22)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.04em",
                boxShadow: "0 4px 18px rgba(110,14,18,0.45)",
              }}
            >
              <FaBolt style={{ fontSize: 9 }} />
              Best Seller
            </motion.div>
          )}
        </div>

        {/* ── TOP-RIGHT: Heart ── */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l) }}
          whileTap={{ scale: 0.82 }}
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            width: 38, height: 38, borderRadius: "50%",
            background: liked ? "rgba(110,14,18,0.90)" : "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.14)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: liked ? "#fff" : "rgba(255,255,255,0.85)",
            cursor: "pointer", transition: "background 0.25s",
          }}
        >
          <FaHeart size={13} />
        </motion.button>

        {/* ── BOTTOM TEXT on image ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 18px 16px", zIndex: 10 }}>

          {/* Category micro-label */}
          <p style={{
            fontSize: 10, letterSpacing: "0.12em", fontWeight: 700,
            textTransform: "uppercase", color: "#D4A437",
            marginBottom: 5,
          }}>
            {product.category}
          </p>

          {/* Product name */}
          <h3 style={{
            fontFamily: "Cinzel, serif", fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.15,
            marginBottom: 6, letterSpacing: "-0.01em",
          }}>
            {product.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: 12, color: "rgba(255,255,255,0.72)",
            lineHeight: 1.55, display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {product.description}
          </p>
        </div>
      </div>

      {/* ── BOTTOM CARD ── */}
      <div style={{ padding: "18px 18px 18px", background: "#FFFDF5", position: "relative" }}>

        {/* Gold top line accent */}
        <div style={{
          position: "absolute", top: 0, left: 18, right: 18, height: 1,
          background: "linear-gradient(to right, transparent, rgba(212,164,55,0.4), transparent)",
        }} />

        {/* Row 1 — Rating + Price */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>

          {/* Rating */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <StarRow rating={product.rating} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A" }}>
                {product.rating}
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#9CA3AF" }}>
              {product.reviews}+ happy customers
            </p>
          </div>

          {/* Price block */}
          <div style={{
            textAlign: "right",
            padding: "8px 14px", borderRadius: 14,
            background: "linear-gradient(135deg, #FFF7E0, #FFFDF5)",
            border: "1px solid rgba(212,164,55,0.22)",
          }}>
            <p style={{ fontSize: 9, letterSpacing: "0.1em", color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>
              From
            </p>
            <p style={{ fontFamily: "Cinzel, serif", fontSize: "1.45rem", fontWeight: 900, color: "#6E0E12", lineHeight: 1 }}>
              ₹{product.basePrice}
            </p>
          </div>
        </div>

        {/* Row 2 — Tags row */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {[
            { label: "Homemade",       bg: "rgba(11,93,59,0.09)",  color: "#0B5D3B" },
            { label: "Authentic",      bg: "rgba(212,164,55,0.12)", color: "#92650A" },
            { label: product.spice === "Mild" ? "Vegetarian" : "Premium", bg: "rgba(110,14,18,0.09)", color: "#6E0E12" },
          ].map((tag) => (
            <span
              key={tag.label}
              style={{
                display: "inline-block", padding: "4px 11px", borderRadius: 999,
                fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
                background: tag.bg, color: tag.color,
              }}
            >
              {tag.label}
            </span>
          ))}

          {/* Fresh today */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "4px 11px", borderRadius: 999,
            fontSize: 10, fontWeight: 700,
            background: "rgba(11,93,59,0.09)", color: "#0B5D3B",
          }}>
            <FaLeaf size={8} /> Fresh Today
          </span>
        </div>

        {/* Row 3 — CTA buttons */}
        <div style={{ display: "flex", gap: 10, position: "relative" }}>

          {/* Bag icon button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onOpen(product) }}
            style={{
              width: 50, height: 50, borderRadius: 16, flexShrink: 0,
              background: "#FFF9EE",
              border: "1.5px solid rgba(212,164,55,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1A1A1A", cursor: "pointer", transition: "all 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0B5D3B"; e.currentTarget.style.color = "#fff" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFF9EE"; e.currentTarget.style.color = "#1A1A1A" }}
          >
            <FaShoppingBag size={16} />
          </motion.button>

          {/* Main CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            style={{
              flex: 1, height: 50, borderRadius: 16,
              background: "linear-gradient(135deg, #0B5D3B 0%, #145c3f 50%, #6E0E12 100%)",
              color: "#fff", fontWeight: 700, fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              border: "none", cursor: "pointer", overflow: "hidden", position: "relative",
              boxShadow: "0 8px 28px rgba(11,93,59,0.30)",
            }}
          >
            {/* Shine sweep */}
            <motion.div
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <FaPlus size={12} style={{ position: "relative", zIndex: 1 }} />
            <span style={{ position: "relative", zIndex: 1 }}>Customize & Add</span>
          </motion.button>

          {/* "Added!" pop */}
          <AnimatePresence>
            {addedPop && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.88 }}
                transition={{ duration: 0.22 }}
                style={{
                  position: "absolute", bottom: "calc(100% + 8px)", right: 0,
                  background: "#0B5D3B", color: "#fff",
                  padding: "6px 14px", borderRadius: 10,
                  fontSize: 12, fontWeight: 700,
                  boxShadow: "0 6px 20px rgba(11,93,59,0.35)",
                  whiteSpace: "nowrap", zIndex: 20,
                }}
              >
                ✓ Added to cart
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Hover border glow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 28,
          border: "1.5px solid rgba(212,164,55,0.45)",
          pointerEvents: "none",
        }}
      />
    </motion.article>
  )
}