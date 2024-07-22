import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/context/Auth";

const Page = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
