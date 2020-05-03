import React, { useEffect } from "react";

import Tabela from "../../components/UI/Tabela/Tabela";
import Aux from "../../hof/Aux/Auxiliar";
import useHttp from "../../hooks/http";
//import { useSelector } from "react-redux";

const ModoAnalista = () => {
  //Seletores

  const { sendRequest, tabelaModoAnalista } = useHttp();

  //Did Mount
  useEffect(() => {
    if (!tabelaModoAnalista[0]) {
      sendRequest("/acoes", "GET", null, ["analista"]);
    }
  }, [sendRequest, tabelaModoAnalista]);

  return (
    <Aux>
      <Tabela colunas={tabelaModoAnalista} data={tabelaModoAnalista} />
    </Aux>
  );
};

export default ModoAnalista;
