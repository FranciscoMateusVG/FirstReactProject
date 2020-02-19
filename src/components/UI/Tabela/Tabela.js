import React from 'react';
import Colunas from './Colunas/Colunas';
import Celulas from './Celulas/Celulas';
import classes from './Tabela.module.css';

const Tabela = props => {
  return (
    <table className={classes.Tabela}>
      <Colunas colunas={props.colunas} />
      <Celulas data={props.data} />
    </table>
  );
};

export default Tabela;
