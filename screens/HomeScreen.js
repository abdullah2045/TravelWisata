// Sample destination data
const destinations = [
  {
    id: 1,
    name: "Bali",
    description: "Pulau dewata dengan pantai eksotis",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Jakarta",
    description: "Ibu kota dengan kehidupan malam seru",
    rating: 3.9,
  },
  {
    id: 3,
    name: "Yogyakarta",
    description: "Kota budaya dengan sejarah panjang",
    rating: 4.7,
  },
];

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: "#333",
          }}
        >
          Popular Destinations
        </Text>
        {destinations.map((dest) => (
          <TouchableOpacity
            key={dest.id}
            onPress={() => navigation.navigate("Detail", { destination: dest })} // ← Navigate + pass data
            style={{
              backgroundColor: "#f5f5f5",
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
              borderLeftWidth: 4,
              borderLeftColor: "#00b894",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
              {dest.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              {dest.description}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#00b894",
                marginTop: 4,
                fontWeight: "600",
              }}
            >
              ⭐ {dest.rating}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
