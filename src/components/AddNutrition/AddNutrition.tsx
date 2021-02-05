import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
import addStyle from './style';
import Inputs from './Inputs';
import Button from "../Button/Button"

const ADD_NUTRITION_MUTATION = gql`
  mutation AddNutrition(
    $dessert: String!, 
    $calories: Int!, 
    $fat: Int!, 
    $carbs: Int!, 
    $protein: Int!
  ) {
    addNutrition(
      dessert: $dessert,
      calories: $calories,
      fat: $fat,
      carbs: $carbs,
      protein: $protein
    ) {
      dessert
      calories
      fat
      carbs
      protein
    }
  }
`;


function AddNutrition() {
  let history = useHistory();

  const [form, setForm] = useState({
    id: Math.random(),
    dessert: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
  })

  console.log(form);


  const [addNutrition] = useMutation(ADD_NUTRITION_MUTATION, {
    variables: {
      dessert: form.dessert,
      calories: form.calories,
      fat: form.fat,
      carbs: form.carbs,
      protein: form.protein,
    }
  });


  return (
    <div className="center w-70 mr-auto">
      <div className={addStyle.note}>
        <i className={addStyle.icon}></i>
        Please fill all details before you  submit !
      </div>
      <form onSubmit={() => {
        //e.preventDefault();
        addNutrition();
        history.push('/')
      }}>

        <Inputs type="text" value={form.dessert} name="dessert" label="Dessert Name *" onChange={setForm} form={form} id={form.id} ></Inputs>
        <Inputs type="number" value={form.calories} name="calories" label="Calories *" onChange={setForm} form={form} id={form.id} ></Inputs>
        <Inputs type="number" value={form.fat} name="fat" label="Fat *" onChange={setForm} id={form.id} form={form}></Inputs>
        <Inputs type="number" value={form.carbs} name="carbs" label="Carbs *" onChange={setForm} id={form.id} form={form}></Inputs>
        <Inputs type="number" value={form.protein} name="protein" label="Protein *" onChange={setForm} id={form.id} form={form} ></Inputs>

        <div className="mt3 tc">
          <Button type="submit"><i className="fas fa-check"></i>submit</Button>
        </div>
      </form>
    </div>
  )
}

export default AddNutrition
