import React from 'react';
import Classes from './Celulas.module.css';
//import Aux from '../../../hof/Auxiliar';

const Celulas = props => {
  let celulas = null;

  if (props.data.length > 0) {
    celulas = props.data.map((value, index) => {
      return (
        <tr key={index}>
          <td className={Classes.Cell}>{value.Codigo}</td>
          <td className={Classes.Cell}>{value.Tipo}</td>
          <td className={Classes.Cell}>{value.Setor}</td>
          <td className={Classes.Cell}>0%</td>
          <td className={Classes.Cell}>{value.Investido.vlrTotal}</td>
        </tr>
      );
    });
  }

  return <tbody>{celulas}</tbody>;
};

export default Celulas;
