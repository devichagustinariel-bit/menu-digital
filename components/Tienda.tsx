"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/* ─── DATA ───────────────────────────────────────────────── */

const promos = [
  {
    id: 1,
    nombre: "Combo Hamburguesa Clásica",
    descripcion: "Hamburguesa con queso, lechuga, tomate + papas fritas + bebida",
    precio: 3200,
    precioAntes: 4500,
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    tag: "🔥 Más pedido",
    descuento: 29,
  },
  {
    id: 2,
    nombre: "2×1 Empanadas",
    descripcion: "12 empanadas al precio de 6. Elegí tus gustos favoritos.",
    precio: 2400,
    precioAntes: 4800,
    imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
    tag: "⚡ Oferta flash",
    descuento: 50,
  },
  {
    id: 3,
    nombre: "Tabla Parrillera",
    descripcion: "Chorizo, morcilla, vacío y provoleta con chimichurri casero.",
    precio: 5800,
    precioAntes: 7200,
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    tag: "🥩 Parrilla",
    descuento: 19,
  },
];

const categorias = [
  { id: "promos", label: "🔥 Promos", active: true },
  { id: "hamburguesas", label: "🍔 Burgers" },
  { id: "empanadas", label: "🥟 Empanadas" },
  { id: "parrilla", label: "🥩 Parrilla" },
  { id: "bebidas", label: "🥤 Bebidas" },
  { id: "postres", label: "🍮 Postres" },
];

const gustosOpciones = ["Carne", "Pollo", "Jamón y queso", "Verdura", "Humita"];

/* ─── COMPONENT ──────────────────────────────────────────── */

