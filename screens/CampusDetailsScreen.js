import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

const CampusDetailsScreen = ({ route, navigation }) => {
  const { campus } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <View style={[styles.colorBlock, { backgroundColor: campus.color }]} />

      <View style={styles.card}>
        <Text style={styles.focus}>{campus.focus}</Text>
        <Text style={styles.title}>{campus.name}</Text>
        <Text style={styles.address}>{campus.address}</Text>
        <Text style={styles.description}>{campus.description}</Text>
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
  colorBlock: {
    width: "100%",
    height: 120,
    borderRadius: 22,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  focus: {
    color: "#6b7280",
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  address: {
    color: "#1f4432",
    fontWeight: "700",
    marginBottom: 14,
  },
  description: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 21,
  },
});

export default CampusDetailsScreen;
