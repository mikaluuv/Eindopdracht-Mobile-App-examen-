import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function CampusCard({ name, focus, address, color, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <Text numberOfLines={1} style={styles.title}>
        {name}
      </Text>
      <Text numberOfLines={2} style={styles.focus}>
        {focus}
      </Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.link}>Naar campus</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    width: "48%",
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 5,
  },
  focus: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  address: {
    color: "#111827",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  link: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 12,
  },
});
