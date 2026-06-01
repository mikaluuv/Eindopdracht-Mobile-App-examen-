import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { fetchStudies } from "../services/api";

const studies = [
  {
    id: 1,
    title: "Gezondheidszorg",
    interest: "Zorg",
    grade: "3de graad",
    campus: "Botaniek",
  },
  {
    id: 2,
    title: "Biotechnologische STEM-wetenschappen",
    interest: "Wetenschap",
    grade: "3de graad",
    campus: "Botaniek",
  },
  {
    id: 3,
    title: "Economie",
    interest: "Economie",
    grade: "2de graad",
    campus: "Caputsteen",
  },
  {
    id: 4,
    title: "Sportwetenschappen",
    interest: "Sport",
    grade: "3de graad",
    campus: "Nekkerspoel",
  },
  {
    id: 5,
    title: "IT en netwerken",
    interest: "IT",
    grade: "3de graad",
    campus: "Zandpoort",
  },
  {
    id: 6,
    title: "Maatschappij en welzijn",
    interest: "Zorg",
    grade: "2de graad",
    campus: "Stassart",
  },
];

const StudyFinderScreen = ({ navigation }) => {
  const [studiesList, setStudiesList] = useState(studies);
  const [selectedInterest, setSelectedInterest] = useState("Alle");
  const [selectedGrade, setSelectedGrade] = useState("Alle");

  const interests = ["Alle", ...new Set(studiesList.map((study) => study.interest))];
  const grades = ["Alle", ...new Set(studiesList.map((study) => study.grade))];

  useEffect(() => {
    fetchStudies()
      .then((data) => {
        setStudiesList(data);
      })
      .catch(() => {});
  }, []);

  const filteredStudies = studiesList
    .filter((study) => {
      if (selectedInterest === "Alle") {
        return true;
      }

      return study.interest === selectedInterest;
    })
    .filter((study) => {
      if (selectedGrade === "Alle") {
        return true;
      }

      return study.grade === selectedGrade;
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.title}>Studiezoeker</Text>
        <Text style={styles.text}>
          Kies je interesse en graad om snel een richting te vinden.
        </Text>
      </View>

      <View style={styles.filterCard}>
        <Text style={styles.filterTitle}>Interesse</Text>
        <View style={styles.buttonRow}>
          {interests.map((interest) => (
            <Pressable
              key={interest}
              style={[
                styles.filterButton,
                selectedInterest === interest && styles.activeButton,
              ]}
              onPress={() => setSelectedInterest(interest)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedInterest === interest && styles.activeButtonText,
                ]}
              >
                {interest}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterTitle}>Graad</Text>
        <View style={styles.buttonRow}>
          {grades.map((grade) => (
            <Pressable
              key={grade}
              style={[
                styles.filterButton,
                selectedGrade === grade && styles.activeButton,
              ]}
              onPress={() => setSelectedGrade(grade)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedGrade === grade && styles.activeButtonText,
                ]}
              >
                {grade}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.resultTitle}>{filteredStudies.length} resultaten</Text>

      {filteredStudies.map((study) => (
        <View key={study.id} style={styles.studyCard}>
          <Text style={styles.studyTitle}>{study.title}</Text>
          <Text style={styles.studyText}>{study.grade} - {study.campus}</Text>
          <Text style={styles.studyTag}>{study.interest}</Text>
        </View>
      ))}
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
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
  },
  filterCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
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
    backgroundColor: "#87BD25",
  },
  filterButtonText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 12,
  },
  activeButtonText: {
    color: "#ffffff",
  },
  resultTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  studyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  studyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 5,
  },
  studyText: {
    color: "#6b7280",
    marginBottom: 6,
  },
  studyTag: {
    color: "#e85d2a",
    fontWeight: "800",
  },
});

export default StudyFinderScreen;
