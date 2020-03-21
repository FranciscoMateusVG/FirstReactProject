import React, { Component } from 'react';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../../hof/Aux/Auxiliar';
import classes from './Home.module.css';
import NovaAcao from '../../components/ModalNovaAcao/NovaAcao';

class Home extends Component {
	state = {
		acoes: [],
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		novaAcao: false
	};

	async componentDidMount() {
		let acoes = await axios.get('http://localhost:8080/acoes');
		let data = this.geraDadosTabela(acoes.data.acoes);

		this.setState(prevState => (prevState.acoes = data));
	}

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	cancelaNovaAcaoHandler = () => {
		this.setState({ novaAcao: false });
	};

	geraDadosTabela = data => {
		//Calcula o total
		let total = data.reduce((acc, cV, index) => {
			if (index === 1) {
				acc = acc.Investido.qntTotal;
			}

			return acc + cV.Investido.qntTotal;
		});

		//Empura os valores do Objeto em Array
		let arr = data.map(value => {
			let distribuicao = Math.round((value.Investido.qntTotal / total) * 100);
			let formatter = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			});
			let investido = formatter.format(value.Investido.vlrTotal);

			return [
				value.Codigo,
				value.Tipo,
				value.Setor,
				`${distribuicao} %`,
				investido
			];
		});

		return arr;
	};

	render() {
		return (
			<Aux>
				<Modal
					header='Nova Ação'
					show={this.state.novaAcao}
					clicked={this.cancelaNovaAcaoHandler}>
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

export default Home;
