import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import ProductCard from "../components/ProductCard";
import NewsCard from "../components/NewsCard";
import CampusCard from "../components/CampusCard";
import { fetchCampuses, fetchNews, fetchProducts } from "../services/api";

const products = [
  {
    id: 1,
    title: "Schoolhoodie BA",
    description: "Warme hoodie met Busleyden Atheneum logo.",
    price: "EUR 35",
    priceNumber: 35,
    category: "Kleding",
    details: "Deze hoodie is ideaal voor schooldagen, uitstappen en sportieve activiteiten.",
    image: require("../assets/school.webp"),
  },
  {
    id: 2,
    title: "Drinkbus",
    description: "Herbruikbare drinkbus voor elke schooldag.",
    price: "EUR 12",
    priceNumber: 12,
    category: "Accessoires",
    details: "Een lichte drinkbus die gemakkelijk in je boekentas past.",
    image: require("../assets/school.webp"),
  },
  {
    id: 3,
    title: "Turnzak",
    description: "Praktische sportzak voor de lessen LO.",
    price: "EUR 15",
    priceNumber: 15,
    category: "Sport",
    details: "Handige turnzak voor sportkledij, schoenen en kleine spullen.",
    image: require("../assets/school.webp"),
  },
  {
    id: 4,
    title: "T-shirt BA",
    description: "Comfortabel T-shirt voor activiteiten op school.",
    price: "EUR 18",
    priceNumber: 18,
    category: "Kleding",
    details: "Een eenvoudig T-shirt met een herkenbare Busleyden stijl.",
    image: require("../assets/school.webp"),
  },
  {
    id: 5,
    title: "Totebag",
    description: "Stevige tas voor boeken en schoolmateriaal.",
    price: "EUR 10",
    priceNumber: 10,
    category: "Accessoires",
    details: "Handige draagtas voor elke dag op de campus.",
    image: require("../assets/school.webp"),
  },
  {
    id: 6,
    title: "Schriftenset",
    description: "Set met drie schriften voor de lessen.",
    price: "EUR 8",
    priceNumber: 8,
    category: "Schoolmateriaal",
    details: "Praktische schriften voor notities, taken en oefeningen.",
    image: require("../assets/school.webp"),
  },
  {
    id: 7,
    title: "Pennenset",
    description: "Set met blauwe en zwarte pennen.",
    price: "EUR 6",
    priceNumber: 6,
    category: "Schoolmateriaal",
    details: "Een kleine basisset die elke leerling kan gebruiken.",
    image: require("../assets/school.webp"),
  },
  {
    id: 8,
    title: "Sportshirt",
    description: "Licht shirt voor de lessen LO.",
    price: "EUR 20",
    priceNumber: 20,
    category: "Sport",
    details: "Sportshirt dat comfortabel zit tijdens sportactiviteiten.",
    image: require("../assets/school.webp"),
  },
  {
    id: 9,
    title: "Laptophoes",
    description: "Beschermhoes voor laptop of tablet.",
    price: "EUR 24",
    priceNumber: 24,
    category: "Tech",
    details: "Beschermt je toestel onderweg naar school.",
    image: require("../assets/school.webp"),
  },
  {
    id: 10,
    title: "Oortjes",
    description: "Handig voor digitale lessen en opdrachten.",
    price: "EUR 14",
    priceNumber: 14,
    category: "Tech",
    details: "Compacte oortjes voor video, audio en online lessen.",
    image: require("../assets/school.webp"),
  },
];

const news = [
  {
    id: 1,
    title: "Open campusdag",
    description: "Kom kennismaken met onze campussen en richtingen.",
    date: "12 mei 2026",
    category: "Events",
    content: "Tijdens de open campusdag kunnen leerlingen en ouders de school ontdekken, vragen stellen en de sfeer op de campussen voelen.",
    image: require("../assets/school.webp"),
  },
  {
    id: 2,
    title: "Nieuwe studiezoeker",
    description: "De studiezoeker helpt leerlingen sneller kiezen.",
    date: "20 april 2026",
    category: "School",
    content: "Met filters op interesse, campus en graad wordt het aanbod duidelijker voor toekomstige leerlingen.",
    image: require("../assets/school.webp"),
  },
  {
    id: 3,
    title: "Sportdag derde graad",
    description: "Een actieve dag met verschillende sporten.",
    date: "18 maart 2026",
    category: "Events",
    content: "De sportdag stond in teken van samenwerking, beweging en plezier tussen de leerlingen.",
    image: require("../assets/school.webp"),
  },
  {
    id: 4,
    title: "Project gezondheid",
    description: "Leerlingen werkten rond gezonde keuzes.",
    date: "5 maart 2026",
    category: "Projecten",
    content: "Het project combineerde theorie met praktische opdrachten rond voeding, beweging en welzijn.",
    image: require("../assets/school.webp"),
  },
  {
    id: 5,
    title: "Leerlingenraad start actie",
    description: "De leerlingenraad verzamelt ideeen voor school.",
    date: "14 februari 2026",
    category: "School",
    content: "Iedere campus kon voorstellen indienen om het schoolleven nog aangenamer te maken.",
    image: require("../assets/school.webp"),
  },
  {
    id: 6,
    title: "Wetenschapsweek",
    description: "Experimenten en workshops voor leerlingen.",
    date: "30 januari 2026",
    category: "Projecten",
    content: "Tijdens de wetenschapsweek leerden leerlingen onderzoekend werken in kleine teams.",
    image: require("../assets/school.webp"),
  },
];

