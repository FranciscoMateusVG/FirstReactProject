import React, { useState, useEffect } from "react";
import Tabela from "../../components/UI/Tabela/Tabela";
import Modal from "../../components/UI/Modal/Modal";
import axios from "axios";
import Aux from "../../hof/Aux/Auxiliar";
import classes from "./Home.module.css";
import NovaAcao from "../../containers/ModalNovaAcao/NovaAcao";
import AnaliseAcao from "../../containers/ModalAnaliseAcao/AnaliseAcao";
import useHttp from "../../hooks/http";

const Home = () => {
  //Estado
  const { sendRequest, tabelaHome } = useHttp();
  const [novaAcao, setNovaAcao] = useState(false);
  const [html, setHtml] = useState("");

  //Funções
  const handleIcon = async (event) => {
    let codigo = event.currentTarget.getAttribute("data-codigo");
    await axios.delete(`/acoes/${codigo}`);
    sendRequest(`/acoes/${codigo}`, "DELETE", null, []);
    sendRequest("/acoes", "GET", null, ["home"]);
  };

  const clickFecha = () => setNovaAcao(false);

  const novaAcaoHandler = () => setNovaAcao(true);

  const atualizaTabela = async () =>
    sendRequest("/acoes", "GET", null, ["home"]);

  const clearHtml = () => setHtml("");

  const abreModalAnaliseAcao = (event) => {
    let nomeAcao = event.target.getAttribute("data-codigo");

    if (nomeAcao !== "TOTAL") {
      setHtml(
        <AnaliseAcao
          nomeAcao={nomeAcao}
          atualizaTabelaPai={atualizaTabela}
          show={true}
          clearHtml={clearHtml}
        ></AnaliseAcao>
      );
    }
  };

  //Did mount
  useEffect(() => {
    sendRequest("/acoes", "GET", null, ["home"]);
  }, [sendRequest]);

  return (
    <Aux>
      <Modal header="Nova Ação" show={novaAcao} clicked={clickFecha}>
        <NovaAcao />
      </Modal>
      <Tabela
        colunas={tabelaHome}
        data={tabelaHome}
        clicked={abreModalAnaliseAcao}
        icone={(event) => handleIcon(event)}
      />
      {html}
      <div className={classes.Teste}>
        <button className={classes.NovaAcao} onClick={novaAcaoHandler}>
          Nova Açao
        </button>
      </div>
    </Aux>
  );
};

export default Home;
