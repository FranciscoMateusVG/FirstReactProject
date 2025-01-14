import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case "select":
      let options = props.options.map((element, index) => {
        return <option key={index}>{element}</option>;
      });
      inputElement = (
        <select className={classes.InputElement} {...props}>
          {options}
        </select>
      );
      break;
    case "textarea":
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
