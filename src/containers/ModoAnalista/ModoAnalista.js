import React, { useEffect } from "react";
import Tabela from "../../components/UI/Tabela/Tabela";
import Aux from "../../hof/Aux/Auxiliar";
import useHttp from "../../hooks/http";

const ModoAnalista = () => {
  const { sendRequest, tabelaModoAnalista } = useHttp();

  //Did Mount
  useEffect(() => {
    sendRequest("/acoes", "GET", null, ["analista"]);
  }, [sendRequest]);

  return (
    <Aux>
      <Tabela colunas={tabelaModoAnalista} data={tabelaModoAnalista} />
    </Aux>
  );
};

export default ModoAnalista;
