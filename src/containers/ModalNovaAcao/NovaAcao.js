import React, { Component } from 'react';
import Aux from '../../hof/Aux/Auxiliar';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

class NovaAcao extends Component {
	state = {
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
		var settings = {
			url: '/acoes',
			method: 'POST',
			timeout: 0,
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(this.state)
		};

		try {
			let testim = await axios(settings);
			console.log(testim);
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

export default NovaAcao;
