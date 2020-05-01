import React, { useState } from "react";
import Aux from "../../hof/Aux/Auxiliar";
import Button from "../../components/UI/Button/Button";
import Forms from "../../components/UI/Forms/Forms";
import useHttp from "../../hooks/http";

const NovaAcao = () => {
  //Estado
  const { sendRequest } = useHttp();
  const [inputs] = useState([
    { label: "Nome", type: "text", placeholder: "Nome Da Ação", options: "" },
    {
      label: "Codigo",
      type: "text",
      placeholder: "Código Da Ação",
      options: "",
    },
    { label: "Setor", type: "text", placeholder: "Setor Da Ação", options: "" },
    {
      label: "Nome",
      type: "select",
      placeholder: "Nome Da Ação",
      options: ["Ação", "Fundo Imobiliário"],
    },
  ]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Ação");
  const [codigo, setCodigo] = useState("");
  const [setor, setSetor] = useState("");

  //Funções
  const funcoes = {
    Nome: setNome,
    Codigo: setCodigo,
    Tipo: setTipo,
    Setor: setSetor,
  };

  const clickSalva = async () => {
    let acaoSalva = {
      Nome: nome,
      Tipo: tipo,
      Codigo: codigo,
      Setor: setor,
    };

    sendRequest("/acoes", "POST", acaoSalva, ["home", "analista"]);
  };
  //Did mount

  return (
    <Aux>
      <Forms {...inputs} funcoes={funcoes} />
      <Button btnType="Success">Cancelar</Button>
      <Button btnType="Danger" clicked={clickSalva}>
        Salvar
      </Button>
    </Aux>
  );
};

export default NovaAcao;
