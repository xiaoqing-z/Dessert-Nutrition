import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { INutrition } from '../../interfaces/INutrition';
import NutritionItem from '../NutritionItem/NutritionItem';
import { INutritionType } from '../../interfaces/INutritionType';
import { ISort } from '../../interfaces/ISort';
import listStyle from "./style";



const NUTRITION_QUERY = gql`
  {
    getNutritions {
      id
      dessert
      calories
      fat
      carbs
      protein
    }
  }
`
const NUTRITIONS_SUBSCRIPTION = gql`
  subscription {
    nutrition {
      data {
        id
        dessert
        calories
        fat
        carbs
        protein
      }
      mutation
    }
  }
`

function NutritionList(props: { sendIds: Function }) {
  const { data, loading } = useQuery(NUTRITION_QUERY);

  const [nutritions, setNutritions] = useState<INutrition[] | undefined>(undefined);
  const [sort, setSort] = useState<ISort>({
    dessert: false,
    calories: false,
    fat: false,
    carbs: false,
    protein: false
  })

  useEffect(() => {
    if (loading === false && data) {
      setNutritions(data.getNutritions.map((item: INutrition) => {
        return {
          ...item,
          checked: false
        }
      }));
    }
  }, [loading, data])


  const handleSort = (attr: INutritionType): void => {
    if (nutritions === undefined) return
    const tempNutritions = nutritions.slice();

    if (sort[attr]) {
      tempNutritions.sort((a: INutrition, b: INutrition) => {
        return attr === 'dessert' ? a[attr]?.localeCompare(b[attr]) : a[attr] - b[attr];
      })
    } else {
      tempNutritions.sort((a: INutrition, b: INutrition) => {
        return attr === 'dessert' ? b[attr]?.localeCompare(a[attr]) : b[attr] - a[attr];
      })
    }

    setNutritions(tempNutritions)
  }
  const handleAllChecked = (event: any) => {
    if (nutritions === undefined) return;

    setNutritions(
      nutritions.map((item: INutrition) => {
        item.checked = event.target.checked;
        return item
      })
    )

    props.sendIds(generateIds())
  }

  const handleChecked = (event: any) => {
    if (nutritions === undefined) return;

    setNutritions(
      nutritions.map((item: INutrition) => {
        if (item.id === event.target.value) {
          item.checked = event.target.checked
        }
        return item
      })
    )

    props.sendIds(generateIds())
  }

  const generateIds = () => {
    return nutritions
      ?.filter((item) => item.checked === true)
      .map((item) => item.id);
  }
  return (
    <div>
      <table className={listStyle.table} cellSpacing="0">
        <thead>
          <tr>
            <th className={listStyle.tableth}><input type="checkbox" onClick={handleAllChecked} ></input></th>
            <th className={listStyle.tableth}>dessert(100g serving)<i className={listStyle["arrows"]} onClick={() => handleSort('dessert')}></i></th>
            <th className={listStyle.tableth}>calories<i className={listStyle["arrows"]} onClick={() => handleSort('calories')}></i></th>
            <th className={listStyle.tableth}>fat (g)<i className={listStyle["arrows"]} onClick={() => handleSort('fat')}></i></th>
            <th className={listStyle.tableth}>carbs (g)<i className={listStyle["arrows"]} onClick={() => handleSort('carbs')}></i></th>
            <th className={listStyle.tableth}>protein (g)<i className={listStyle["arrows"]} onClick={() => handleSort('protein')}></i></th>
          </tr>
        </thead>
        <tbody className="lh-copy">
          {
            nutritions && (
              <>
                {nutritions.map((item: INutrition) => (
                  <NutritionItem handleChecked={handleChecked} nutrition={item} key={item.id}></NutritionItem>
                ))}
              </>
            )
          }
        </tbody>
      </table>
    </div >
  )
}

export default NutritionList
