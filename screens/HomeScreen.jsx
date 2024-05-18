import { SafeAreaView, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartScreen from "../screens/StartScreen";
import ProjectsScreen from "./ProjectsScreen";
import TaskScreen from "./TaskScreen";
export default function HomeSscreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
});
