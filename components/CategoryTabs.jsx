export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            ...styles.tab,
            backgroundColor: selected === cat.id ? "#000" : "#eee",
            color: selected === cat.id ? "#fff" : "#000",
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    overflowX: "auto",
    gap: 10,
    padding: 10,
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  tab: {
    border: "none",
    padding: "8px 14px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontWeight: "bold",
  },
};