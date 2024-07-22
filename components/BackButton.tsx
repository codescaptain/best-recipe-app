import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(203, 203, 203, 0.5)",
        padding: 10,
        borderRadius: 50,
      }}
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
