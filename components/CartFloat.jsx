export default function CartFloat({ cartCount, onOpen }) {
  if (cartCount === 0) return null;

  return (
    <div style={styles.container} onClick={onOpen}>
      🛒 Ver carrito ({cartCount})
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
};