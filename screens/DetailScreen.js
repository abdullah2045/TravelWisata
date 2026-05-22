function DetailScreen({ route }) {
  const { destination } = route.params; // Extract dari params

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#00b894",
          marginBottom: 16,
        }}
      >
        📍 {destination.name}
      </Text>
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, color: "#333", lineHeight: 20 }}>
          {destination.description}
        </Text>
      </View>
      <View
        style={{ backgroundColor: "#fff9e6", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#f39c12" }}>
          Rating: {destination.rating} ⭐
        </Text>
      </View>
    </View>
  );
}
