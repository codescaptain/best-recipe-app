# Best Recipe App

This is a React Native application that provides a list of recipe categories and random recipes. Users can view detailed recipe instructions, ingredients, and watch related YouTube videos directly within the app.

## Features

- **Recipe Categories**: Browse different categories of recipes.
- **Random Recipes**: View random recipes with details including estimated cooking time and serving size.
- **Detailed Instructions**: Each recipe includes detailed cooking instructions and ingredients.
- **YouTube Integration**: Watch recipe-related YouTube videos directly within the app.
- **Firebase Authentication**: Users can sign up, log in, and log out using Firebase Authentication.
- **Bookmark Recipes**: Users can bookmark their favorite recipes and access them later.

## Screenshots

### Recipe Details

![SimulatorScreenRecording](https://github.com/user-attachments/assets/05f7e9d6-d3f3-46b6-9e2f-858bd398a0d6)

![Login and Register Screen 1](https://github.com/user-attachments/assets/e1a45717-161f-44d5-bb95-a81a6fc731d9)
![Recipe Details 1](https://github.com/user-attachments/assets/10f72ffa-a7fb-432c-a6e0-f8093f2b7a0b)
![Recipe Details 2](https://github.com/user-attachments/assets/42c4aa15-9eb3-4ad3-bd72-b15c28997a0d)
![Recipe Details 3](https://github.com/user-attachments/assets/901657fd-560c-4b9b-9d9e-58dc528256ce)

## Installation

   ```sh
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
   npm install
   npx expo
   ```

## Code Structure

**components**: Contains reusable UI components such as BackButton, BookmarkButton, and Accordion.
**hooks**: Custom hooks for loading meals and checking bookmarks.
**utils**: Utility functions such as random_recipes and calculate_recipe_time.
**interfaces**: TypeScript interfaces for data models like Category and Meal.

### To-Do List

1. **Profile Page**
   - Implement user profile page to display user information and settings.
2. **Favorites Section on Home Page**
   - Add a section on the home page to display user's bookmarked recipes.
3. **Search Functionality**
   - Implement a search feature to allow users to search for recipes.
4. **Recipe Sharing**
   - Enable users to share recipes via social media or messaging apps.
5. **Push Notifications**
   - Implement push notifications to remind users about saved recipes or new recipes.
6. **Rating and Reviews**
   - Allow users to rate and review recipes.
7. **Dark Mode**
   - Add a dark mode option for the app.
8. **Offline Access**
   - Enable offline access to bookmarked recipes.
9. **Multi-Language Support**
   - Add support for multiple languages.
10. **Improved UI/UX**
    - Enhance the user interface and user experience.
