import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useCheckBookmark, useLoadMeal } from "@/hook";
import BackButton from "@/components/BackButton";
import BookmarkButton from "@/components/BookmarkButton";
import { combineIngredientsAndMeasures } from "@/utlis/ingredient_and_measure";
import { Accordion } from "@/components/Accordion";

const Page = () => {
  const { mealId } = useLocalSearchParams();
  const meal = useLoadMeal(mealId as string);

  const { bookmarked, bookmarkId, setBookmarked, setBookmarkId } =
    useCheckBookmark(mealId as string);

  if (!meal || meal.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const openYouTubeLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <>
      <ImageBackground
        source={{ uri: meal[0]?.strMealThumb }}
        style={[styles.container]}
      >
        <SafeAreaView style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Recipe Details</Text>
          <BookmarkButton
            mealId={mealId as string}
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
            bookmarkId={bookmarkId}
            setBookmarkId={setBookmarkId}
          />
        </SafeAreaView>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <Accordion title="Instructions" defaultOpen={true}>
          <Text>{meal[0]?.strInstructions}</Text>
        </Accordion>

        <Accordion title="Ingredients">
          {combineIngredientsAndMeasures(meal[0]).map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
        </Accordion>

        <Accordion title="Watch on Youtube ">
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              openYouTubeLink(meal[0]?.strYoutube as string)
            }
          >
            <Text style={styles.buttonText}>Open YouTube Video</Text>
          </TouchableOpacity>
        </Accordion>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Page;
