import * as actionTypes from "./actionsTypes";

export const addDados = (dados) => {
  return { type: actionTypes.ADD_DADOS, dados: dados };
};

export const addTabelaHome = (tabela) => {
  return { type: actionTypes.ADD_TABELA_HOME, tabela: tabela };
};

export const addTabelaAnaliseAcao = (tabela) => {
  return { type: actionTypes.ADD_TABELA_ANALISEACAO, tabela: tabela };
};

export const addTabelaModoAnalista = (tabela) => {
  return { type: actionTypes.ADD_TABELA_MODOANALISTA, tabela: tabela };
};
