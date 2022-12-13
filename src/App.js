import React from 'react';
import RecipeList from './RecipeList';

function App() {
  return (
    <RecipeList recipes={sampleRecipes} />
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
