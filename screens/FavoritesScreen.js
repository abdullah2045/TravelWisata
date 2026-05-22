function FavoritesScreen() {
  const favorites = [
    { id: 1, name: "Bali" },
    { id: 3, name: "Yogyakarta" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        ❤️ My Favorites
      </Text>
      {favorites.length === 0 ? (
        <Text style={{ color: "#999" }}>No favorites yet</Text>
      ) : (
        <View>
          {favorites.map((fav) => (
            <View
              key={fav.id}
              style={{
                backgroundColor: "#ffe8e8",
                padding: 12,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#d32f2f" }}
              >
                ❤️ {fav.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
