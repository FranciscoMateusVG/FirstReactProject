import React, { Component } from 'react';
import Tabela from '../components/UI/Tabela/Tabela';
import Modal from '../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../hof/Auxiliar';
import classes from './Acoes.module.css';
import NovaAcao from '../components/NovaAcao/NovaAcao';

class Acoes extends Component {
  state = {
    acoes: {},
    colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
    novaAcao: false
  };

  async componentDidMount() {
    let acoes = await axios.get('http://localhost:8080/acoes');

    this.setState(prevState => (prevState.acoes = acoes.data.acoes));
  }

  novaAcaoHandler = () => {
    this.setState({ novaAcao: true });
  };

  cancelaNovaAcaoHandler = () => {
    this.setState({ novaAcao: false });
  };

  render() {
    return (
      <Aux>
        <Modal show={this.state.novaAcao} click={this.cancelaNovaAcaoHandler}>
          <NovaAcao click={this.cancelaNovaAcaoHandler} />
        </Modal>
        <Tabela colunas={this.state.colunas} data={this.state.acoes} />
        <div className={classes.Teste}>
          <button className={classes.NovaAcao} onClick={this.novaAcaoHandler}>
            Nova Açao
          </button>
        </div>
      </Aux>
    );
  }
}

export default Acoes;
