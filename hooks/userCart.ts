// ============================================================
// hooks/useCart.ts
// Manejo del carrito con localStorage para persistencia
// ============================================================
'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CartItem, Product, SelectedOption } from '@/types/database'

const CART_STORAGE_KEY = 'cart_items'

function calculateItemPrice(product: Product, selectedOptions: SelectedOption[]): number {
  const optionsTotal = selectedOptions.reduce((acc, opt) => acc + opt.price_modifier, 0)
  return product.price + optionsTotal
}

export function useCart(restaurantId: string) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${CART_STORAGE_KEY}_${restaurantId}`)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Error loading cart:', e)
    }
    setIsLoaded(true)
  }, [restaurantId])

  // Persistir en localStorage cuando cambia el carrito
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(
        `${CART_STORAGE_KEY}_${restaurantId}`,
        JSON.stringify(items)
      )
    } catch (e) {
      console.error('Error saving cart:', e)
    }
  }, [items, restaurantId, isLoaded])

  // Agregar item al carrito
  const addItem = useCallback((
    product: Product,
    quantity: number,
    selectedOptions: SelectedOption[],
    notes: string
  ) => {
    const unit_price = calculateItemPrice(product, selectedOptions)

    setItems(prev => {
      // Buscar si ya existe el mismo producto con las mismas opciones
      const existingIndex = prev.findIndex(item =>
        item.product.id === product.id &&
        JSON.stringify(item.selected_options) === JSON.stringify(selectedOptions) &&
        item.notes === notes
      )

      if (existingIndex >= 0) {
        // Incrementar cantidad
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      // Agregar nuevo item
      return [...prev, { product, quantity, selected_options: selectedOptions, notes, unit_price }]
    })
  }, [])

  // Actualizar cantidad de un item
  const updateQuantity = useCallback((index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index)
      return
    }
    setItems(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity }
      return updated
    })
  }, [])

  // Eliminar item
  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Limpiar carrito
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // Totales calculados
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)

  return {
    items,
    totalItems,
    subtotal,
    isLoaded,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }
}