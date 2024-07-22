import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/FirebaseConfig";
import { useAuth } from "@/context/Auth";

interface BookmarkButtonProps {
  mealId: string;
  bookmarked: boolean;
  setBookmarked: (value: boolean) => void;
  bookmarkId: string;
  setBookmarkId: (value: string) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  mealId,
  bookmarked,
  setBookmarked,
  bookmarkId,
  setBookmarkId,
}) => {
  const { user } = useAuth();

  const addBookmark = async () => {
    try {
      const bookmarksCollectionRef = collection(FIRESTORE_DB, "bookmarks");
      const docRef = await addDoc(bookmarksCollectionRef, {
        userId: user?.uid,
        mealId: mealId,
      });
      console.log("Bookmark added successfully with ID: ", docRef.id);
      setBookmarked(true);
      setBookmarkId(docRef.id);
      Alert.alert("Bookmark added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookmark = async () => {
    try {
      const docRef = doc(FIRESTORE_DB, "bookmarks", bookmarkId);
      await deleteDoc(docRef);
      console.log(`Bookmark with ID: ${bookmarkId} deleted successfully`);
      setBookmarked(false);
      Alert.alert("Bookmark removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: bookmarked ? "red" : "rgba(203, 203, 203, 0.5)",
        padding: 10,
        borderRadius: 50,
      }}
      onPress={bookmarked ? removeBookmark : addBookmark}
    >
      <Ionicons
        name={bookmarked ? "close-outline" : "bookmark-outline"}
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default BookmarkButton;
