import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const data = await req.json()

  console.log('DATA QUE LLEGA:', data)

const { error } = await supabase.from('pedidos').insert([
  {
    cliente_nombre: data.cliente_nombre,
    cliente_telefono: data.cliente_telefono,
    cliente_direccion: data.cliente_direccion,
    tipo_entrega: data.tipo_entrega,
    tipo_pedido: data.tipo_entrega, // <-- agregar esto
    metodo_pago: data.metodo_pago,
    subtotal: data.total,
    total: data.total,
    carrito: data.carrito,
    estado: 'pendiente'
  }
])

  if (error) {
    console.log('ERROR SUPABASE:', error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  console.log('PEDIDO GUARDADO OK')

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}