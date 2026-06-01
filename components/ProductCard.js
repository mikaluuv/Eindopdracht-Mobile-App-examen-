import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function ProductCard({
  title,
  description,
  price,
  category,
  image,
  onPress,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    width: "48%",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  image: {
    width: "100%",
    height: 115,
    backgroundColor: "#e5e7eb",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  bottomRow: {
    gap: 4,
  },
  price: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 14,
  },
  category: {
    color: "#e85d2a",
    fontSize: 11,
    fontWeight: "700",
  },
});
