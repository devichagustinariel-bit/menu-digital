// ============================================================
// types/database.ts
// Tipos TypeScript que reflejan el schema de Supabase
// ============================================================

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

// ---- PLANS ----
export interface Plan {
  id: string
  name: 'basic' | 'pro' | 'enterprise'
  display_name: string
  price_monthly: number
  max_products: number
  max_categories: number
  has_promotions: boolean
  has_qr_code: boolean
  has_custom_domain: boolean
  has_analytics: boolean
  is_active: boolean
  created_at: string
}

// ---- SCHEDULE ----
export interface ScheduleDay {
  day: string
  open: string
  close: string
  is_open: boolean
}

// ---- RESTAURANT ----
export interface Restaurant {
  id: string
  slug: string
  name: string
  description: string | null
  logo_url: string | null
  cover_url: string | null
  phone: string | null
  whatsapp: string | null
  address: string | null
  city: string | null
  country: string
  currency: string
  currency_symbol: string
  timezone: string
  schedule: ScheduleDay[]
  delivery_enabled: boolean
  pickup_enabled: boolean
  delivery_fee: number
  min_order: number
  estimated_time_min: number
  estimated_time_max: number
  is_active: boolean
  is_open: boolean
  plan_id: string | null
  created_at: string
  updated_at: string
}

// ---- SUBSCRIPTION ----
export interface Subscription {
  id: string
  restaurant_id: string
  plan_id: string
  status: 'trial' | 'active' | 'past_due' | 'cancelled'
  trial_ends_at: string | null
  current_period_start: string
  current_period_end: string
  cancelled_at: string | null
  payment_method: string | null
  external_id: string | null
  created_at: string
  updated_at: string
}

// ---- RESTAURANT USER ----
export interface RestaurantUser {
  id: string
  user_id: string
  restaurant_id: string
  role: 'owner' | 'manager' | 'staff'
  is_active: boolean
  created_at: string
}

// ---- CATEGORY ----
export interface Category {
  id: string
  restaurant_id: string
  name: string
  description: string | null
  emoji: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ---- PRODUCT ----
export interface Product {
  id: string
  restaurant_id: string
  category_id: string | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_active: boolean
  is_featured: boolean
  sort_order: number
  preparation_time: number | null
  allergens: string[] | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

// Product con categoría y opciones (para el menú)
export interface ProductWithDetails extends Product {
  categories?: Category
  option_groups?: OptionGroupWithOptions[]
}

// ---- OPTION GROUP ----
export interface OptionGroup {
  id: string
  restaurant_id: string
  product_id: string
  name: string
  is_required: boolean
  min_selections: number
  max_selections: number
  sort_order: number
  created_at: string
}

export interface OptionGroupWithOptions extends OptionGroup {
  product_options: ProductOption[]
}

// ---- PRODUCT OPTION ----
export interface ProductOption {
  id: string
  option_group_id: string
  restaurant_id: string
  name: string
  price_modifier: number
  is_active: boolean
  sort_order: number
  created_at: string
}

// ---- PROMOTION ----
export interface Promotion {
  id: string
  restaurant_id: string
  name: string
  description: string | null
  image_url: string | null
  original_price: number | null
  promo_price: number
  discount_percent: number | null
  tag: string | null
  valid_from: string
  valid_until: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// ---- CART ----
export interface CartItem {
  product: Product
  quantity: number
  selected_options: SelectedOption[]
  notes: string
  unit_price: number  // precio base + modificadores de opciones
}

export interface SelectedOption {
  group_id: string
  group_name: string
  option_id: string
  option_name: string
  price_modifier: number
}

// ---- ORDER ----
export type OrderType = 'delivery' | 'pickup' | 'table'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type PaymentMethod = 'efectivo' | 'transferencia' | 'mercadopago' | 'tarjeta'

export interface Order {
  id: string
  restaurant_id: string
  customer_name: string
  customer_phone: string | null
  customer_address: string | null
  customer_notes: string | null
  order_type: OrderType
  table_number: string | null
  payment_method: PaymentMethod | null
  subtotal: number
  delivery_fee: number
  discount: number
  total: number
  status: OrderStatus
  items_snapshot: Json
  whatsapp_sent: boolean
  whatsapp_sent_at: string | null
  created_at: string
  updated_at: string
}

// ---- ORDER ITEM ----
export interface OrderItem {
  id: string
  order_id: string
  restaurant_id: string
  product_id: string | null
  product_name: string
  unit_price: number
  quantity: number
  subtotal: number
  selected_options: Json
  notes: string | null
  created_at: string
}

// ---- CREATE ORDER PAYLOAD ----
export interface CreateOrderPayload {
  restaurant_id: string
  customer_name: string
  customer_phone?: string
  customer_address?: string
  customer_notes?: string
  order_type: OrderType
  table_number?: string
  payment_method?: PaymentMethod
  items: CartItem[]
  delivery_fee: number
}

// ---- WHATSAPP MESSAGE ----
export interface WhatsAppOrderMessage {
  restaurant: Pick<Restaurant, 'whatsapp' | 'name' | 'currency_symbol'>
  order: CreateOrderPayload
  total: number
}