// App.js — Travel App (Aesthetic Blue & Animated Shimmer)
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 44) / 2;

// ======= 1. STATE MANAGEMENT (CONTEXT) =======
const TravelContext = createContext();

const travelData = [
  {
    id: "1",
    name: "Nusa Penida",
    location: "Bali, Indonesia",
    description:
      "Surga tersembunyi dengan tebing karang raksasa dan pantai berpasir putih dengan air laut biru kristal yang memukau.",
    rating: "4.9",
    image:
      "https://handluggageonly.co.uk/wp-content/uploads/2018/03/6I9A4430.jpg",
  },
  {
    id: "2",
    name: "Malioboro & Candi",
    location: "Yogyakarta, Indonesia",
    description:
      "Jelajahi keindahan budaya Jawa yang kental, kuliner legendaris, dan kemegahan candi bersejarah di malam hari.",
    rating: "4.8",
    image:
      "https://thumbs.dreamstime.com/b/malioboro-jogja-indonesia-java-island-malioboro-jogja-indonesia-428084709.jpg",
  },
  {
    id: "3",
    name: "Hutan Bambu Arashiyama",
    location: "Kyoto, Jepang",
    description:
      "Berjalan tenang menyusuri jalan setapak di tengah rimbunnya hutan bambu hijau yang menjulang tinggi secara estetik.",
    rating: "4.9",
    image:
      "https://www.sommertage.com/wp-content/uploads/2019/09/Kyoto-Japan-Tipps.jpg",
  },
  {
    id: "4",
    name: "Desa Oia Santorini",
    location: "Santorini, Yunani",
    description:
      "Pemandangan spektakuler rumah putih berkubah biru di atas tebing yang langsung menghadap ke birunya Laut Aegea.",
    rating: "4.7",
    image:
      "https://img.freepik.com/premium-photo/europe-summer-destination-traveling-concept-sunset-scenic-famous-landscape-santorini-island-oia_663265-1095.jpg",
  },
  {
    id: "5",
    name: "Menara Eiffel",
    location: "Paris, Prancis",
    description:
      "Ikon romantis dunia. Nikmati suasana taman yang indah di siang hari dan kerlap-kerlip lampu menara di malam hari.",
    rating: "4.6",
    image:
      "https://images.squarespace-cdn.com/content/v1/5980e801d482e93f58785fef/1539557352404-ASZSHL5C2XX9YGH9KFJO/adriftaesthetic_paris_france_eiffeltower3.jpg",
  },
  {
    id: "6",
    name: "Lampu Times Square",
    location: "New York, USA",
    description:
      "Pusat hiburan yang tak pernah tidur, dikelilingi oleh papan reklame neon raksasa yang menyala terang sepanjang malam.",
    rating: "4.5",
    image:
      "https://content1.getnarrativeapp.com/static/1191d27a-a3e2-4969-836e-95954648793e/newyork-travel-destination-photography-phosart.jpg?w=500",
  },
];

export function TravelProvider({ children }) {
  // Favorites dimulai sebagai array KOSONG sesuai permintaan
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id)); // Hapus jika sudah ada
    } else {
      setFavorites([...favorites, id]); // Tambah jika belum ada
    }
  };

  return (
    <TravelContext.Provider
      value={{ destinations: travelData, favorites, toggleFavorite }}
    >
      {children}
    </TravelContext.Provider>
  );
}

// ======= 2. ANIMASI KILAT BIRU (BLUE SHIMMER) =======
function BlueShimmerBackground() {
  const moveAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 3500, // Kecepatan kilat
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = moveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width * 1.5],
  });

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Background dasar biru sangat muda */}
      <View style={{ flex: 1, backgroundColor: "#F0F8FF" }} />
      {/* Efek kilat biru */}
      <Animated.View
        style={[
          styles.shimmerFlash,
          { transform: [{ translateX }, { skewX: "-30deg" }] },
        ]}
      />
    </View>
  );
}

