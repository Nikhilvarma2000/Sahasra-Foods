import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaWhatsapp, FaTimes, FaPhoneAlt,
  FaMapMarkerAlt, FaUser, FaTag,
  FaShieldAlt, FaTruck, FaClock,
} from "react-icons/fa"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "../context/CartContext"

const FREE_SHIPPING_THRESHOLD = 1000
const SHIPPING_FEE = 40

const C = {
  cream:  "#FFF9EE",
  green:  "#0B5D3B",
  gold:   "#D4A437",
  dark:   "#1A1A1A",
  red:    "#6E0E12",
  muted:  "#9CA3AF",
  border: "rgba(212,164,55,0.15)",
  white:  "#FFFDF5",
}

/* ── ORNAMENT DIVIDER ── */
function OrnamentDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "5px 0 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}50)` }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="7" y="0" width="4.95" height="4.95" rx="0.6" transform="rotate(45 7 0)" fill={C.gold} />
        <rect x="7" y="0" width="2.8" height="2.8" rx="0.3" transform="rotate(45 7 0)" fill={C.cream} />
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.gold}50)` }} />
    </div>
  )
}

/* ── STYLED INPUT ── */
function StyledInput({ icon: Icon, type = "text", name, placeholder, value, onChange, multiline, rows }) {
  const [focused, setFocused] = useState(false)
  const filled = !!value

  const handleChange = (e) => onChange(e)

  const borderColor = focused ? C.green : filled ? `${C.green}50` : C.border
  const iconColor   = focused || filled ? C.green : C.muted

  const sharedStyle = {
    width: "100%",
    background: filled ? `${C.green}04` : "#fff",
    border: `1.5px solid ${borderColor}`,
    borderRadius: 14,
    outline: "none",
    fontSize: 14,
    color: C.dark,
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    boxShadow: focused ? `0 0 0 3px ${C.green}12` : "none",
  }

  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <div style={{
          position: "absolute", left: 14, top: multiline ? 15 : "50%",
          transform: multiline ? "none" : "translateY(-50%)",
          pointerEvents: "none", transition: "color 0.2s", zIndex: 1,
        }}>
          <Icon size={13} style={{ color: iconColor }} />
        </div>
      )}
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          rows={rows || 4}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, padding: `13px 14px 13px ${Icon ? "40px" : "14px"}`, resize: "none", lineHeight: 1.6 }}
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
          style={{ ...sharedStyle, height: 48, padding: `0 ${filled ? "40px" : "14px"} 0 ${Icon ? "40px" : "14px"}` }}
        />
      )}
      {/* Filled check */}
      <AnimatePresence>
        {filled && !focused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "absolute", right: 12,
              top: multiline ? 14 : "50%",
              transform: multiline ? "none" : "translateY(-50%)",
              width: 20, height: 20, borderRadius: "50%",
              background: `${C.green}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <CheckCircle2 size={13} style={{ color: C.green }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── CART ITEM ROW ── */
function CartItemRow({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      style={{
        display: "flex", gap: 12, alignItems: "center",
        padding: "12px 14px",
        borderRadius: 18,
        background: "#fff",
        border: `1px solid ${C.border}`,
        boxShadow: "0 2px 10px rgba(212,164,55,0.06)",
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 12,
        overflow: "hidden", flexShrink: 0,
        border: `1px solid ${C.border}`,
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontFamily: "Cinzel, serif", fontSize: 13,
          fontWeight: 700, color: C.dark, lineHeight: 1.25,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.name}
        </h4>
        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
          <span style={{
            padding: "2px 9px", borderRadius: 999,
            background: C.cream, border: `1px solid ${C.border}`,
            fontSize: 11, fontWeight: 600, color: "#92650A",
          }}>
            {item.weight}
          </span>
          <span style={{
            padding: "2px 9px", borderRadius: 999,
            background: `${C.green}0d`,
            fontSize: 11, fontWeight: 600, color: C.green,
          }}>
            Qty: {item.quantity}
          </span>
        </div>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: 17, fontWeight: 800, color: C.red, lineHeight: 1,
        }}>
          ₹{item.price * item.quantity}
        </p>
        {item.quantity > 1 && (
          <p style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>₹{item.price} each</p>
        )}
      </div>
    </motion.div>
  )
}

