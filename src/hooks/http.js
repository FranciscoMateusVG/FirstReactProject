import axios from "axios";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addDados,
  addTabelaHome,
  addTabelaAnaliseAcao,
  addTabelaModoAnalista,
} from "../store/actions/tabelas";
import useGeraTabelas from "./geraTabelas";

const useHttp = () => {
  const {
    geraDadosTabelaModoAnalista,
    geraDadosTabelaHome,
    geraDadosTabelaAnaliseAcao,
  } = useGeraTabelas();
  //Seletores
  const dados = useSelector((state) => state.dados);
  const tabelaHome = useSelector((state) => state.tabelaHome);
  const tabelaModoAnalista = useSelector((state) => state.tabelaModoAnalista);
  const tabelaAnaliseAcao = useSelector((state) => state.tabelaAnaliseAcao);

  //Despachantes
  const dispatch = useDispatch();
  const onDadosAdded = useCallback((dados) => dispatch(addDados(dados)), [
    dispatch,
  ]);
  const onTabelaAddedHome = useCallback(
    (tabela) => dispatch(addTabelaHome(tabela)),
    [dispatch]
  );
  const onTabelaAddedModoAnalista = useCallback(
    (tabela) => dispatch(addTabelaModoAnalista(tabela)),
    [dispatch]
  );
  const onTabelaAddedAnaliseAcao = useCallback(
    (tabela) => dispatch(addTabelaAnaliseAcao(tabela)),
    [dispatch]
  );

  const sendRequest = useCallback(
    async (url, method, data, despachantes) => {
      try {
        if (url && (method !== "GET" || method !== "get")) {
          let settings = {
            url: url,
            method: method,
            timeout: 0,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
          };
          await axios(settings);
        }

        if (despachantes[0]) {
          let acoes = await axios.get("/acoes");

          for (let index = 0; index < despachantes.length; index++) {
            const despachante = despachantes[index];

            switch (despachante) {
              case "dados":
                onDadosAdded(acoes.data.acoes);
                break;
              case "home":
                let novaTabelaHome = geraDadosTabelaHome(acoes.data.acoes);
                onTabelaAddedHome(novaTabelaHome);
                break;
              case "analista":
                let novaTabelaModoAnalista = geraDadosTabelaModoAnalista(
                  acoes.data.acoes,
                  0
                );
                onTabelaAddedModoAnalista(novaTabelaModoAnalista);
                break;
              case "analise":
                acoes = await axios.get(url);

                let novaTabelaAnaliseAcao = geraDadosTabelaAnaliseAcao(
                  acoes.data.Data
                );
                onTabelaAddedAnaliseAcao(novaTabelaAnaliseAcao);
                break;

              default:
                console.log("Despachante desconhecido");
                break;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [
      onTabelaAddedAnaliseAcao,
      onTabelaAddedHome,
      onDadosAdded,
      onTabelaAddedModoAnalista,
      geraDadosTabelaModoAnalista,
      geraDadosTabelaHome,
      geraDadosTabelaAnaliseAcao,
    ]
  );

  return {
    sendRequest,
    dados,
    tabelaHome,
    tabelaAnaliseAcao,
    tabelaModoAnalista,
  };
};

export default useHttp;
