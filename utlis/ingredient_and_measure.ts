import { Meal } from "@/interfaces";

export const combineIngredientsAndMeasures = (meal: Meal): string[] => {
  const ingredients = [];  
  for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];

      if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
          ingredients.push(`${measure} ${ingredient}`);
      }
  }
  return ingredients;
};