import * as actionTypes from '../actions';

const initialState = {
	dados: [],
	tabela: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_DADOS:
			return {
				...state,
				dados: action.dados
			};

		case actionTypes.ADD_TABELA:
			return {
				...state,
				tabela: action.tabela
			};
		default:
			return state;
	}
};

export default reducer;