// ======= 3. KOMPONEN KARTU WISATA =======
function TravelCard({ item, navigation }) {
  const { favorites, toggleFavorite } = useContext(TravelContext);
  const isFav = favorites.includes(item.id);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      // Saat diklik, langsung menuju halaman Detail dan membawa data wisata
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={isFav ? "heart" : "heart-outline"}
          size={22}
          color={isFav ? "#e74c3c" : "#fff"}
        />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.cardLocation} numberOfLines={1}>
          {item.location}
        </Text>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          {/* Bintang Rating */}
          <Ionicons name="star" size={14} color="#f1c40f" />
          <Ionicons name="star" size={14} color="#f1c40f" />
          <Ionicons name="star" size={14} color="#f1c40f" />
          <Ionicons name="star" size={14} color="#f1c40f" />
          <Ionicons name="star-half" size={14} color="#f1c40f" />
          <Text style={styles.ratingText}> {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ======= 4. HALAMAN APLIKASI =======

// --- A. HOME EXPLORE ---
function HomeScreen({ navigation }) {
  const { destinations } = useContext(TravelContext);

  return (
    <View style={styles.screen}>
      <BlueShimmerBackground />
      <View style={styles.headerBox}>
        <Text style={styles.headerSubtitle}>Jelajahi Dunia</Text>
        <Text style={styles.headerTitle}>Destinasi Pilihan ✈️</Text>
      </View>

      <FlatList
        data={destinations}
        renderItem={({ item }) => (
          <TravelCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// --- B. DETAIL SCREEN ---
function DetailScreen({ route, navigation }) {
  const { item } = route.params; // Menerima data dari kartu yang diklik
  const { favorites, toggleFavorite } = useContext(TravelContext);
  const isFav = favorites.includes(item.id);

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Image source={{ uri: item.image }} style={styles.detailImage} />

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.detailSheet}>
          <View style={styles.detailRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailLoc}>{item.location}</Text>
              <Text style={styles.detailName}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={32}
                color={isFav ? "#e74c3c" : "#bdc3c7"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.detailRatingBox}>
            <Ionicons name="star" size={20} color="#f1c40f" />
            <Text style={styles.detailRatingText}>
              {" "}
              {item.rating} Rating Wisatawan
            </Text>
          </View>

          <Text style={styles.detailDescTitle}>Keterangan Wisata</Text>
          <Text style={styles.detailDescText}>{item.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// --- C. SEARCH SCREEN (Sudah Diperbaiki) ---
function SearchScreen({ navigation }) {
  const { destinations } = useContext(TravelContext);
  const [searchText, setSearchText] = useState("");

  // Logika pencarian yang akan langsung memfilter data saat diketik
  const searchResults = destinations.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <View style={styles.screen}>
      <BlueShimmerBackground />
      <View style={styles.headerBox}>
        <Text style={styles.headerSubtitle}>Mencari Tujuan?</Text>
        <Text style={styles.headerTitle}>Cari Wisata 🔍</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color="#0984e3" />
        <TextInput
          style={styles.searchInput}
          placeholder="Ketik nama daerah atau wisata..."
          placeholderTextColor="#7f8c8d"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {searchText === "" ? (
        <View style={styles.emptyBox}>
          <Ionicons name="compass-outline" size={60} color="#74b9ff" />
          <Text style={styles.emptyText}>
            Mulai ketik untuk mencari wisata impianmu.
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TravelCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="sad-outline" size={60} color="#ff7675" />
              <Text style={styles.emptyText}>Wisata tidak ditemukan.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

// --- D. FAVORITES SCREEN (Kosong di awal) ---
function FavoritesScreen({ navigation }) {
  const { destinations, favorites } = useContext(TravelContext);

  // Mengambil hanya data yang ID-nya ada di dalam array favorites
  const favItems = destinations.filter((d) => favorites.includes(d.id));

  return (
    <View style={styles.screen}>
      <BlueShimmerBackground />
      <View style={styles.headerBox}>
        <Text style={styles.headerSubtitle}>Koleksi Impian</Text>
        <Text style={styles.headerTitle}>Favorit Saya ❤️</Text>
      </View>

      {favItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="heart-half-outline" size={70} color="#74b9ff" />
          <Text
            style={[
              styles.emptyText,
              { fontSize: 16, fontWeight: "bold", color: "#0984e3" },
            ]}
          >
            Belum ada wisata favorit.
          </Text>
          <Text style={styles.emptyText}>
            Silakan kembali ke Explore dan klik ikon hati untuk menambahkan
            wisata ke sini!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favItems}
          renderItem={({ item }) => (
            <TravelCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

// ======= 5. PENGATURAN NAVIGASI =======
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack untuk setiap tab agar bisa mengklik Detail dari mana saja
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const FavStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavMain" component={FavoritesScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Explore") iconName = "compass";
          if (route.name === "Search") iconName = "search";
          if (route.name === "Favorites") iconName = "heart";
          return <Ionicons name={iconName} size={size + 2} color={color} />;
        },
        tabBarActiveTintColor: "#0984e3", // Warna biru saat tab aktif
        tabBarInactiveTintColor: "#b2bec3",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          position: "absolute",
          elevation: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
      })}
    >
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Favorites" component={FavStack} />
    </Tab.Navigator>
  );
}

// ======= 6. MAIN APP =======
export default function App() {
  return (
    <TravelProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </TravelProvider>
  );
}

// ======= 7. STYLING AESTHETIC BLUE =======
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F0F8FF", // AliceBlue background
  },
  shimmerFlash: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.4,
    backgroundColor: "rgba(116, 185, 255, 0.25)", // Kilat biru
  },
  headerBox: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#0984e3",
    fontWeight: "600",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90, // Jarak untuk menutupi absolute bottom tab
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#0984e3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: "100%",
    height: CARD_WIDTH * 1.1,
  },
  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 6,
    borderRadius: 20,
  },
  cardContent: {
    padding: 12,
  },
  cardLocation: {
    fontSize: 11,
    color: "#0984e3",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2d3436",
    marginTop: 4,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#636e72",
    marginLeft: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#e1f0ff",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#2d3436",
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 14,
    color: "#636e72",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  detailImage: {
    width: "100%",
    height: width * 0.9,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 30,
  },
  detailSheet: {
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: width,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLoc: {
    fontSize: 14,
    color: "#0984e3",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d3436",
    marginTop: 5,
  },
  detailRatingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff9c4",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 15,
  },
  detailRatingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f39c12",
    marginLeft: 5,
  },
  detailDescTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3436",
    marginTop: 25,
    marginBottom: 10,
  },
  detailDescText: {
    fontSize: 15,
    color: "#636e72",
    lineHeight: 24,
  },
});
