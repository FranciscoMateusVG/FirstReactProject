import React from "react";
import classes from "./Icones.module.css";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icone = (props) => {
  return (
    <div className={classes.IconeBox} id="icone">
      <FontAwesomeIcon
        onClick={props.clickfunction}
        icon={icons[props.icon]} //faPlus
        size={props.size}
        className={classes.Icone}
      />
    </div>
  );
};

export default Icone;
