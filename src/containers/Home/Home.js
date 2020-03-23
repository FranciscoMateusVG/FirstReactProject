import React, { Component } from 'react';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Aux from '../../hof/Aux/Auxiliar';
import classes from './Home.module.css';
import NovaAcao from '../../containers/ModalNovaAcao/NovaAcao';
import AnaliseAcao from '../../containers/ModalAnaliseAcao/AnaliseAcao';

class Home extends Component {
	state = {
		dados: [],
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		novaAcao: false,
		html: ''
	};

	async componentDidMount() {
		let acoes = await axios.get('/acoes');
		let data = this.geraDadosTabela(acoes.data.acoes);

		this.setState(prevState => (prevState.dados = data));
	}

	clickFecha = () => {
		this.setState({ novaAcao: false });
	};

	novaAcaoHandler = () => {
		this.setState({ novaAcao: true });
	};

	abreModalAnaliseAcao = event => {
		let nomeAcao = event.target.getAttribute('data');
		//console.log(event.target.getAttribute('data'));

		this.setState(
			prevState =>
				(prevState.html = (
					<AnaliseAcao nomeAcao={nomeAcao} show={true}></AnaliseAcao>
				))
		);
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
					clicked={this.clickFecha}>
					<NovaAcao />
				</Modal>

				<Tabela
					colunas={this.state.colunas}
					data={this.state.dados}
					clicked={this.abreModalAnaliseAcao}
				/>

				{this.state.html}
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
