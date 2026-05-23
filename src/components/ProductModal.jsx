import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaTimes, FaMinus, FaPlus, FaShoppingBag,
  FaCheck, FaStar, FaFireAlt, FaLeaf,
  FaTruck, FaAward, FaBoxOpen,
} from "react-icons/fa"
import { useCart } from "../context/CartContext"

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  cream:  "#FFF9EE",
  green:  "#0B5D3B",
  gold:   "#D4A437",
  dark:   "#1A1A1A",
  red:    "#6E0E12",
  muted:  "#9CA3AF",
  border: "rgba(212,164,55,0.18)",
}

/* ─────────────────────────────────────────────
   SPICE META
───────────────────────────────────────────── */
const SPICE_MAP = {
  Mild:   { color: "#16a34a" },
  Medium: { color: "#d97706" },
  Spicy:  { color: "#dc2626" },
  Hot:    { color: "#7f1d1d" },
}

/* ─────────────────────────────────────────────
   STAR ROW
───────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          size={12}
          style={{ color: s <= Math.round(rating) ? C.gold : `${C.gold}35` }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   FEATURE PILL
───────────────────────────────────────────── */
function FeaturePill({ icon: Icon, label, sub, color }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      padding: "14px 16px",
      borderRadius: 18,
      background: `${color}0d`,
      border: `1px solid ${color}22`,
      display: "flex", alignItems: "flex-start", gap: 10,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={14} style={{ color }} />
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{sub}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
export default function ProductModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart()

  const [quantity, setQuantity]           = useState(1)
  const [added, setAdded]                 = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(null)

  /* — Reset on product change — */
  useEffect(() => {
    if (product) {
      setQuantity(1)
      setAdded(false)
      setSelectedWeight({ label: "250g", price: product.basePrice })
    }
  }, [product])

  /* — Body scroll lock — */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  /* — Esc to close — */
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  if (!product || !selectedWeight) return null

  const weights = [
    { label: "250g", price: product.basePrice },
    { label: "500g", price: product.basePrice * 2, tag: "Popular" },
    { label: "1kg",  price: product.basePrice * 4, tag: "Best Value" },
  ]

  const totalPrice = selectedWeight.price * quantity
  const spiceColor = (SPICE_MAP[product.spice] || SPICE_MAP.Medium).color

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(10,10,10,0.75)",
              backdropFilter: "blur(10px)",
            }}
          />

          {/* ── Modal shell ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              display: "flex", alignItems: "flex-end",
              justifyContent: "center",
              padding: "0",
            }}
            className="sm:items-center sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%", maxWidth: 780,
                maxHeight: "92dvh",
                background: C.cream,
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                boxShadow: "0 32px 100px rgba(0,0,0,0.40)",
              }}
              className="rounded-t-[32px] sm:rounded-[32px]"
            >

              {/* ════════════════════════════════
                  IMAGE PANEL
              ════════════════════════════════ */}
              <div style={{ position: "relative", height: 280, flexShrink: 0, overflow: "hidden" }}
                   className="sm:h-[340px]">

                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                {/* Cinematic gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.88) 100%)",
                }} />

                {/* Decorative gold vignette corners */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: `radial-gradient(ellipse at top right, ${C.gold}18 0%, transparent 55%)`,
                }} />

                {/* ── Close ── */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  style={{
                    position: "absolute", top: 16, right: 16, zIndex: 20,
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(110,14,18,0.80)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.45)")}
                >
                  <FaTimes size={13} />
                </motion.button>

                {/* ── Top badges ── */}
                <div style={{
                  position: "absolute", top: 16, left: 16, zIndex: 20,
                  display: "flex", gap: 8,
                }}>
                  {/* Spice */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 999,
                    background: "rgba(0,0,0,0.40)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: 11, fontWeight: 700,
                  }}>
                    <FaFireAlt style={{ color: spiceColor, fontSize: 10 }} />
                    {product.spice}
                  </div>

                  {/* Rating */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 999,
                    background: "rgba(0,0,0,0.40)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff", fontSize: 11, fontWeight: 700,
                  }}>
                    <FaStar style={{ color: C.gold, fontSize: 10 }} />
                    {product.rating}
                    <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
                      ({product.reviews}+)
                    </span>
                  </div>
                </div>

                {/* ── Image text ── */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "20px 22px 22px", zIndex: 20,
                }}>
                  <p style={{
                    fontSize: 10, letterSpacing: "0.12em", fontWeight: 700,
                    textTransform: "uppercase", color: C.gold, marginBottom: 6,
                  }}>
                    {product.category}
                  </p>
                  <h2 style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                    fontWeight: 800, color: "#fff", lineHeight: 1.1,
                    marginBottom: 8,
                  }}>
                    {product.name}
                  </h2>
                  <p style={{
                    fontSize: 13, color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.6, maxWidth: 480,
                  }}>
                    {product.description}
                  </p>
                </div>
              </div>

              {/* ════════════════════════════════
                  SCROLLABLE BODY
              ════════════════════════════════ */}
              <div style={{ flex: 1, overflowY: "auto", padding: "22px 22px 0" }}>

                {/* ── Weight selector ── */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 12,
                  }}>
                    <h3 style={{
                      fontFamily: "Cinzel, serif", fontSize: 15,
                      fontWeight: 700, color: C.dark, letterSpacing: "0.02em",
                    }}>
                      Select Weight
                    </h3>
                    <p style={{ fontSize: 12, color: C.muted }}>
                      Base ₹{product.basePrice} / 250g
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                    {weights.map((w) => {
                      const active = selectedWeight.label === w.label
                      return (
                        <motion.button
                          key={w.label}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedWeight(w)}
                          style={{
                            position: "relative",
                            height: 76, borderRadius: 18, cursor: "pointer",
                            border: `2px solid ${active ? C.green : C.border}`,
                            background: active
                              ? `linear-gradient(135deg, ${C.green}, #145c3f)`
                              : "#fff",
                            color: active ? "#fff" : C.dark,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 3,
                            transition: "all 0.25s ease",
                            boxShadow: active ? `0 6px 24px ${C.green}40` : "none",
                            overflow: "hidden",
                          }}
                        >
                          {/* Tag ribbon */}
                          {w.tag && (
                            <div style={{
                              position: "absolute", top: 6, right: -8,
                              background: active ? "rgba(255,255,255,0.25)" : C.gold,
                              color: active ? "#fff" : "#fff",
                              fontSize: 8, fontWeight: 800,
                              padding: "2px 12px 2px 8px",
                              borderRadius: "999px 0 0 999px",
                              letterSpacing: "0.05em",
                            }}>
                              {w.tag}
                            </div>
                          )}
                          <span style={{
                            fontFamily: "Cinzel, serif",
                            fontSize: 18, fontWeight: 800, lineHeight: 1,
                          }}>
                            {w.label}
                          </span>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: active ? "rgba(255,255,255,0.80)" : C.muted,
                          }}>
                            ₹{w.price}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* ── Quantity + Price ── */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 16,
                  padding: "18px 20px",
                  borderRadius: 20,
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  marginBottom: 18,
                  boxShadow: "0 2px 16px rgba(212,164,55,0.07)",
                }}>

                  {/* Quantity stepper */}
                  <div>
                    <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                      Quantity
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                        style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: quantity <= 1 ? "#f5f5f5" : C.cream,
                          border: `1px solid ${C.border}`,
                          color: quantity <= 1 ? C.muted : C.dark,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: quantity <= 1 ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <FaMinus size={11} />
                      </motion.button>

                      <div style={{
                        width: 52, textAlign: "center",
                        fontFamily: "Cinzel, serif",
                        fontSize: 26, fontWeight: 900, color: C.dark,
                      }}>
                        {quantity}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => setQuantity(q => q + 1)}
                        style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: C.green,
                          border: "none",
                          color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: `0 4px 14px ${C.green}40`,
                        }}
                      >
                        <FaPlus size={11} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ width: 1, alignSelf: "stretch", background: C.border }} />

                  {/* Total */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                      Total
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={totalPrice}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                          fontWeight: 900, color: C.red, lineHeight: 1,
                        }}
                      >
                        ₹{totalPrice}
                      </motion.p>
                    </AnimatePresence>
                    <p style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
                      {selectedWeight.label} × {quantity}
                    </p>
                  </div>
                </div>

                {/* ── Feature pills ── */}
                <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}
                     className="sm:flex-nowrap">
                  <FeaturePill icon={FaTruck}   label="Fast Delivery"  sub="2–4 working days"     color={C.green} />
                  <FeaturePill icon={FaLeaf}    label="Fresh Batch"    sub="Prepared daily"       color="#92650A" />
                  <FeaturePill icon={FaAward}   label="Authentic"      sub="Original Andhra recipe" color={C.red} />
                </div>
              </div>

              {/* ════════════════════════════════
                  STICKY FOOTER CTA
              ════════════════════════════════ */}
              <div style={{
                padding: "14px 22px 18px",
                background: C.cream,
                borderTop: `1px solid ${C.border}`,
                flexShrink: 0,
              }}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  style={{
                    position: "relative", overflow: "hidden",
                    width: "100%", height: 56, borderRadius: 18,
                    border: "none", cursor: "pointer",
                    background: added
                      ? C.green
                      : `linear-gradient(135deg, ${C.green} 0%, #145c3f 50%, ${C.red} 100%)`,
                    color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    fontSize: 15, fontWeight: 700,
                    fontFamily: "Cinzel, serif",
                    letterSpacing: "0.03em",
                    boxShadow: added
                      ? `0 8px 28px ${C.green}50`
                      : `0 10px 36px rgba(11,93,59,0.38)`,
                    transition: "background 0.35s, box-shadow 0.35s",
                  }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    initial={{ x: "-130%" }}
                    whileHover={{ x: "130%" }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}
                      >
                        <FaCheck size={14} /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="cta"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}
                      >
                        <FaShoppingBag size={14} />
                        Add to Cart · ₹{totalPrice}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}