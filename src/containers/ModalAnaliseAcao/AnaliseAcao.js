import React, { useState, useCallback, useEffect } from "react";
import Tabela from "../../components/UI/Tabela/Tabela";
import Modal from "../../components/UI/Modal/Modal";
import Forms from "../../components/UI/Forms/Forms";
import Icone from "../../components/UI/Icones/Icones";
import useHttp from "../../hooks/http";

const AnaliseAcao = (props) => {
  const { sendRequest, tabelaAnaliseAcao } = useHttp();
  //Estado
  const [inputs] = useState([
    { label: "Data", type: "date", placeholder: "Data Da Compra", options: "" },
    {
      label: "Quantidade",
      type: "number",
      placeholder: "Quantidade Comprada",
      options: "",
    },
    {
      label: "Preço da Compra",
      type: "text",
      placeholder: "Preço Unirtário da Compra",
      options: "",
    },
  ]);
  const [nomeAcao] = useState(props.nomeAcao);
  const [modal] = useState(props.show);

  const [data, setData] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoDaCompra, setPrecoDaCompra] = useState("");

  //Funções
  const funcoes = {
    Data: setData,
    Quantidade: setQuantidade,
    PrecoDaCompra: setPrecoDaCompra,
  };

  const clickFecha = () => {
    props.clearHtml();
  };

  const adicionaAcao = async () => {
    if (data && quantidade && precoDaCompra) {
      setPrecoDaCompra(precoDaCompra.replace(",", "."));
      setData(data + "T00:00:00.000Z");

      let dadosNovaAcao = {
        data: data,
        quantidade: quantidade,
        preco: precoDaCompra,
      };

      sendRequest(`/acoes/${nomeAcao}`, "PUT", dadosNovaAcao, ["analise"]);
    } else alert("PREENCHA TODOS OS CAMPOS");
  };

  const fetchData = useCallback(() => {
    sendRequest(`/acoes/${nomeAcao}`, "GET", null, ["analise"]);
  }, [sendRequest, nomeAcao]);

  //Did Mount

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Modal
      header={"Detalhes Ação:  " + nomeAcao}
      show={modal}
      clicked={clickFecha}
    >
      <Tabela colunas={tabelaAnaliseAcao} data={tabelaAnaliseAcao}></Tabela>

      <Forms {...inputs} funcoes={funcoes} />
      <Icone clickfunction={adicionaAcao} icon="faPlus" size="2x" />
    </Modal>
  );
};

export default AnaliseAcao;
