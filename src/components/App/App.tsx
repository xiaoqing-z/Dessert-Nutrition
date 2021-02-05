import React, { useState } from 'react';
import '../../styles/App.css';
import NutritionList from '../NutritionList/List';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddNutrition from '../AddNutrition/AddNutrition';
import { gql, useMutation } from '@apollo/client';
import Head from "../Header/Head";
import Panel from "../Panel/Panel";
import Button from '../Button/Button'

const DELETE_NUTRITIONS = gql`
  mutation delete(
    $ids: [ID!]!
  ) {
    deleteNutrition(ids: $ids)
  }
`

function App() {
  const [ids, setIds] = useState<string[]>([]);

  const [deleteNutrition] = useMutation(DELETE_NUTRITIONS, {
    variables: {
      ids: ids
    }
  });

  const getIds = (ids: string[]) => {
    setIds(ids);
  }

  const handleDelete = () => {
    deleteNutrition();
    window.location.reload();
  }

  return (
    <Router>
      <div>
        <Head></Head>
        <Route path='/' exact>
          <div className="w-100 border-box pa3 ph5-ns">

            <Panel ids={ids} handleDelete={handleDelete}>
            </Panel>
            <NutritionList sendIds={getIds}></NutritionList>
          </div>
        </Route>
        <Route path='/add' exact component={AddNutrition}></Route>
      </div>
    </Router >
  );
}

export default App;
