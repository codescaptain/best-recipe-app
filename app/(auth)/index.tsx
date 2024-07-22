import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Meal } from "@/interfaces";
import { loadRecipes } from "@/utlis/random_recipes";
import { estimateRecipeTime } from "@/utlis/calculate_recipe_time";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const List = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [randomRecipes, setRandomRecipes] = useState<Meal[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const backgroundColors = [
    "#CAE3F1",
    "#F1E0CA",
    "#E1F1CA",
    "#F1CAE3",
    "#D3E4CD",
    "#EBD4CB",
    "#F2E2D2",
    "#F6F1E3",
    "#CCE2CB",
    "#FFE8D6",
    "#FFB5A7",
    "#E4C1F9",
    "#A0E7E5",
    "#B4F8C8",
    "#FBE7C6",
    "#F6E6C2",
  ];
  const router = useRouter();

  const loadRandomRecipes = async () => {
    const recipes = await loadRecipes();
    setRandomRecipes(recipes);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const response = await axios.get(`${API_URL}/categories.php`);
      setCategories(response.data.categories);
    };

    loadCategories();
    loadRandomRecipes();
  }, []);

  const handleMealPress = (meal: Meal) => {
    router.push({
      pathname: "/(auth)/[mealId]",
      params: { mealId: meal.idMeal },
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRandomRecipes().then(() => {
      setRefreshing(false);
    });
  }, []);

  const renderHeaderItem = ({ item }: { item: Category }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.headerItem}
          onPress={() => {
            console.log(item);
          }}
        >
          <Image
            source={{ uri: item.strCategoryThumb }}
            style={styles.headerImage}
          />
          <Text>{item.strCategory}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Meal }) => {
    const backgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    return (
      <TouchableOpacity
        onPress={() => handleMealPress(item)}
        style={[styles.recipeItem, { backgroundColor }]}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.recipeItemImage}
        />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeInfoText}>{item.strMeal}</Text>
          <View style={styles.recipeInfoBottom}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="time-outline" size={20} color="black" />
              <Text>{estimateRecipeTime(item.strInstructions)} min</Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="person-outline" size={20} color="black" />
              <Text>2-4 serve</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderHeaderItem}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ flexDirection: "column", flex: 1, gap: 15 }}>
        <Text style={styles.headerText}>Recommendations</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          horizontal
          data={randomRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  headerItem: {
    alignItems: "center",
    marginRight: 10,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  itemList: {
    maxWidth: 100,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  recipeItemImage: {
    width: 300,
    height: 200,
    position: "absolute",
    top: 30,
    right: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 20,
  },
  recipeItem: {
    height: "100%",
    width: 300,
    marginRight: 15,
    borderRadius: 25,
    overflow: "hidden",
    padding: 20,
  },
  recipeInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
  },
  recipeInfoText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  recipeInfoBottom: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default List;
