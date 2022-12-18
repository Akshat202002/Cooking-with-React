import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)

  // 1. Using useEffect to load recipes from localStorage
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  // 2.Using useEffect to save recipes to localStorage
  useEffect(() => {
    const recipeJSON = JSON.stringify(recipes) // LocalStorage only stores strings
    localStorage.setItem(LOCAL_STORAGE_KEY, recipeJSON)
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd, // Same as handleRecipeAdd: handleRecipeAdd
    handleRecipeDelete
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr...',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 Tbs' }
      ]
    }

    // use previous state to set new state
    setRecipes(prevRecipes => {
      return [...prevRecipes, newRecipe]
    }
    )
    // Without previous state
    // setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    // setRecipes(recipes.filter(recipe => recipe.id !== id))

    // Use previous state to set new state
    setRecipes(prevRecipes => {
      return prevRecipes.filter(recipe => recipe.id !== id)
    }
    )

  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
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
