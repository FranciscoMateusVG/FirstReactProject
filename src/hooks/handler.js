import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import formata from "../utilities/formataDoido";
import { addTabelaModoAnalista } from "../store/actions/tabelas";

const useHandler = () => {
  //Seletor
  const tabelaModoAnalista = useSelector((state) => state.tabelaModoAnalista);

  //Despachantes
  const dispatch = useDispatch();
  const onTabelaAddedModoAnalista = useCallback(
    (tabela) => dispatch(addTabelaModoAnalista(tabela)),
    [dispatch]
  );

  //?Função AtualizaBlur
  const atualizaModoAnalista = useCallback(
    (posicao, valor) => {
      let tabelaAtualizada = formata(tabelaModoAnalista, posicao, valor);

      onTabelaAddedModoAnalista(tabelaAtualizada);
    },
    [tabelaModoAnalista, onTabelaAddedModoAnalista]
  );

  return atualizaModoAnalista;
};

export default useHandler;
