export default function ProductCard({ product, addToCart }) {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />

      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>${product.price}</p>

        <button style={styles.button} onClick={() => addToCart(product)}>
          Agregar
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "flex",
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    objectFit: "cover",
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  name: {
    margin: 0,
    fontSize: 16,
  },
  price: {
    margin: "5px 0",
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: 8,
    cursor: "pointer",
  },
};