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
});

export default HomeScreen;
