// ============================================================
// app/[slug]/page.tsx
// ============================================================

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

// ---- SEO dinámico ----
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!restaurant) {
    return { title: 'Restaurante no encontrado' }
  }

  return {
    title: `${restaurant.name} — Menú Digital`,
    description:
      restaurant.description ||
      `Pedí en ${restaurant.name}. Menú online.`,
  }
}

// ---- PAGE ----
export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Restaurante
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !restaurant) {
    notFound()
  }

  // Categorías
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)

  // Productos
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('restaurant_id', restaurant.id)

  return (
    <div style={{ padding: 20 }}>
      <h1>{restaurant.name}</h1>

      <p>Slug: {slug}</p>

      <h2>Categorías</h2>
      <pre>{JSON.stringify(categories ?? [], null, 2)}</pre>

      <h2>Productos</h2>
      <pre>{JSON.stringify(products ?? [], null, 2)}</pre>
    </div>
  )
}