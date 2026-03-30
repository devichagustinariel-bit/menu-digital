// ============================================================
// lib/whatsapp.ts
// Genera el link y mensaje de WhatsApp para el pedido
// ============================================================
import type { CartItem, Restaurant, OrderType, PaymentMethod } from '@/types/database'

interface WhatsAppOrderParams {
  restaurant: Restaurant
  items: CartItem[]
  orderType: OrderType
  customerName: string
  customerAddress?: string
  paymentMethod?: PaymentMethod
  customerNotes?: string
}

export function buildWhatsAppMessage(params: WhatsAppOrderParams): string {
  const {
    restaurant,
    items,
    orderType,
    customerName,
    customerAddress,
    paymentMethod,
    customerNotes,
  } = params

  const sym = restaurant.currency_symbol || '$'

  // Calcular totales
  const subtotal = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
  const deliveryFee = orderType === 'delivery' ? restaurant.delivery_fee : 0
  const total = subtotal + deliveryFee

  // Tipo de pedido
  const orderTypeLabel: Record<OrderType, string> = {
    delivery: '🛵 Delivery',
    pickup: '🏃 Retiro en local',
    table: '🪑 En mesa',
  }

  // Método de pago
  const paymentLabel: Record<PaymentMethod, string> = {
    efectivo: '💵 Efectivo',
    transferencia: '🏦 Transferencia',
    mercadopago: '💳 MercadoPago',
    tarjeta: '💳 Tarjeta',
  }

  // Armar líneas de productos
  const itemLines = items.map(item => {
    let line = `▸ ${item.quantity}x ${item.product.name} — ${sym}${(item.unit_price * item.quantity).toLocaleString('es-AR')}`

    if (item.selected_options.length > 0) {
      const optionsByGroup = item.selected_options.reduce<Record<string, string[]>>(
        (acc, opt) => {
          if (!acc[opt.group_name]) acc[opt.group_name] = []
          acc[opt.group_name].push(opt.option_name)
          return acc
        },
        {}
      )
      Object.entries(optionsByGroup).forEach(([groupName, optionNames]) => {
        line += `\n   • ${groupName}: ${optionNames.join(', ')}`
      })
    }

    if (item.notes) {
      line += `\n   📝 ${item.notes}`
    }

    return line
  })

  // Construir mensaje completo
  const lines = [
    `🍽️ *Nuevo pedido — ${restaurant.name}*`,
    ``,
    `👤 *Cliente:* ${customerName}`,
    `📦 *Tipo:* ${orderTypeLabel[orderType]}`,
    customerAddress ? `📍 *Dirección:* ${customerAddress}` : null,
    paymentMethod ? `💰 *Pago:* ${paymentLabel[paymentMethod]}` : null,
    ``,
    `*🛒 Detalle del pedido:*`,
    ...itemLines,
    ``,
    `─────────────────────`,
    subtotal !== total ? `Subtotal: ${sym}${subtotal.toLocaleString('es-AR')}` : null,
    deliveryFee > 0 ? `Envío: ${sym}${deliveryFee.toLocaleString('es-AR')}` : null,
    `*TOTAL: ${sym}${total.toLocaleString('es-AR')}*`,
    `─────────────────────`,
    customerNotes ? `\n📝 *Notas:* ${customerNotes}` : null,
    ``,
    `_Pedido enviado desde menú digital_`,
  ]

  return lines.filter(Boolean).join('\n')
}

export function buildWhatsAppUrl(
  whatsappNumber: string,
  message: string
): string {
  // Limpiar el número (solo dígitos)
  const cleanNumber = whatsappNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

export function sendWhatsAppOrder(params: WhatsAppOrderParams): void {
  if (!params.restaurant.whatsapp) {
    console.error('El restaurante no tiene número de WhatsApp configurado')
    return
  }

  const message = buildWhatsAppMessage(params)
  const url = buildWhatsAppUrl(params.restaurant.whatsapp, message)
  window.open(url, '_blank')
}