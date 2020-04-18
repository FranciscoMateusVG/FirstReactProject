import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hof/Aux/Auxiliar';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import * as actionTypes from '../../store/actions';
import {
	geraDadosTabelaModoAnalista,
	geraDadosTabelaHome,
} from '../../functions/geraTabelas';

class NovaAcao extends Component {
	state = {
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		Nome: '',
		Tipo: 'Ação',
		Codigo: '',
		Setor: '',
	};

	handleChange = (event) => {
		let nome = event.target.name;
		let valor = event.target.value;
		this.setState({ [nome]: valor });
	};

	clickSalva = async () => {
		let settings = {
			url: '/acoes',
			method: 'POST',
			timeout: 0,
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(this.state),
		};

		try {
			await axios(settings);
			let acoes = await axios.get('/acoes');

			//!Tabela Home
			let novaTabelaHome = geraDadosTabelaHome(
				acoes.data.acoes,
				this.state.colunas
			);

			this.props.onTabelaAddedHome(novaTabelaHome);

			//!Tabela Modo Analista
			let novaTabelaModoAnalista = geraDadosTabelaModoAnalista(
				acoes.data.acoes,
				0,
				[
					'Nome da Ação',
					'Total de Ações',
					'Preço Médio',
					'Valor Patrimonial',
					'Preço De Mercado Hoje',
					'Valor Patrimonial de Mercado',
					'Valorização Patrimonial em R$',
					'Valorização Patrimonial em %',
				]
			);

			this.props.onTabelaAddedModoAnalista(novaTabelaModoAnalista);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<Aux>
				<form>
					<Input
						label='Nome'
						type='text'
						name='Nome'
						id='nomeAcao'
						placeholder='Nome da Açao'
						aria-describedby='helpId'
						value={this.state.nome}
						onChange={this.handleChange}
					/>

					<Input
						label='Código'
						type='text'
						name='Codigo'
						id='codigoAcao'
						placeholder='Codigo da Açao'
						aria-describedby='helpId'
						value={this.state.codigo}
						onChange={this.handleChange}
					/>
					<Input
						label='Setor'
						type='text'
						name='Setor'
						id='setorAcao'
						placeholder='Setor da Açao'
						aria-describedby='helpId'
						value={this.state.setor}
						onChange={this.handleChange}
					/>

					<Input
						inputtype='select'
						label='Tipo'
						options={['Ação', 'Fundo Imobiliário']}
						name='Tipo'
						id='tipoAcao'
						value={this.state.tipoAcao}
						onChange={this.handleChange}
					/>
				</form>

				<Button btnType='Success'>Cancelar</Button>
				<Button btnType='Danger' clicked={this.clickSalva}>
					Salvar
				</Button>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dados: state.dados,
		tabelaModoAnalista: state.tabelaModoAnalista,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTabelaAddedHome: (tabela) => {
			dispatch({ type: actionTypes.ADD_TABELA_HOME, tabela: tabela });
		},
		onTabelaAddedModoAnalista: (tabela) => {
			dispatch({ type: actionTypes.ADD_TABELA_MODOANALISTA, tabela: tabela });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NovaAcao);
