import Coluna from '../components/ObjectsConstructors/Coluna';
import Celula from '../components/ObjectsConstructors/Cell';

//*Tabela Home
const geraDadosTabelaHome = (data, colunas) => {
	const { format } = formatter;

	//Pega as colunas
	let tabela = [];
	let totalInvestido = 0;
	colunas.forEach((element) => {
		tabela.push(new Coluna(element, { tipo: 'Normal' }));
	});

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

	//BODY
	data.forEach((value, index) => {
		let distribuicao = Math.round((value.Investido.vlrTotal / total) * 100);

		let investido = value.Investido.vlrTotal;

		let key = index + 1;
		tabela[0][key] = new Celula(value.Codigo, null);
		tabela[1][key] = new Celula(value.Tipo, null);
		tabela[2][key] = new Celula(value.Setor, null);
		tabela[3][key] = new Celula(`${distribuicao} %`, null);
		tabela[4][key] = new Celula(format(investido), null);

		totalInvestido += investido;
	});

	//FOOTER

	let key = Object.keys(tabela[0]).length - 1;

	tabela[0][key] = new Celula('TOTAL', {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[1][key] = new Celula('', { backgroundColor: 'black' });
	tabela[2][key] = new Celula('', { backgroundColor: 'black' });
	tabela[3][key] = new Celula('', { backgroundColor: 'black' });
	tabela[4][key] = new Celula(format(totalInvestido), {
		backgroundColor: 'black',
		color: 'white',
	});

	return tabela;
};

//*Tabela Modo Analista

const geraDadosTabelaModoAnalista = (
	data,
	precoDeMercadoHoje,
	colunas,
	atualizaOnBlur
) => {
	const { format } = formatter;
	console.log('gerador de tabela modo analista');

	let totalDeAcoes = 0;
	let totalValorPatrimonial = 0;
	let totalValorPatrimonialDeMercado = 0;
	let totalValorizacaoPatrimonialRS = 0;
	let totalValorizacaoPatrimonialPer = 0;

	//Pega as colunas
	let tabela = [];
	colunas.forEach((element) => {
		if (element === 'Preço De Mercado Hoje') {
			tabela.push(
				new Coluna(element, {
					tipo: 'Input',
					funcao: (event) => handleBlurModoAnalista(event, atualizaOnBlur),
				})
			);
		} else {
			tabela.push(new Coluna(element, { tipo: 'Normal' }));
		}
	});

	//BODY
	data.forEach((value, index) => {
		let valorPatrimonial = value.Investido.qntTotal * value.Investido.precoMedio;
		totalDeAcoes += value.Investido.qntTotal;
		totalValorPatrimonial += valorPatrimonial;
		let valorPatrimonialDeMercado = value.Investido.qntTotal * precoDeMercadoHoje;

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
		tabela[0][key] = new Celula(value.Nome, null);
		tabela[1][key] = new Celula(value.Investido.qntTotal, null);
		tabela[2][key] = new Celula(format(value.Investido.precoMedio), null);
		tabela[3][key] = new Celula(format(valorPatrimonial), null);
		tabela[4][key] = new Celula(format(precoDeMercadoHoje), null);
		tabela[5][key] = new Celula(format(valorPatrimonialDeMercado), null);
		tabela[6][key] = new Celula(format(valorizacaoPatrimonialRS), {
			color: color,
		});
		tabela[7][key] = new Celula(`${valorizacaoPatrimonialPer.toFixed(2)}  %`, {
			color: color,
		});
	});

	//FOOTER
	let key = Object.keys(tabela[0]).length - 1;

	tabela[0][key] = new Celula('TOTAL', {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[1][key] = new Celula(totalDeAcoes, {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[2][key] = new Celula('', { backgroundColor: 'black' });
	tabela[3][key] = new Celula(format(totalValorPatrimonial), {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[4][key] = new Celula('', { backgroundColor: 'black' });
	tabela[5][key] = new Celula(format(totalValorPatrimonialDeMercado), {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[6][key] = new Celula(format(totalValorizacaoPatrimonialRS), {
		backgroundColor: 'black',
		color: 'white',
	});
	tabela[7][key] = new Celula(`${totalValorizacaoPatrimonialPer.toFixed(2)} %`, {
		backgroundColor: 'black',
		color: 'white',
	});

	return tabela;
};

const handleBlurModoAnalista = async (event, atualizaOnBlur) => {
	let posicao = event.target.getAttribute('data-posicao').split('/')[1];

	let valor = parseFloat(event.target.value.replace(',', '.'));

	atualizaOnBlur(posicao, valor);
};

//*Formatadores
const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});
export { geraDadosTabelaModoAnalista, geraDadosTabelaHome };
