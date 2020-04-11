import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hof/Aux/Auxiliar';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import Coluna from '../../components/ObjectsConstructors/Coluna';
import Celula from '../../components/ObjectsConstructors/Cell';
import * as actionTypes from '../../store/actions';

class NovaAcao extends Component {
	state = {
		colunas: ['Código', 'Tipo', 'Setor', 'Distribuiçao', 'Investido'],
		Nome: '',
		Tipo: 'Ação',
		Codigo: '',
		Setor: ''
	};

	handleChange = event => {
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
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(this.state)
		};

		try {
			await axios(settings);
			let acoes = await axios.get('/acoes');
			this.geraDadosTabelaHome(acoes.data.acoes);
			this.geraDadosTabelaModoAnalista(acoes.data.acoes);
		} catch (error) {
			console.log(error);
		}
	};
	geraDadosTabelaHome = data => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		let totalInvestido = 0;
		this.state.colunas.forEach(element => {
			arr2.push(new Coluna(element, { tipo: 'Normal' }));
		});

		////////////////////////////////////////

		//Calcula o total
		let total = 0;
		if (data[0]) {
			total = data.reduce((acc, cV, index) => {
				if (index === 1) {
					acc = acc.Investido.vlrTotal;
				}

				return acc + cV.Investido.vlrTotal;
			});
		}

		//Empura os valores do Objeto em Array
		//BODY
		data.forEach((value, index) => {
			let distribuicao = Math.round((value.Investido.vlrTotal / total) * 100);

			let investido = value.Investido.vlrTotal;

			let key = index + 1;
			arr2[0][key] = new Celula(value.Codigo, null);
			arr2[1][key] = new Celula(value.Tipo, null);
			arr2[2][key] = new Celula(value.Setor, null);
			arr2[3][key] = new Celula(`${distribuicao} %`, null);
			arr2[4][key] = new Celula(formatter.format(investido), null);

			totalInvestido += investido;
		});

		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUECÃ

		let key = Object.keys(arr2[0]).length - 1;

		arr2[0][key] = new Celula('TOTAL', {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[1][key] = new Celula('', { backgroundColor: 'black' });
		arr2[2][key] = new Celula('', { backgroundColor: 'black' });
		arr2[3][key] = new Celula('', { backgroundColor: 'black' });
		arr2[4][key] = new Celula(formatter.format(totalInvestido), {
			backgroundColor: 'black',
			color: 'white'
		});

		//////////////////////////////////////////////

		this.props.onTabelaAddedHome(arr2);
	};

	geraDadosTabelaModoAnalista = (data, precoDeMercadoHoje) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});
		let totalDeAcoes = 0;
		let totalValorPatrimonial = 0;
		let totalValorPatrimonialDeMercado = 0;
		let totalValorizacaoPatrimonialRS = 0;
		let totalValorizacaoPatrimonialPer = 0;
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		this.state.colunas.forEach(element => {
			if (element === 'Preço De Mercado Hoje') {
				arr2.push(new Coluna(element, { tipo: 'Input', funcao: this.handleBlur }));
			} else {
				arr2.push(new Coluna(element, { tipo: 'Normal' }));
			}
		});

		////////////////////////////////////////

		//Empura os valores do Objeto em Array
		//BODY
		data.forEach((value, index) => {
			let valorPatrimonial = value.Investido.qntTotal * value.Investido.precoMedio;
			totalDeAcoes += value.Investido.qntTotal;
			totalValorPatrimonial += valorPatrimonial;
			let valorPatrimonialDeMercado =
				value.Investido.qntTotal * precoDeMercadoHoje;

			totalValorPatrimonialDeMercado += valorPatrimonialDeMercado;

			let valorizacaoPatrimonialRS =
				parseFloat(valorPatrimonialDeMercado) - parseFloat(valorPatrimonial);
			let valorizacaoPatrimonialPer = valorizacaoPatrimonialRS / valorPatrimonial;
			totalValorizacaoPatrimonialPer += valorizacaoPatrimonialPer;
			totalValorizacaoPatrimonialRS += valorizacaoPatrimonialRS;
			let color = 'red';
			if (valorizacaoPatrimonialRS > 0) {
				color = 'blue';
			}

			let key = index + 1;
			arr2[0][key] = new Celula(value.Nome, null);
			arr2[1][key] = new Celula(value.Investido.qntTotal, null);
			arr2[2][key] = new Celula(
				formatter.format(value.Investido.precoMedio),
				null
			);
			arr2[3][key] = new Celula(formatter.format(valorPatrimonial), null);
			arr2[4][key] = new Celula(formatter.format(precoDeMercadoHoje), null);
			arr2[5][key] = new Celula(formatter.format(valorPatrimonialDeMercado), null);
			arr2[6][key] = new Celula(formatter.format(valorizacaoPatrimonialRS), {
				color: color
			});
			arr2[7][key] = new Celula(`${valorizacaoPatrimonialPer.toFixed(2)}  %`, {
				color: color
			});
		});

		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUEÇA
		let key = Object.keys(arr2[0]).length - 1;

		arr2[0][key] = new Celula('TOTAL', {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[1][key] = new Celula(totalDeAcoes, {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[2][key] = new Celula('', { backgroundColor: 'black' });
		arr2[3][key] = new Celula(formatter.format(totalValorPatrimonial), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[4][key] = new Celula('', { backgroundColor: 'black' });
		arr2[5][key] = new Celula(formatter.format(totalValorPatrimonialDeMercado), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[6][key] = new Celula(formatter.format(totalValorizacaoPatrimonialRS), {
			backgroundColor: 'black',
			color: 'white'
		});
		arr2[7][key] = new Celula(`${totalValorizacaoPatrimonialPer.toFixed(2)} %`, {
			backgroundColor: 'black',
			color: 'white'
		});

		this.props.onTabelaAddedModoAnalista(arr2);
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

const mapDispatchToProps = dispatch => {
	console.log('despachado');
	return {
		onTabelaAddedHome: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA_HOME, tabela: tabela });
		},
		onTabelaAddedModoAnalista: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA_MODOANALISTA, tabela: tabela });
		}
	};
};

export default connect(null, mapDispatchToProps)(NovaAcao);
