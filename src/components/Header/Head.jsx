import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Button from "../Button/Button"
import headStyle from "./style"
const RESET_NUTRITIONS = gql`
  mutation reset {
    resetNutritions {
      id
      dessert
      calories
      fat
      carbs
      protein
    }
  }
`;

function Head() {
  const [resetNutritions] = useMutation(RESET_NUTRITIONS)

  const handleReset = () => {
    resetNutritions();
    window.location.reload();
  }
  return (
    <header className={headStyle["header"]}>
      <Link to='/' className="link-none">
        <div className={headStyle["title"]}>Nutrition List</div>
      </Link>
      <div className={headStyle["btn"]}>
        <Button type="reset" onClick={handleReset} ><i className="fas fa-redo mr1"></i>reset data</Button>
      </div>
    </header>
  )

}

export default Head;