export default function Tienda() {
  const [producto, setProducto] = useState<any>(null);
  const [cantidad, setCantidad] = useState(1);
  const [gusto, setGusto] = useState("Carne");
  const [nota, setNota] = useState("");
  const [carrito, setCarrito] = useState<any[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState("promos");

  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  const agregarAlCarrito = () => {
    setCarrito((prev) => [
      ...prev,
      { ...producto, gusto, nota, cantidad },
    ]);
    setProducto(null);
    setCantidad(1);
    setNota("");
  };

  const abrirProducto = (p: any) => {
    setProducto(p);
    setCantidad(1);
    setGusto(gustosOpciones[0]);
    setNota("");
  };

  return (
    <div style={s.root}>

      {/* ── COVER ── */}
      <div style={s.cover}>
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"
          alt="portada"
          style={s.coverImg}
        />
        <div style={s.coverGradient} />

        {/* Top bar */}
        <div style={s.topBar}>
          <button style={s.iconBtn}>←</button>
          <button style={s.iconBtn}>♡</button>
        </div>
      </div>

      {/* ── IDENTITY CARD ── */}
      <div style={s.identityCard}>
        <div style={s.logoWrap}>
          <div style={s.logo}>🥩</div>
        </div>

        <div style={s.identityBody}>
          <div style={s.nameRow}>
            <h1 style={s.storeName}>La Parrilla de Juan</h1>
            <span style={s.verifiedBadge}>✓</span>
          </div>
          <p style={s.storeHandle}>@laparrilladejuan · Parrilla argentina</p>

          <div style={s.metaRow}>
            <div style={s.metaChip}>
              <span style={s.metaIcon}>⭐</span>
              <span>4.8 <span style={s.metaSub}>(320)</span></span>
            </div>
            <div style={s.metaChip}>
              <span style={s.metaIcon}>🕒</span>
              <span>25–35 min</span>
            </div>
            <div style={s.metaChip}>
              <span style={s.metaIcon}>🛵</span>
              <span>$350 envío</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <div style={s.infoStrip}>
        <span style={s.infoItem}>📍 Av. Corrientes 1234</span>
        <span style={s.dot} />
        <span style={s.infoItem}>Lun–Dom: 11:00 – 23:00</span>
        <span style={s.dot} />
        <span style={s.infoItem}>Mín. $1500</span>
      </div>

      {/* ── CATEGORÍAS ── */}
      <div style={s.catScroll}>
        {categorias.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoriaActiva(c.id)}
            style={{
              ...s.catBtn,
              ...(categoriaActiva === c.id ? s.catBtnActive : {}),
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── SECTION TITLE ── */}
      <div style={s.sectionHeader}>
        <span style={s.sectionTitle}>Promociones del día</span>
        <span style={s.sectionSub}>Tiempo limitado</span>
      </div>

      {/* ── PROMO CARDS ── */}
      <div style={s.promoScroll}>
        {promos.map((p) => (
          <div key={p.id} style={s.promoCard} onClick={() => abrirProducto(p)}>
            <div style={s.promoImgWrap}>
              <img src={p.imagen} alt={p.nombre} style={s.promoImg} />
              <div style={s.promoTag}>{p.tag}</div>
              <div style={s.discountBadge}>-{p.descuento}%</div>
            </div>
            <div style={s.promoBody}>
              <p style={s.promoName}>{p.nombre}</p>
              <p style={s.promoDesc}>{p.descripcion}</p>
              <div style={s.priceRow}>
                <span style={s.price}>${p.precio.toLocaleString()}</span>
                <span style={s.oldPrice}>${p.precioAntes.toLocaleString()}</span>
              </div>
              <button style={s.addBtn}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── CARRITO FLOTANTE ── */}
      {totalItems > 0 && (
        <div style={s.floatingCart}>
          <div style={s.cartBadge}>{totalItems}</div>
          <span style={s.cartLabel}>Ver mi pedido</span>
          <span style={s.cartTotal}>
            ${carrito.reduce((a, i) => a + i.precio * i.cantidad, 0).toLocaleString()}
          </span>
        </div>
      )}

      {/* ── MODAL ── */}
      {producto && (
        <div style={s.overlay} onClick={() => setProducto(null)}>
          <div style={s.sheet} onClick={(e) => e.stopPropagation()}>

            {/* Pill handle */}
            <div style={s.sheetHandle} />

            {/* Close */}
            <button style={s.closeBtn} onClick={() => setProducto(null)}>✕</button>

            {/* Image */}
            <div style={s.sheetImgWrap}>
              <img src={producto.imagen} alt={producto.nombre} style={s.sheetImg} />
              <div style={s.sheetImgGrad} />
              <div style={s.sheetDiscount}>-{producto.descuento}%</div>
            </div>

            {/* Content */}
            <div style={s.sheetContent}>
              <h2 style={s.sheetTitle}>{producto.nombre}</h2>
              <p style={s.sheetDesc}>{producto.descripcion}</p>

              <div style={s.sheetPriceRow}>
                <span style={s.sheetPrice}>${producto.precio.toLocaleString()}</span>
                <span style={s.sheetOldPrice}>${producto.precioAntes.toLocaleString()}</span>
              </div>

              {/* Gustos */}
              <div style={s.optSection}>
                <div style={s.optHeader}>
                  <span style={s.optTitle}>Elegí tu gusto</span>
                  <span style={s.optRequired}>Requerido</span>
                </div>
                <div style={s.optGrid}>
                  {gustosOpciones.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGusto(g)}
                      style={{
                        ...s.optChip,
                        ...(gusto === g ? s.optChipActive : {}),
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div style={s.optSection}>
                <span style={s.optTitle}>Notas especiales</span>
                <textarea
                  placeholder="Ej: sin cebolla, bien cocido..."
                  style={s.textarea}
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={s.sheetFooter}>
              <div style={s.qtyRow}>
                <button
                  style={s.qtyBtn}
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                >−</button>
                <span style={s.qtyNum}>{cantidad}</span>
                <button
                  style={s.qtyBtn}
                  onClick={() => setCantidad(cantidad + 1)}
                >+</button>
              </div>

              <button style={s.confirmBtn} onClick={agregarAlCarrito}>
                Agregar · ${(producto.precio * cantidad).toLocaleString()}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────── */

const ORANGE = "#FF5733";
const ORANGE_DARK = "#E04820";
const BG = "#F7F7F8";
const WHITE = "#FFFFFF";
const GRAY1 = "#1A1A1A";
const GRAY2 = "#555";
const GRAY3 = "#999";
const GRAY4 = "#E8E8E8";

const s: Record<string, CSSProperties> = {
  root: {
    fontFamily: "'Nunito', 'Helvetica Neue', sans-serif",
    background: BG,
    minHeight: "100vh",
    maxWidth: 480,
    margin: "0 auto",
    paddingBottom: 100,
  },

  /* cover */
  cover: { position: "relative", height: 220 },
  coverImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  coverGradient: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,.55) 100%)",
  },
  topBar: {
    position: "absolute", top: 16, left: 16, right: 16,
    display: "flex", justifyContent: "space-between",
  },
  iconBtn: {
    width: 38, height: 38, borderRadius: "50%",
    background: "rgba(255,255,255,.9)",
    border: "none", fontSize: 18, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold",
  },

  /* identity */
  identityCard: {
    background: WHITE, marginTop: -24,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: "0 20px 20px",
    boxShadow: "0 -2px 16px rgba(0,0,0,.06)",
  },
  logoWrap: { marginTop: 16, marginBottom: 14 },
  logo: {
    width: 62, height: 62, borderRadius: 18,
    background: "#FFF3EC", border: `3px solid ${WHITE}`,
    boxShadow: "0 4px 16px rgba(0,0,0,.13)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 30,
  },
  identityBody: {},
  nameRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  storeName: { fontSize: 20, fontWeight: 700, color: GRAY1, margin: 0 },
  verifiedBadge: {
    width: 18, height: 18, borderRadius: "50%",
    background: "#00C46A", color: WHITE,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 10, fontWeight: 700, flexShrink: 0,
  },
  storeHandle: { fontSize: 13, color: GRAY3, margin: "0 0 16px", fontWeight: 400 },
  metaRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  metaChip: {
    display: "flex", alignItems: "center", gap: 4,
    background: BG, borderRadius: 20,
    padding: "6px 12px", fontSize: 13, color: GRAY2, fontWeight: 500,
  },
  metaIcon: { fontSize: 14 },
  metaSub: { color: GRAY3, fontWeight: 400 },

  /* info strip */
  infoStrip: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 20px 12px", background: WHITE,
    borderTop: `1px solid ${GRAY4}`,
    fontSize: 12, color: GRAY3, flexWrap: "wrap", fontWeight: 400,
  },
  infoItem: {},
  dot: { width: 3, height: 3, borderRadius: "50%", background: GRAY4 },

  /* categorías */
  catScroll: {
    display: "flex", gap: 8, overflowX: "auto",
    padding: "16px 20px 14px",
    scrollbarWidth: "none",
  },
  catBtn: {
    whiteSpace: "nowrap", padding: "8px 16px",
    borderRadius: 24, border: `1.5px solid ${GRAY4}`,
    background: WHITE, fontSize: 13, fontWeight: 500,
    cursor: "pointer", color: GRAY2,
    transition: "all .15s",
  },
  catBtnActive: {
    background: ORANGE, color: WHITE,
    border: `1.5px solid ${ORANGE}`,
    fontWeight: 600,
  },

  /* section */
  sectionHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "4px 20px 14px",
  },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: GRAY1 },
  sectionSub: { fontSize: 12, color: ORANGE, fontWeight: 600 },

  /* promo cards */
  promoScroll: {
    display: "flex", gap: 14, overflowX: "auto",
    padding: "0 20px 20px",
    scrollbarWidth: "none",
  },
  promoCard: {
    minWidth: 210, borderRadius: 18,
    background: WHITE, overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,.08)",
    cursor: "pointer", flexShrink: 0,
    transition: "transform .15s",
  },
  promoImgWrap: { position: "relative" },
  promoImg: { width: "100%", height: 130, objectFit: "cover", display: "block" },
  promoTag: {
    position: "absolute", top: 8, left: 8,
    background: "rgba(0,0,0,.55)", color: WHITE,
    fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
    backdropFilter: "blur(4px)",
  },
  discountBadge: {
    position: "absolute", top: 8, right: 8,
    background: ORANGE, color: WHITE,
    fontSize: 11, fontWeight: 800, padding: "3px 7px", borderRadius: 20,
  },
  promoBody: { padding: "12px 14px 14px", position: "relative" },
  promoName: { fontSize: 14, fontWeight: 800, color: GRAY1, margin: "0 0 4px" },
  promoDesc: { fontSize: 12, color: GRAY3, margin: "0 0 10px", lineHeight: 1.4 },
  priceRow: { display: "flex", alignItems: "center", gap: 6 },
  price: { fontSize: 15, fontWeight: 800, color: GRAY1 },
  oldPrice: { fontSize: 12, color: GRAY3, textDecoration: "line-through" },
  addBtn: {
    position: "absolute", bottom: 12, right: 12,
    width: 32, height: 32, borderRadius: "50%",
    background: ORANGE, color: WHITE,
    border: "none", fontSize: 20, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    lineHeight: 1,
  },

  /* floating cart */
  floatingCart: {
    position: "fixed", bottom: 20, left: "50%",
    transform: "translateX(-50%)",
    background: ORANGE, color: WHITE,
    borderRadius: 20, padding: "14px 24px",
    display: "flex", alignItems: "center", gap: 14,
    boxShadow: "0 8px 30px rgba(255,87,51,.45)",
    zIndex: 100, minWidth: 280, cursor: "pointer",
  },
  cartBadge: {
    width: 26, height: 26, borderRadius: "50%",
    background: WHITE, color: ORANGE,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 800,
  },
  cartLabel: { flex: 1, fontWeight: 700, fontSize: 15 },
  cartTotal: { fontWeight: 800, fontSize: 15 },

  /* overlay + sheet */
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,.5)",
    zIndex: 200,
    display: "flex", alignItems: "flex-end",
    backdropFilter: "blur(2px)",
  },
  sheet: {
    width: "100%", maxWidth: 480, margin: "0 auto",
    background: WHITE,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    maxHeight: "92vh", overflowY: "auto",
    position: "relative",
  },
  sheetHandle: {
    width: 36, height: 4, borderRadius: 4,
    background: GRAY4, margin: "12px auto 0",
  },
  closeBtn: {
    position: "absolute", top: 14, right: 16,
    width: 32, height: 32, borderRadius: "50%",
    background: GRAY4, border: "none",
    fontSize: 14, cursor: "pointer", zIndex: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: GRAY2, fontWeight: 700,
  },
  sheetImgWrap: { position: "relative", marginTop: 8 },
  sheetImg: { width: "100%", height: 220, objectFit: "cover", display: "block" },
  sheetImgGrad: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.8))",
  },
  sheetDiscount: {
    position: "absolute", top: 12, right: 12,
    background: ORANGE, color: WHITE,
    fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 20,
  },

  sheetContent: { padding: "16px 20px 8px" },
  sheetTitle: { fontSize: 20, fontWeight: 800, color: GRAY1, margin: "0 0 6px" },
  sheetDesc: { fontSize: 14, color: GRAY2, margin: "0 0 12px", lineHeight: 1.5 },
  sheetPriceRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 },
  sheetPrice: { fontSize: 22, fontWeight: 900, color: GRAY1 },
  sheetOldPrice: { fontSize: 15, color: GRAY3, textDecoration: "line-through" },

  optSection: { marginBottom: 20 },
  optHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  optTitle: { fontSize: 15, fontWeight: 800, color: GRAY1 },
  optRequired: {
    fontSize: 11, fontWeight: 700, color: ORANGE,
    background: "#FFF0EC", padding: "2px 8px", borderRadius: 20,
  },
  optGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  optChip: {
    padding: "8px 16px", borderRadius: 24,
    border: `1.5px solid ${GRAY4}`, background: WHITE,
    fontSize: 13, fontWeight: 600, cursor: "pointer", color: GRAY2,
  },
  optChipActive: {
    border: `1.5px solid ${ORANGE}`,
    background: "#FFF0EC", color: ORANGE,
  },
  textarea: {
    width: "100%", padding: "12px 14px",
    borderRadius: 14, border: `1.5px solid ${GRAY4}`,
    fontSize: 14, color: GRAY1, resize: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    outline: "none",
  },

  /* sheet footer */
  sheetFooter: {
    padding: "16px 20px",
    borderTop: `1px solid ${GRAY4}`,
    display: "flex", alignItems: "center", gap: 14,
    background: WHITE,
    position: "sticky", bottom: 0,
  },
  qtyRow: {
    display: "flex", alignItems: "center", gap: 14,
    background: BG, borderRadius: 30, padding: "6px 12px",
  },
  qtyBtn: {
    width: 30, height: 30, borderRadius: "50%",
    background: ORANGE, color: WHITE,
    border: "none", fontSize: 20, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    lineHeight: 1, fontWeight: 700,
  },
  qtyNum: { fontSize: 16, fontWeight: 800, color: GRAY1, minWidth: 20, textAlign: "center" },
  confirmBtn: {
    flex: 1, background: ORANGE,
    color: WHITE, border: "none",
    padding: "14px 0", borderRadius: 16,
    fontSize: 16, fontWeight: 800, cursor: "pointer",
    boxShadow: `0 6px 20px rgba(255,87,51,.35)`,
  },
};