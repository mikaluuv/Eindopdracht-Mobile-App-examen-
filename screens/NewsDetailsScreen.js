import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

const NewsDetailsScreen = ({ route, navigation }) => {
  const { newsItem } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image source={newsItem.image} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.category}>{newsItem.category}</Text>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.date}</Text>
        <Text style={styles.description}>{newsItem.description}</Text>
        <Text style={styles.contentText}>{newsItem.content}</Text>
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
    marginBottom: 8,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  date: {
    color: "#1f4432",
    fontWeight: "700",
    marginBottom: 14,
  },
  description: {
    color: "#4b5563",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  contentText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 21,
  },
});

export default NewsDetailsScreen;
