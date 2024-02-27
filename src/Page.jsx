import React, { useState } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap'
import axios from 'axios'
function Form() {
  const apiKey= import.meta.env.VITE_API_KEY;
  const [inputValue, setInputValue] = useState('');
  const [submitvalue, setSubmitvalue] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  const handleSubmit = () => {

    setLoading(true)
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputValue}&apiKey=${apiKey}`)
      .then(response => {
        setSubmitvalue(response.data.slice(0, 10));
        setLoading(false);


      })
      .catch(error => {
        console.log('error', error);
        setLoading(false)
      })
  };



  return (
    <div className='container'>
      <h1>WhatToCook 😋</h1>
      <form  className='form' onChange={handleInputChange} >
        <input type="text"  />

        <button type="button" className='button' onClick={handleSubmit}>Submit</button>
      </form>
      {loading && <Spinner animation="border" role='status'><span className='col'>Loading...</span></Spinner>}
      {submitvalue.length > 0 && (
        <div className="recipe-container">
          {submitvalue.map(recipe => (
            <Card key={recipe.id} className="recipe-card" >
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body className=''>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Subtitle className="mb-2 ">Ingredients:</Card.Subtitle>
                <ListGroup variant="flush">
                  {recipe.usedIngredients.map(ingredient => (
                    <ListGroup.Item key={ingredient.id}>• {ingredient.original}</ListGroup.Item>
                  ))}
                  {recipe.missedIngredients.map(ingredient => (
                    <ListGroup.Item key={ingredient.id}>• {ingredient.original}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Card.Text>Instructions: {recipe.instructions || 'N/A'}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>

  );
}

export default Form;
//cocexit952@ricorit.com
// 8322f75a675b48f6857cf1f56acfcf2c