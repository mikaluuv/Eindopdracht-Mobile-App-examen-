import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import StudyFinderScreen from "./screens/StudyFinderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
        <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} />
        <Stack.Screen name="StudyFinder" component={StudyFinderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
