import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = sampleRecipes.find(recipe => recipe.id === selectedRecipeId)
  console.log(selectedRecipe);
  // BEFORE: const [recipes, setRecipes] = useState(sampleRecipes)
  // Didn't work because the state was initialized before the component was mounted. Also the state was initialized with the same value every time the component was rendered. So, the state was not saved to localStorage.Also StrictMode in react renders the code twice(on development but not production). First run sets localstorage to data given, then the second run overrides it so now data is blank 
  // So if you remove StrictMode, it will work. But, StrictMode is a good thing to have in development. So, we needed to fix this.

  // AFTER:
  const [recipes, setRecipes] = useState(() => {
    // Important: LocalStorage is a synchronous operation and will block the main thread
    // if the data is large. So, we use a function to initialize the state.
    // This function will only be called once when the component is first rendered.
    // The function will be called again if the component is unmounted and mounted again.
    // This is a good place to load data from localStorage.
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || sampleRecipes
  });

  // 1. Using useEffect to load recipes from localStorage
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON === null) {
      setRecipes(JSON.parse(recipeJSON))
    }
  }, [])


  // 2.Using useEffect to save recipes to localStorage
  // Save recipes to local storage whenever recipes array is updated
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    }
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    // create a new recipe
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 Tbs' }
      ]
    }

    // add the new recipe to the existing list of recipes
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )

}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Tea',
    servings: 1,
    cookTime: '0:05',
    instructions: '1. Put water in cup\n2. Heat water until boiling\n3. Pour water in cup\n4. Add tea bag\n5. Let tea steep for 30 seconds\n6. Remove tea bag\n7. Add sugar and milk\n8. Stir\n9. Enjoy!',
    ingredients: [
      {
        id: 1,
        name: 'Water',
        amount: '1 Cup'
      },
      {
        id: 2,
        name: 'Tea Bag',
        amount: '1'
      },
      {
        id: 3,
        name: 'Sugar',
        amount: '1 Tbsp'
      },
      {
        id: 4,
        name: 'Milk',
        amount: '2 Cups'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Coffee',
    servings: 1,
    cookTime: '0:10',
    instructions: '1. Put water in cup\n2. Heat water until boiling\n3. Pour water in cup\n4. Add coffee grounds\n5. Let coffee steep for 30 seconds\n6. Remove coffee grounds\n7. Add sugar and milk\n8. Stir\n9. Enjoy!',
    ingredients: [
      {
        id: 1,
        name: 'Water',
        amount: '1/2 Cup'
      },
      {
        id: 2,
        name: 'Coffee Grounds',
        amount: '1'
      },
      {
        id: 3,
        name: 'Sugar',
        amount: '1 Tbsp'
      },
      {
        id: 4,
        name: 'Milk',
        amount: '2 Cups'
      }
    ]
  }
]

export default App;
