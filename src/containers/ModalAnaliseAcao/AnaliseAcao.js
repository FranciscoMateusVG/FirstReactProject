import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabela from '../../components/UI/Tabela/Tabela';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './AnaliseAcao.module.css';
import Coluna from '../../components/ObjectsConstructors/Coluna';
import Celula from '../../components/ObjectsConstructors/Cell';
import * as actionTypes from '../../store/actions';

class AnaliseAcao extends Component {
	state = {
		dados: '',
		colunas: [
			'Data de Compra',
			'Quantidade',
			'Preço de Compra',
			'Valor de Compra'
		],
		nomeAcao: this.props.nomeAcao,
		modal: false,
		Data: '',
		Quantidade: '',
		PrecoDaCompra: '',
		atualiza: ''
	};

	async componentDidMount() {
		let acao = await axios.get(`/acoes/${this.state.nomeAcao}`);
		let tabela = this.geraDadosTabela(acao.data.Data);
		this.setState({ modal: true });
		this.props.onTabelaAdded(tabela);
		console.log('ali');
	}

	async componentDidUpdate(prevProps, prevState) {
		let acao = await axios.get(`/acoes/${this.state.nomeAcao}`);
		console.log('aqui');

		if (prevState.modal === false) {
			let tabela = this.geraDadosTabela(acao.data.Data);

			this.setState({
				nomeAcao: this.props.nomeAcao,
				modal: true
			});

			this.props.onTabelaAdded(tabela);
		}
	}

	handleChange = event => {
		let nome = event.target.name;
		let valor = event.target.value;
		this.setState({ [nome]: valor });
	};

	clickFecha = () => {
		this.setState({ modal: false });
	};

	geraDadosTabela = data => {
		/////////////////////////////////////////
		/*Pega as colunas*/
		let arr2 = [];
		this.state.colunas.forEach(element => {
			arr2.push(new Coluna(element, { tipo: 'Normal' }));
		});

		////////////////////////////////////////

		//Empura os valores do Objeto em Array
		//BODY
		data.forEach((value, index) => {
			let valorDeCompra = value.quantidade * value.preco;
			let data = value.data.slice(0, 10).split('-');
			data = `${data[2]} / ${data[1]} / ${data[0]}`;

			let key = index + 1;
			arr2[0][key] = new Celula(data, null);
			arr2[1][key] = new Celula(parseInt(value.quantidade), null);
			arr2[2][key] = new Celula(parseFloat(value.preco), null);
			arr2[3][key] = new Celula(valorDeCompra, null);
		});

		//O FOOTER FICA AQUI MATEUS NÃO SE ESQUECÃ

		return arr2;

		//		this.props.onTabelaAdded(arr2);
	};

	adicionaAcao = async () => {
		let data = this.state.Data,
			quantidade = this.state.Quantidade,
			precoDaCompra = this.state.PrecoDaCompra;

		if (data && quantidade && precoDaCompra) {
			precoDaCompra = precoDaCompra.replace(',', '.');
			data = data + 'T00:00:00.000Z';

			let obj = {
				data: data,
				quantidade: quantidade,
				preco: precoDaCompra
			};

			let settings = {
				url: `/acoes/${this.state.nomeAcao}`,
				method: 'PUT',
				timeout: 0,
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(obj)
			};

			try {
				await axios(settings);

				this.setState({
					dados: this.state.dados.concat(this.geraDadosTabela([obj]))
				});
				this.props.atualizaTabelaPai();

				let acao = await axios.get(`/acoes/${this.state.nomeAcao}`);
				let tabela = this.geraDadosTabela(acao.data.Data);

				this.props.onTabelaAdded(tabela);
			} catch (error) {
				console.log(error);
			}
		} else alert('PREENCHA TODOS OS CAMPOS');
	};

	render() {
		return (
			<Modal
				header={'Detalhes Ação:  ' + this.state.nomeAcao}
				show={this.state.modal}
				clicked={this.clickFecha}>
				<div className={classes.Modal}>
					<Tabela
						colunas={this.props.tabelaAnaliseAcao}
						data={this.props.tabelaAnaliseAcao}></Tabela>
					<div className={classes.Caixa} id='div-caixa'>
						<form className={classes.Form}>
							<Input
								label='Data'
								type='date'
								name='Data'
								id='data'
								placeholder='Data da Compra'
								aria-describedby='helpId'
								value={this.state.nome}
								onChange={this.handleChange}
							/>
							<Input
								label='Quantidade'
								type='number'
								name='Quantidade'
								id='quantidade'
								placeholder='Quantidade Comprada'
								aria-describedby='helpId'
								value={this.state.codigo}
								onChange={this.handleChange}
							/>
							<Input
								label='Preço Da Compra'
								type='text'
								name='PrecoDaCompra'
								id='precoDaCompra'
								placeholder='Preço Unitario da Compra'
								aria-describedby='helpId'
								value={this.state.setor}
								onChange={this.handleChange}
							/>
							<div className={classes.IconeBox} id='icone'>
								<FontAwesomeIcon
									onClick={this.adicionaAcao}
									icon={faPlus}
									size='2x'
									className={classes.Icone}
								/>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		tabelaAnaliseAcao: state.tabelaAnaliseAcao,
		tabelaHome: state.tabelaHome
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTabelaAdded: tabela => {
			dispatch({ type: actionTypes.ADD_TABELA_ANALISEACAO, tabela: tabela });
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnaliseAcao);
