import Tienda from "@/components/Tienda";

export default function Home() {
  const categorias = [
    { id: 1, nombre: "Promos" },
    { id: 2, nombre: "Hamburguesas" },
    { id: 3, nombre: "Bebidas" },
  ];

  const productos = [
    {
      id: 1,
      nombre: "Burger Clásica",
      descripcion: "Carne, queso, lechuga y tomate",
      precio: 3500,
      imagen_url: "https://via.placeholder.com/300",
      categoria_id: 2,
    },
    {
      id: 2,
      nombre: "Combo Burger",
      descripcion: "Burger + papas + bebida",
      precio: 5500,
      imagen_url: "https://via.placeholder.com/300",
      categoria_id: 1,
    },
    {
      id: 3,
      nombre: "Coca Cola",
      descripcion: "500ml",
      precio: 1500,
      imagen_url: "https://via.placeholder.com/300",
      categoria_id: 3,
    },
  ];

  return <Tienda categorias={categorias} productos={productos} />;
}