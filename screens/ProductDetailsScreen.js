import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = product.priceNumber * quantity;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image source={product.image} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.details}>{product.details}</Text>

        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Aantal</Text>

          <View style={styles.quantityControls}>
            <Pressable style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantity}>{quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Totaal: EUR {totalPrice}</Text>
        </View>
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
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  backText: {
    color: "#111827",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 230,
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
  category: {
    color: "#e85d2a",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  description: {
    color: "#4b5563",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  details: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  quantityBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#87BD25",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  totalBox: {
    backgroundColor: "#87BD25",
    borderRadius: 14,
    padding: 14,
  },
  totalText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
});

export default ProductDetailsScreen;
