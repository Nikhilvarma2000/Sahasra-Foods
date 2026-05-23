import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaWhatsapp, FaTimes, FaPhoneAlt,
  FaMapMarkerAlt, FaUser, FaTag,
  FaShieldAlt, FaTruck, FaClock,
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
  white:  "#FFFDF5",
}

/* ─────────────────────────────────────────────
   ORNAMENT DIVIDER
───────────────────────────────────────────── */
function OrnamentDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}60)` }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="7" y="0" width="4.95" height="4.95" rx="0.6" transform="rotate(45 7 0)" fill={C.gold} />
        <rect x="7" y="0" width="2.8" height="2.8" rx="0.3" transform="rotate(45 7 0)" fill={C.cream} />
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.gold}60)` }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   STYLED INPUT
───────────────────────────────────────────── */
function StyledInput({ icon: Icon, type = "text", name, placeholder, value, onChange, multiline, rows }) {
  const [focused, setFocused] = useState(false)
  const [filled, setFilled]   = useState(false)

  const handleChange = (e) => {
    setFilled(!!e.target.value)
    onChange(e)
  }

  const borderColor = focused ? C.green : filled ? `${C.green}55` : C.border
  const iconColor   = focused ? C.green : filled ? C.green : C.muted

  const sharedStyle = {
    width: "100%", background: "#fff",
    border: `1.5px solid ${borderColor}`,
    borderRadius: 16, outline: "none",
    fontSize: 14, color: C.dark,
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused ? `0 0 0 3px ${C.green}14` : "none",
  }

  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <div style={{
          position: "absolute", left: 16, top: multiline ? 16 : "50%",
          transform: multiline ? "none" : "translateY(-50%)",
          pointerEvents: "none", transition: "color 0.2s", zIndex: 1,
        }}>
          <Icon size={14} style={{ color: iconColor }} />
        </div>
      )}
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          rows={rows || 5}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, padding: `14px 16px 14px ${Icon ? "42px" : "16px"}`, resize: "none", lineHeight: 1.6 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, height: 50, padding: `0 16px 0 ${Icon ? "42px" : "16px"}` }}
        />
      )}
      {/* filled checkmark */}
      {filled && !focused && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: "absolute", right: 14,
            top: multiline ? 14 : "50%",
            transform: multiline ? "none" : "translateY(-50%)",
            width: 20, height: 20, borderRadius: "50%",
            background: `${C.green}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{ color: C.green, fontSize: 10, fontWeight: 900 }}>✓</span>
        </motion.div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   CART ITEM ROW
───────────────────────────────────────────── */
function CartItemRow({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      style={{
        display: "flex", gap: 14, alignItems: "center",
        padding: "14px 16px",
        borderRadius: 20,
        background: "#fff",
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 12px rgba(212,164,55,0.06)",
      }}
    >
      {/* Image */}
      <div style={{
        width: 72, height: 72, borderRadius: 14,
        overflow: "hidden", flexShrink: 0,
        border: `1px solid ${C.border}`,
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontFamily: "Cinzel, serif", fontSize: 14,
          fontWeight: 700, color: C.dark, lineHeight: 1.2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.name}
        </h4>

        <div style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}>
          <span style={{
            padding: "3px 10px", borderRadius: 999,
            background: C.cream, border: `1px solid ${C.border}`,
            fontSize: 11, fontWeight: 600, color: "#92650A",
          }}>
            {item.weight}
          </span>
          <span style={{
            padding: "3px 10px", borderRadius: 999,
            background: `${C.green}0f`,
            fontSize: 11, fontWeight: 600, color: C.green,
          }}>
            Qty: {item.quantity}
          </span>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: 18, fontWeight: 800, color: C.red, lineHeight: 1,
        }}>
          ₹{item.price * item.quantity}
        </p>
        {item.quantity > 1 && (
          <p style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>
            ₹{item.price} each
          </p>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   TRUST BADGE
───────────────────────────────────────────── */
function TrustBadge({ icon: Icon, label, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      padding: "9px 14px", borderRadius: 12,
      background: `${color}0d`, border: `1px solid ${color}20`,
      flex: 1,
    }}>
      <Icon size={12} style={{ color, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color }}>
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ORDER MODAL
───────────────────────────────────────────── */
export default function OrderModal({ isOpen, onClose }) {
  const { cartItems, cartTotal } = useCart()

  const [formData, setFormData] = useState({
    name: "", phone: "", address: "", city: "", pincode: "",
  })

  /* — Body scroll lock — */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const isFormValid = formData.name && formData.phone && formData.address && formData.city && formData.pincode

  /* — WhatsApp message — */
  const handlePlaceOrder = () => {
    const lines = cartItems.map((item, i) =>
      `${i + 1}. ${item.name}\n   Weight: ${item.weight} | Qty: ${item.quantity} | ₹${item.price * item.quantity}`
    ).join("\n")

    const message = `Hello Sahasra Foods 👋\n\nNew Order Request:\n\n${lines}\n\n💰 Total: ₹${cartTotal}\n\n📦 Delivery To:\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}`

    window.open(`https://wa.me/919150299458?text=${encodeURIComponent(message)}`, "_blank")
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
              background: "rgba(10,10,10,0.78)",
              backdropFilter: "blur(10px)",
            }}
          />

          {/* ── Modal ── */}
          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 70, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              display: "flex", alignItems: "flex-end",
              justifyContent: "center", padding: 0,
            }}
            className="sm:items-center sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", width: "100%", maxWidth: 900,
                height: "100dvh", background: C.cream,
                display: "flex", flexDirection: "column",
                boxShadow: "0 32px 100px rgba(0,0,0,0.42)",
                overflow: "hidden",
              }}
              className="sm:max-h-[92dvh] rounded-t-[32px] sm:rounded-[32px]"
            >

              {/* ════════════════════════════════
                  HEADER
              ════════════════════════════════ */}
              <div style={{
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 24px 18px",
                background: "#fff",
                borderBottom: `1px solid ${C.border}`,
                position: "relative",
              }}>
                {/* Left: titles */}
                <div>
                  <p style={{
                    fontSize: 10, letterSpacing: "0.15em",
                    textTransform: "uppercase", fontWeight: 700,
                    color: C.red, marginBottom: 4,
                  }}>
                    Checkout
                  </p>
                  <h2 style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    fontWeight: 800, color: C.dark, lineHeight: 1.1,
                  }}>
                    Complete Your Order
                  </h2>
                  <OrnamentDivider />
                </div>

                {/* Right: item count + close */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    padding: "6px 14px", borderRadius: 999,
                    background: `${C.green}10`,
                    border: `1px solid ${C.green}25`,
                    fontSize: 12, fontWeight: 700, color: C.green,
                  }}>
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={onClose}
                    style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: `${C.red}0f`,
                      border: `1px solid ${C.red}22`,
                      color: C.red, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.red) || (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = `${C.red}0f`) || (e.currentTarget.style.color = C.red)}
                  >
                    <FaTimes size={12} />
                  </motion.button>
                </div>
              </div>

              {/* ════════════════════════════════
                  BODY — two columns
              ════════════════════════════════ */}
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
                   className="lg:flex-row">

                {/* ─── LEFT: Cart Summary ─── */}
                <div
                  style={{ padding: "22px 24px", flex: "0 0 auto" }}
                  className="lg:w-[42%] lg:border-r border-b lg:border-b-0"
                  style={{ borderColor: C.border }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{
                      fontFamily: "Cinzel, serif", fontSize: 15,
                      fontWeight: 700, color: C.dark,
                    }}>
                      Order Summary
                    </h3>
                  </div>

                  {/* Cart items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                    {cartItems.map((item, i) => (
                      <CartItemRow key={i} item={item} index={i} />
                    ))}
                  </div>

                  {/* Sub-total row */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", borderRadius: 14,
                    background: "#fff", border: `1px solid ${C.border}`,
                    marginBottom: 12,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Subtotal</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>₹{cartTotal}</span>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", borderRadius: 14,
                    background: "#fff", border: `1px solid ${C.border}`,
                    marginBottom: 18,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Delivery</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: C.green,
                      padding: "2px 10px", borderRadius: 999,
                      background: `${C.green}0f`,
                    }}>
                      FREE
                    </span>
                  </div>

                  {/* Total banner */}
                  <div style={{
                    padding: "18px 22px", borderRadius: 22,
                    background: `linear-gradient(135deg, ${C.green} 0%, #145c3f 50%, ${C.red} 100%)`,
                    position: "relative", overflow: "hidden",
                  }}>
                    {/* Glow blob */}
                    <div style={{
                      position: "absolute", top: -30, right: -20,
                      width: 100, height: 100, borderRadius: "50%",
                      background: `${C.gold}22`, filter: "blur(20px)",
                      pointerEvents: "none",
                    }} />

                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                      Grand Total
                    </p>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <p style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: "clamp(2rem, 6vw, 2.8rem)",
                        fontWeight: 900, color: "#fff", lineHeight: 1,
                      }}>
                        ₹{cartTotal}
                      </p>
                      <FaWhatsapp style={{ fontSize: 32, color: C.gold, opacity: 0.85 }} />
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                    <TrustBadge icon={FaShieldAlt} label="Secure Order"    color={C.green} />
                    <TrustBadge icon={FaTruck}     label="Fast Delivery"   color="#92650A" />
                    <TrustBadge icon={FaClock}     label="Fresh & Packed"  color={C.red}   />
                  </div>
                </div>

                {/* ─── RIGHT: Delivery Form ─── */}
                <div style={{ padding: "22px 24px", flex: 1 }}>
                  <h3 style={{
                    fontFamily: "Cinzel, serif", fontSize: 15,
                    fontWeight: 700, color: C.dark, marginBottom: 18,
                  }}>
                    Delivery Details
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                    {/* Name */}
                    <StyledInput
                      icon={FaUser}
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    {/* Phone */}
                    <StyledInput
                      icon={FaPhoneAlt}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    {/* City + Pincode */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <StyledInput
                        icon={FaMapMarkerAlt}
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <StyledInput
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Address */}
                    <StyledInput
                      icon={FaTag}
                      name="address"
                      placeholder="Full Delivery Address (House No, Street, Landmark…)"
                      value={formData.address}
                      onChange={handleChange}
                      multiline
                      rows={5}
                    />

                    {/* WhatsApp note */}
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      padding: "12px 14px", borderRadius: 14,
                      background: "rgba(37,211,102,0.08)",
                      border: "1px solid rgba(37,211,102,0.20)",
                    }}>
                      <FaWhatsapp size={16} style={{ color: "#25D366", marginTop: 1, flexShrink: 0 }} />
                      <p style={{ fontSize: 12, color: "#1A1A1A", lineHeight: 1.55 }}>
                        Your order details will be sent directly to{" "}
                        <strong style={{ color: C.green }}>Sahasra Foods</strong> via WhatsApp.
                        Please keep your phone handy for confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ════════════════════════════════
                  FOOTER CTA
              ════════════════════════════════ */}
              <div style={{
                flexShrink: 0, padding: "14px 22px 18px",
                background: "#fff",
                borderTop: `1px solid ${C.border}`,
              }}>
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid}
                  style={{
                    position: "relative", overflow: "hidden",
                    width: "100%", height: 58, borderRadius: 18,
                    border: "none", cursor: isFormValid ? "pointer" : "not-allowed",
                    background: isFormValid
                      ? "linear-gradient(135deg, #128C7E 0%, #25D366 100%)"
                      : "#E5E7EB",
                    color: isFormValid ? "#fff" : C.muted,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                    fontSize: 15, fontWeight: 700,
                    fontFamily: "Cinzel, serif", letterSpacing: "0.03em",
                    boxShadow: isFormValid ? "0 10px 36px rgba(18,140,126,0.40)" : "none",
                    transition: "background 0.3s, box-shadow 0.3s, color 0.3s",
                  }}
                >
                  {/* Shine on hover */}
                  {isFormValid && (
                    <motion.div
                      initial={{ x: "-130%" }}
                      whileHover={{ x: "130%" }}
                      transition={{ duration: 0.65, ease: "easeInOut" }}
                      style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.20) 50%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <FaWhatsapp size={20} style={{ position: "relative", zIndex: 1 }} />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {isFormValid
                      ? `Confirm Order on WhatsApp · ₹${cartTotal}`
                      : "Fill all details to continue"}
                  </span>
                </motion.button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}