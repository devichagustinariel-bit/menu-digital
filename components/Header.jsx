export default function Header({ restaurant }) {
  return (
    <div style={styles.container}>
      <div style={styles.banner}></div>

      <div style={styles.infoContainer}>
        <img src={restaurant.logo} alt="logo" style={styles.logo} />

        <div>
          <h1 style={styles.name}>{restaurant.name}</h1>
          <p style={styles.details}>{restaurant.address}</p>
          <p style={styles.open}>🟢 Abierto ahora</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  banner: {
    height: 140,
    backgroundImage: "url('/banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  infoContainer: {
    display: "flex",
    gap: 15,
    padding: 15,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 12,
    objectFit: "cover",
  },
  name: {
    margin: 0,
    fontSize: 22,
  },
  details: {
    margin: 0,
    color: "#666",
    fontSize: 14,
  },
  open: {
    margin: 0,
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
};