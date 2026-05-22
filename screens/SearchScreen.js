function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate ke results screen (dalam Stack)
      navigation.navigate("SearchTab", {
        screen: "SearchResults",
        params: { query: searchQuery },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        🔍 Search
      </Text>
      <TextInput
        placeholder="Search destination..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 14,
        }}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={{
          backgroundColor: "#00b894",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}
