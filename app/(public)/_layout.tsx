import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <Stack>
    <Stack.Screen name="login" options={{
      headerTitle: 'Hello',
      headerShown: false,
    }} />
    </Stack>
  );
};

export default Page;
