import React from "react";
import Input from "./Input/Input";
import classes from "./Forms.module.css";

const Forms = (props) => {
  const inputs = props;
  const funcoes = props.funcoes;
  let inputFinal = [];

  for (const key in inputs) {
    if (!isNaN(key)) {
      const input = inputs[key];

      inputFinal.push(
        <Input
          key={key}
          inputtype={input.type}
          label={input.label}
          type={input.type}
          name={input.label}
          placeholder={input.placeholder}
          options={input.options}
          aria-describedby="helpId"
          onChange={(event) => handleChange(event, { ...funcoes })}
        />
      );
    }
  }

  return <form className={classes.Form}>{inputFinal}</form>;
};

const handleChange = (event, funcoes) => {
  let nomeCampo = event.target.name;
  let valor = event.target.value;
  funcoes[nomeCampo](valor);
};

export default Forms;
