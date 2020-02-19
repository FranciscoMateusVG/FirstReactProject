import React from 'react';
import Classes from './Colunas.module.css';

const Colunas = props => {
  let colunas = props.colunas.map((value, index) => {
    return (
      <th className={Classes.Head} key={index}>
        {value}
      </th>
    );
  });

  return (
    <thead>
      <tr>{colunas}</tr>
    </thead>
  );
};

export default Colunas;
