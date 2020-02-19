import React from 'react';
import Aux from '../../hof/Auxiliar';
import Button from '../../components/UI/Button/Button';

const NovaAcao = props => {
  return (
    <Aux>
      <h3>Nova Açao</h3>
      <form>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name=""
            id="nomeAcao"
            placeholder="Nome da Açao"
            aria-describedby="helpId"
          />
        </div>
        <div>
          <label>Código</label>
          <input
            type="text"
            name=""
            id="codigoAcao"
            placeholder="Codigo da Açao"
            aria-describedby="helpId"
          />
        </div>
        <div>
          <label>Setor</label>
          <input
            type="text"
            name=""
            id="setorAcao"
            placeholder="Setor da Açao"
            aria-describedby="helpId"
          />
        </div>
        <div>
          <label>Tipo</label>
          <select name="tipoAcao" id="tipoAcao">
            <option>Açao</option>
            <option>Fundo Imobiliario</option>
          </select>
        </div>
      </form>
      <Button btnType="Success" clicked={props.click}>
        Cancelar
      </Button>
      <Button btnType="Danger" clicked={props.click}>
        Salvar
      </Button>
    </Aux>
  );
};

export default NovaAcao;
