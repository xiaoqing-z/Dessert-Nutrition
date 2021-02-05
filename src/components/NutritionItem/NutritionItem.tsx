import React, { useState } from 'react'
import { INutrition } from '../../interfaces/INutrition'
import itemStyle from './style'

function NutritionItem(props: { nutrition: INutrition, handleChecked: any }) {


  return (
    <tr className="bg-light-gray">
      <td className={itemStyle.basic}>
        <input type="checkbox" checked={props.nutrition.checked} value={props.nutrition.id} onChange={props.handleChecked}></input>
      </td>
      <td className={itemStyle.basic}>{props.nutrition.dessert}</td>
      <td className={itemStyle.basic}>{props.nutrition.calories}</td>
      <td className={itemStyle.basic}>{props.nutrition.fat}</td>
      <td className={itemStyle.basic}>{props.nutrition.carbs}</td>
      <td className={itemStyle.basic}>{props.nutrition.protein}</td>
    </tr >
  )
}

export default NutritionItem