const campuses = [
  {
    id: 1,
    name: "Botaniek",
    focus: "Gezondheid & wetenschap",
    address: "Augustijnenstraat 92, 2800 Mechelen",
    description: "Bij BA Botaniek draait alles rond gezondheid en wetenschap.",
    color: "#d94f8c",
  },
  {
    id: 2,
    name: "Caputsteen",
    focus: "Integraal & creatief",
    address: "Caputsteenstraat 51, 2800 Mechelen",
    description: "Bij BA Caputsteen is er veel aandacht voor creativiteit en brede vorming.",
    color: "#2f66b3",
  },
  {
    id: 3,
    name: "De Beemden",
    focus: "Buiten-gewoon leren",
    address: "Stuivenbergbaan 135, 2800 Mechelen",
    description: "Bij BA De Beemden draait alles rond buiten-gewoon leren.",
    color: "#57b6c9",
  },
  {
    id: 4,
    name: "Basisverpleegkunde",
    focus: "Verpleegkunde",
    address: "Jette en Mechelen",
    description: "Na je studie behaal je het diploma van gegradueerde in de verpleegkunde.",
    color: "#d94f8c",
  },
  {
    id: 5,
    name: "Nekkerspoel",
    focus: "Werken & leren",
    address: "Nekkerspoelstraat 74, 2800 Mechelen",
    description: "Bij BA Nekkerspoel draait alles rond werken en leren.",
    color: "#c8c94b",
  },
  {
    id: 6,
    name: "Pitzemburg",
    focus: "Kennis & onderzoek",
    address: "Bruul 129, 2800 Mechelen",
    description: "Bij BA Pitzemburg draait alles rond kennis en onderzoek.",
    color: "#a03c91",
  },
  {
    id: 7,
    name: "Stassart",
    focus: "Mens & welzijn",
    address: "Wollemarkt 36, 2800 Mechelen",
    description: "Bij BA Stassart draait alles rond mens en welzijn.",
    color: "#f0aa3c",
  },
  {
    id: 8,
    name: "Zandpoort",
    focus: "IT & ondernemen",
    address: "Zandpoortvest 9A, 2800 Mechelen",
    description: "Bij BA Zandpoort draait alles rond IT en ondernemen.",
    color: "#d94b3d",
  },
];

