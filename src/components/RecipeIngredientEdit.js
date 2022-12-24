import React from 'react'

function RecipeIngredientEdit({ ingredient }) {
    return (
        <>
            <input className="recipe-edit__input"
                value={ingredient.name}
                type="text" />
            <input className="recipe-edit__input" type="text"
                value={ingredient.amount} />
            <button className="btn btn--danger">&times;</button>
        </>
    )
}

export default RecipeIngredientEdit