/* ── TRUST BADGE ── */
function TrustBadge({ icon: Icon, label, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "8px 12px", borderRadius: 12,
      background: `${color}0c`, border: `1px solid ${color}1e`,
      flex: 1, minWidth: 0,
    }}>
      <Icon size={12} style={{ color, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
    </div>
  )
}

/* ── ORDER MODAL ── */
export default function OrderModal({ isOpen, onClose }) {
  const { cartItems, cartTotal } = useCart()

  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD
  const deliveryCost = isFreeShipping ? 0 : SHIPPING_FEE
  const grandTotal = cartTotal + deliveryCost

  const [formData, setFormData] = useState({
    name: "", phone: "", address: "", city: "", pincode: "",
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const isFormValid =
    formData.name && formData.phone && formData.address &&
    formData.city && formData.pincode

  const handlePlaceOrder = () => {
    if (!isFormValid) return
    const lines = cartItems.map(
      (item, i) =>
        `${i + 1}. ${item.name}\n   Weight: ${item.weight} | Qty: ${item.quantity} | ₹${item.price * item.quantity}`
    ).join("\n")

    const deliveryLine = isFreeShipping
      ? "Delivery: FREE 🎁"
      : `Delivery: ₹${SHIPPING_FEE}`

    const message =
      `Hello Sahasra Foods 👋\n\nNew Order:\n\n${lines}\n\n` +
      `💰 Subtotal: ₹${cartTotal}\n${deliveryLine}\n✅ Grand Total: ₹${grandTotal}\n\n` +
      `📦 Deliver To:\nName: ${formData.name}\nPhone: ${formData.phone}\n` +
      `Address: ${formData.address}, ${formData.city} - ${formData.pincode}`

    window.open(`https://wa.me/917075076825?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(8,8,8,0.80)",
              backdropFilter: "blur(12px)",
            }}
          />

          {/* MODAL SHEET */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 10000,
              display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}
            className="sm:items-center sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", width: "100%", maxWidth: 920,
                background: C.cream,
                display: "flex", flexDirection: "column",
                boxShadow: "0 32px 100px rgba(0,0,0,0.45)",
                overflow: "hidden",
                height: "100dvh",
              }}
              className="sm:max-h-[92dvh] rounded-t-[28px] sm:rounded-[28px]"
            >

              {/* ── HEADER ── */}
              <div style={{
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 22px 16px",
                background: "#fff",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <div>
                  <p style={{
                    fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                    fontWeight: 800, color: C.red, marginBottom: 4,
                  }}>
                    Checkout · {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </p>
                  <h2 style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    fontWeight: 800, color: C.dark, lineHeight: 1.1,
                  }}>
                    Complete Your Order
                  </h2>
                  <OrnamentDivider />
                </div>

                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: `${C.red}0e`,
                    border: `1px solid ${C.red}20`,
                    color: C.red, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginLeft: 12,
                  }}
                >
                  <FaTimes size={12} />
                </motion.button>
              </div>

              {/* ── BODY ── */}
              <div
                style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
                className="lg:flex-row"
              >

                {/* LEFT: Order Summary */}
                <div
                  style={{
                    padding: "20px 22px",
                    flex: "0 0 auto",
                    borderColor: C.border,
                  }}
                  className="lg:w-[42%] lg:border-r border-b lg:border-b-0"
                >
                  <h3 style={{
                    fontFamily: "Cinzel, serif", fontSize: 14,
                    fontWeight: 700, color: C.dark, marginBottom: 14,
                  }}>
                    Order Summary
                  </h3>

                  {/* Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
                    {cartItems.map((item, i) => (
                      <CartItemRow key={i} item={item} index={i} />
                    ))}
                  </div>

                  {/* Bill Breakdown */}
                  <div style={{
                    background: "#fff", borderRadius: 18,
                    border: `1px solid ${C.border}`,
                    overflow: "hidden", marginBottom: 14,
                  }}>
                    {/* Subtotal */}
                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "11px 16px",
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Subtotal</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, fontFamily: "monospace" }}>
                        ₹{cartTotal}
                      </span>
                    </div>

                    {/* Delivery */}
                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "11px 16px",
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>Delivery</span>
                      {isFreeShipping ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{
                            fontSize: 11, fontWeight: 800, color: C.green,
                            padding: "2px 10px", borderRadius: 999,
                            background: `${C.green}0f`,
                            textTransform: "uppercase", letterSpacing: "0.05em",
                          }}>
                            FREE
                          </span>
                          <span style={{ fontSize: 10, color: C.muted, textDecoration: "line-through" }}>
                            ₹{SHIPPING_FEE}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, fontFamily: "monospace" }}>
                          ₹{SHIPPING_FEE}
                        </span>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "13px 16px",
                      background: `${C.green}05`,
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Grand Total</span>
                      <span style={{
                        fontFamily: "Cinzel, serif",
                        fontSize: 20, fontWeight: 900, color: C.red,
                      }}>
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Free shipping nudge */}
                  {!isFreeShipping && (
                    <div style={{
                      padding: "10px 14px", borderRadius: 12,
                      background: `${C.gold}0c`, border: `1px solid ${C.gold}22`,
                      fontSize: 11, color: "#92650A", fontWeight: 600,
                      marginBottom: 14,
                    }}>
                      💡 Add ₹{FREE_SHIPPING_THRESHOLD - cartTotal} more to unlock <strong>free delivery</strong>
                    </div>
                  )}

                  {/* Trust badges */}
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    <TrustBadge icon={FaShieldAlt} label="Secure Order"   color={C.green} />
                    <TrustBadge icon={FaTruck}     label="Fast Delivery"  color="#92650A" />
                    <TrustBadge icon={FaClock}     label="Fresh & Packed" color={C.red}   />
                  </div>
                </div>

                {/* RIGHT: Delivery Form */}
                <div style={{ padding: "20px 22px", flex: 1 }}>
                  <h3 style={{
                    fontFamily: "Cinzel, serif", fontSize: 14,
                    fontWeight: 700, color: C.dark, marginBottom: 16,
                  }}>
                    Delivery Details
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <StyledInput
                      icon={FaUser}
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <StyledInput
                      icon={FaPhoneAlt}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
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
                    <StyledInput
                      icon={FaTag}
                      name="address"
                      placeholder="Full Address (House No, Street, Landmark…)"
                      value={formData.address}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />

                    {/* WhatsApp note */}
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      padding: "11px 14px", borderRadius: 14,
                      background: "rgba(37,211,102,0.07)",
                      border: "1px solid rgba(37,211,102,0.18)",
                    }}>
                      <FaWhatsapp size={15} style={{ color: "#25D366", marginTop: 1, flexShrink: 0 }} />
                      <p style={{ fontSize: 12, color: "#1A1A1A", lineHeight: 1.55, margin: 0 }}>
                        Your order will be sent to{" "}
                        <strong style={{ color: C.green }}>Sahasra Foods</strong> via WhatsApp.
                        Keep your phone handy for confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── FOOTER CTA ── */}
              <div style={{
                flexShrink: 0, padding: "13px 20px 16px",
                background: "#fff",
                borderTop: `1px solid ${C.border}`,
              }}>
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid}
                  style={{
                    position: "relative", overflow: "hidden",
                    width: "100%", height: 56, borderRadius: 16,
                    border: "none",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                    background: isFormValid
                      ? "linear-gradient(135deg, #128C7E 0%, #25D366 100%)"
                      : "#E5E7EB",
                    color: isFormValid ? "#fff" : C.muted,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 11,
                    fontSize: 15, fontWeight: 700,
                    letterSpacing: "0.02em",
                    boxShadow: isFormValid ? "0 10px 36px rgba(18,140,126,0.42)" : "none",
                    transition: "background 0.3s, box-shadow 0.3s, color 0.3s",
                  }}
                >
                  {isFormValid && (
                    <motion.div
                      initial={{ x: "-130%" }}
                      whileHover={{ x: "130%" }}
                      transition={{ duration: 0.65, ease: "easeInOut" }}
                      style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <FaWhatsapp size={19} style={{ position: "relative", zIndex: 1 }} />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {isFormValid
                      ? `Confirm Order · ₹${grandTotal}`
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