const HomeScreen = ({ navigation }) => {
  const [productsList, setProductsList] = useState(products);
  const [newsList, setNewsList] = useState(news);
  const [campusesList, setCampusesList] = useState(campuses);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [apiError, setApiError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [sortOption, setSortOption] = useState("name-asc");
  const [newsSearchText, setNewsSearchText] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("Alle");
  const [newsSortOption, setNewsSortOption] = useState("name-asc");
  const [showNews, setShowNews] = useState(true);

  const categories = ["Alle", ...new Set(productsList.map((product) => product.category))];
  const newsCategories = ["Alle", ...new Set(newsList.map((newsItem) => newsItem.category))];

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProductsList(data);
        setApiError("");
        setIsLoadingProducts(false);
      })
      .catch((error) => {
        setApiError(error.message);
        setIsLoadingProducts(false);
      });

    fetchNews()
      .then((data) => {
        setNewsList(data);
      })
      .catch(() => {});

    fetchCampuses()
      .then((data) => {
        setCampusesList(data);
      })
      .catch(() => {});
  }, []);

  const filteredProducts = productsList
    .filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    .filter((product) => {
      if (selectedCategory === "Alle") {
        return true;
      }

      return product.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.title.localeCompare(b.title);
      if (sortOption === "name-desc") return b.title.localeCompare(a.title);
      if (sortOption === "price-asc") return a.priceNumber - b.priceNumber;
      if (sortOption === "price-desc") return b.priceNumber - a.priceNumber;
      return 0;
    });

  const filteredNews = newsList
    .filter((newsItem) =>
      newsItem.title.toLowerCase().includes(newsSearchText.toLowerCase()),
    )
    .filter((newsItem) => {
      if (selectedNewsCategory === "Alle") {
        return true;
      }

      return newsItem.category === selectedNewsCategory;
    })
    .sort((a, b) => {
      if (newsSortOption === "name-asc") return a.title.localeCompare(b.title);
      if (newsSortOption === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.topBar}>
        <Text style={styles.brand}>Busleyden Atheneum</Text>
        <Text style={styles.smallText}>Mechelen</Text>
      </View>

      <Image source={require("../assets/home.png")} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Welkom bij BA</Text>
        <Text style={styles.text}>
          Een eenvoudige app voor producten, nieuws, campussen en de
          studiezoeker.
        </Text>

        <Button
          title="Open studiezoeker"
          color="#1f4432"
          onPress={() => navigation.navigate("StudyFinder")}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Webshop</Text>
        <Text style={styles.sectionText}>
          Zoek, filter en sorteer producten uit de schoolshop.
        </Text>
      </View>

      {isLoadingProducts ? (
        <Text style={styles.emptyText}>Producten laden...</Text>
      ) : null}

      {apiError ? (
        <Text style={styles.errorText}>{apiError}</Text>
      ) : null}

      <View style={styles.filterCard}>
        <Text style={styles.filterTitle}>Zoeken</Text>
        <TextInput
          placeholder="Zoek product..."
          placeholderTextColor="#8b7f76"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.search}
        />

        <Text style={styles.filterTitle}>Categorie</Text>
        <View style={styles.buttonRow}>
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.activeButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === category && styles.activeButtonText,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterTitle}>Sorteren</Text>
        <View style={styles.buttonRow}>
          <Pressable style={styles.sortButton} onPress={() => setSortOption("name-asc")}>
            <Text style={styles.sortButtonText}>Naam A-Z</Text>
          </Pressable>
          <Pressable style={styles.sortButton} onPress={() => setSortOption("name-desc")}>
            <Text style={styles.sortButtonText}>Naam Z-A</Text>
          </Pressable>
          <Pressable style={styles.sortButton} onPress={() => setSortOption("price-asc")}>
            <Text style={styles.sortButtonText}>Prijs laag</Text>
          </Pressable>
          <Pressable style={styles.sortButton} onPress={() => setSortOption("price-desc")}>
            <Text style={styles.sortButtonText}>Prijs hoog</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                product: product,
              })
            }
          />
        ))}
      </View>

      {filteredProducts.length === 0 ? (
        <Text style={styles.emptyText}>Geen producten gevonden.</Text>
      ) : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nieuws</Text>
        <Text style={styles.sectionText}>
          Zoek, filter en sorteer nieuwsartikelen.
        </Text>
      </View>

      <View style={styles.switchCard}>
        <Text style={styles.filterTitle}>Nieuws tonen</Text>
        <Switch
          value={showNews}
          onValueChange={setShowNews}
          trackColor={{ false: "#d1d5db", true: "#1f4432" }}
          thumbColor="#ffffff"
        />
      </View>

      {showNews ? (
        <>
          <View style={styles.filterCard}>
            <Text style={styles.filterTitle}>Nieuws zoeken</Text>
            <TextInput
              placeholder="Zoek nieuws..."
              placeholderTextColor="#8b7f76"
              value={newsSearchText}
              onChangeText={setNewsSearchText}
              style={styles.search}
            />

            <Text style={styles.filterTitle}>Nieuws categorie</Text>
            <View style={styles.buttonRow}>
              {newsCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.filterButton,
                    selectedNewsCategory === category && styles.activeButton,
                  ]}
                  onPress={() => setSelectedNewsCategory(category)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedNewsCategory === category && styles.activeButtonText,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.filterTitle}>Nieuws sorteren</Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.sortButton} onPress={() => setNewsSortOption("name-asc")}>
                <Text style={styles.sortButtonText}>Naam A-Z</Text>
              </Pressable>
              <Pressable style={styles.sortButton} onPress={() => setNewsSortOption("name-desc")}>
                <Text style={styles.sortButtonText}>Naam Z-A</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.grid}>
            {filteredNews.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                title={newsItem.title}
                description={newsItem.description}
                date={newsItem.date}
                category={newsItem.category}
                image={newsItem.image}
                onPress={() =>
                  navigation.navigate("NewsDetails", {
                    newsItem: newsItem,
                  })
                }
              />
            ))}
          </View>

          {filteredNews.length === 0 ? (
            <Text style={styles.emptyText}>Geen nieuws gevonden.</Text>
          ) : null}
        </>
      ) : null}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Campussen</Text>
        <Text style={styles.sectionText}>
          Een overzicht van de campussen van Busleyden Atheneum.
        </Text>
      </View>

      <View style={styles.grid}>
        {campusesList.map((campus) => (
          <CampusCard
            key={campus.id}
            name={campus.name}
            focus={campus.focus}
            address={campus.address}
            color={campus.color}
            onPress={() =>
              navigation.navigate("CampusDetails", {
                campus: campus,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  topBar: {
    marginBottom: 18,
  },
  brand: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  smallText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  image: {
    width: "100%",
    height: 190,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  text: {
    color: "#4b5563",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionText: {
    color: "#4b5563",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  switchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  search: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    color: "#111827",
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  filterButton: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeButton: {
    backgroundColor: "#1f4432",
  },
  filterButtonText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 12,
  },
  activeButtonText: {
    color: "#ffffff",
  },
  sortButton: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  sortButtonText: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyText: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "#b91c1c",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
  },
});

export default HomeScreen;
