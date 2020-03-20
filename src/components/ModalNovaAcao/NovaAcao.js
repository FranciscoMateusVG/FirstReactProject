import React from 'react';
import Aux from '../../hof/Aux/Auxiliar';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'

const NovaAcao = props => {
  return (
    <Aux>
      <form>
        <Input 
            label='Nome'
            type="text"
            name="nome"
            id="nomeAcao"
            placeholder="Nome da Açao"
            aria-describedby="helpId"
          />

        <Input 
            label='Código'
            type="text"
            name="codigo"
            id="codigoAcao"
            placeholder="Codigo da Açao"
            aria-describedby="helpId"
          />
        <Input 
            label='Setor'
            type="text"
            name="setor"
            id="setorAcao"
            placeholder="Setor da Açao"
            aria-describedby="helpId"
          />
       
        <Input
          inputtype='select'
          label='Tipo'
          options={['Ação', 'Fundo Imobiliário']}
          name="tipoAcao"
          id="tipoAcao" />
 
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
