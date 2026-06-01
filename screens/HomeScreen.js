import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    title: "Schoolhoodie BA",
    description: "Warme hoodie met Busleyden Atheneum logo.",
    price: "EUR 35",
    category: "Kleding",
    image: require("../assets/school.webp"),
  },
  {
    id: 2,
    title: "Drinkbus",
    description: "Herbruikbare drinkbus voor elke schooldag.",
    price: "EUR 12",
    category: "Accessoires",
    image: require("../assets/school.webp"),
  },
  {
    id: 3,
    title: "Turnzak",
    description: "Praktische sportzak voor de lessen LO.",
    price: "EUR 15",
    category: "Sport",
    image: require("../assets/school.webp"),
  },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.topBar}>
        <Text style={styles.brand}>Busleyden Atheneum</Text>
        <Text style={styles.smallText}>Mechelen</Text>
      </View>

      <Image source={require("../assets/school.webp")} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Welkom bij BA</Text>
        <Text style={styles.text}>
          Een eenvoudige app voor producten, nieuws, campussen en de
          studiezoeker.
        </Text>

        <Button
          title="Start"
          color="#1f4432"
          onPress={() => console.log("Start app")}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Webshop</Text>
        <Text style={styles.sectionText}>Een paar producten uit de schoolshop.</Text>
      </View>

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product.image}
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
});

export default HomeScreen;
