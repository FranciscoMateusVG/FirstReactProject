import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  dados: [],
  tabelaHome: [],
  tabelaAnaliseAcao: [],
  tabelaModoAnalista: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Adiciona Dados
    case actionTypes.ADD_DADOS:
      return {
        ...state,
        dados: action.dados,
      };
    //Adiciona nas respectivas tabelas
    case actionTypes.ADD_TABELA_HOME:
      return {
        ...state,
        tabelaHome: action.tabela,
      };
    case actionTypes.ADD_TABELA_ANALISEACAO:
      return {
        ...state,
        tabelaAnaliseAcao: action.tabela,
      };
    case actionTypes.ADD_TABELA_MODOANALISTA:
      return {
        ...state,
        tabelaModoAnalista: action.tabela,
      };

    default:
      return state;
  }
};

export default reducer;
