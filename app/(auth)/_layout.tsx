import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs } from "expo-router";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/Auth";

const AuthLayout = () => {
  const { user } = useAuth();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        redirect={!user}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => signOut(FIREBASE_AUTH)}
            >
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => signOut(FIREBASE_AUTH)}
            >
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen name="[mealId]"  options={{
        headerShown: false,
        tabBarButton:()=>null
      }} />
    </Tabs>
  );
};

export default AuthLayout;
