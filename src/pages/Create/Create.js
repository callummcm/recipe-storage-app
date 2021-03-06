import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import './Create.css'

const Create = () => {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)

  const navigate = useNavigate()

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIng => [...prevIng, ing])
      setNewIngredient('')
    }
    else if (ingredients.includes(ing)) {
      ingredientInput.current.setCustomValidity('Cannot add duplicate ingredients')
      ingredientInput.current.reportValidity()
    }
    else {
      ingredientInput.current.setCustomValidity('Cannot be empty')
      ingredientInput.current.reportValidity()
    }
    ingredientInput.current.focus()
  }

  //redirect the user to the created recipes
  useEffect(() => {
    if (data) navigate('/')
  }, [data])

  return (
    <>
      <div className='create'>
        <h2 className="page-title">Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Recipe title:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>
          <label>
            <span>Recipe ingredients:</span>
            <div className='ingredients'>
              <input
                type="text"
                onChange={(e) => {
                  setNewIngredient(e.target.value)
                  e.target.setCustomValidity('')
                }
                }
                value={newIngredient}
                ref={ingredientInput}
              />
              <button className='btn' onClick={handleAdd}>add</button>
            </div>
          </label>
          <p>Current ingredients: {ingredients.map((ing) => <em key={ing}>{ing}, </em>)}</p>
          <label>
            <span>Recipe method:</span>
            <textarea
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              required
            />
          </label>
          <label>
            <span>Cooking time (minutes):</span>
            <input
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>
          <button className='btn'>Submit</button>
        </form>
      </div>
    </>
  )
}
export default Create