import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/context/Auth";



const InitialLayout = () => {
 const { user, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (!user) {
      router.replace('/login');
    }
  }, [initialized, user]);

  return (
    <>
    {initialized ? (
       <Slot />
    ): (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#000ff" />
      </View>
    )
    }
    </>
  )
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  )
};

export default RootLayout;
