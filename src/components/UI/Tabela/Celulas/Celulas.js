import React from 'react';
import Classes from './Celulas.module.css';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Celulas = (props) => {
	let celulas = [];
	if (props.data.length > 0) {
		let horizontal = {};
		let qnt = Object.keys(props.data[0]).length - 2;

		props.data.forEach((coluna, index) => {
			if (index === 0) {
				for (let posicao = 1; posicao <= qnt; posicao++) {
					const valor = coluna[posicao];
					valor.codigo = valor.valor;
					valor.coluna = coluna.nome;
					valor.tipo = coluna.tipo;
					horizontal[posicao] = [valor];
				}
			} else {
				for (let posicao = 1; posicao <= qnt; posicao++) {
					const valor = coluna[posicao];
					valor.codigo = '';
					valor.coluna = coluna.nome;
					valor.tipo = coluna.tipo;
					horizontal[posicao].push(valor);
				}
			}
		});

		for (let posicao = 1; posicao <= qnt; posicao++) {
			const valores = horizontal[posicao];
			let codigo;
			let coluna;
			let tipo;

			let campos = valores.map((valor, index) => {
				if (valor.codigo) {
					codigo = valor.codigo;
				}

				coluna = valores[index].coluna;
				tipo = valores[index].tipo;
				let estilo = null;
				if (valor.estilo) {
					estilo = valor.estilo;
				}

				if (tipo.tipo === 'Normal') {
					return (
						<td
							className={Classes.Cell}
							onClick={props.clicked}
							style={estilo}
							data-codigo={codigo}
							data-posicao={`${coluna}/${posicao}`}
							key={index}>
							{valor.valor}{' '}
						</td>
					);
				} else if (tipo.tipo === 'Input') {
					return (
						<td
							key={index}
							data-codigo={codigo}
							onClick={props.clicked}
							className={Classes.Cell}>
							<input
								data-codigo={codigo}
								data-posicao={`${coluna}/${posicao}`}
								onBlur={tipo.funcao}
							/>
						</td>
					);
				}
				return null;
			});

			if (props.icone && posicao !== qnt) {
				campos.push(
					<td
						key={Math.random}
						className={Classes.IconeDiv}
						data-codigo={codigo}
						onClick={props.icone}>
						<FontAwesomeIcon
							className={Classes.Icone}
							key={posicao + 1}
							data-codigo='Icone'
							icon={faMinusSquare}
							size='1x'
						/>
					</td>
				);
			}

			let linha = (
				<tr key={posicao} data-codigo={codigo}>
					{campos}
				</tr>
			);

			celulas.push(linha);
		}
		return <tbody>{celulas}</tbody>;
	}
	return null;
};

export default Celulas;
