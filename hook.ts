import { useEffect, useState } from "react";
import axios from "axios";
import { Meal } from "@/interfaces";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "@/FirebaseConfig";
import { useAuth } from "@/context/Auth";
import { combineIngredientsAndMeasures } from "./utlis/ingredient_and_measure";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useLoadMeal = (mealId: string): Meal[] => {
  const [meal, setMeal] = useState<Meal[]>([]);

  useEffect(() => {
    const loadMeal = async () => {
      const response = await axios.get(`${API_URL}/lookup.php?i=${mealId}`);      
      setMeal(response.data.meals);
    };

    loadMeal();
  }, [mealId]);
  
  return meal;
};


export const useCheckBookmark = (mealId: string) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarksCollectionRef = collection(FIRESTORE_DB, "bookmarks");
        const q = query(
          bookmarksCollectionRef,
          where("userId", "==", user?.uid),
          where("mealId", "==", mealId)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.log("Bookmark exists");
          setBookmarked(true);
          setBookmarkId(querySnapshot.docs[0].id);
        } else {
          console.log("No bookmark found");
          setBookmarked(false);
          setBookmarkId("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBookmark();
  }, [mealId, user?.uid]);

  return { bookmarked, bookmarkId, setBookmarked, setBookmarkId };
};
