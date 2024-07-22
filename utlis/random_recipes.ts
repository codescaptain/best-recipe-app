import { Meal } from "@/interfaces";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const loadRecipes = async (): Promise<Meal[]> => {
  const uniqueRecipes = new Set<string>();
  const fetchedRecipes: Meal[] = [];

  while (uniqueRecipes.size < 10) {
    const response = await axios.get(`${API_URL}/random.php`);
    const recipe: Meal = response.data.meals[0];

    if (!uniqueRecipes.has(recipe.idMeal)) {
      uniqueRecipes.add(recipe.idMeal);
      fetchedRecipes.push(recipe);
    }
  }

  return fetchedRecipes;
};