import Coluna from "../components/ObjectsConstructors/Coluna";
import Celula from "../components/ObjectsConstructors/Cell";

//*Tabela Home
const geraDadosTabelaHome = (data) => {
  console.log("gerador de tabela home");
  let colunas = ["Código", "Tipo", "Setor", "Distribuiçao", "Investido"];
  const { format } = formatter;

  //Pega as colunas
  let tabela = [];
  let totalInvestido = 0;
  colunas.forEach((element) => {
    tabela.push(new Coluna(element, { tipo: "Normal" }));
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

  tabela[0][key] = new Celula("TOTAL", {
    backgroundColor: "black",
    color: "white",
  });
  tabela[1][key] = new Celula("", { backgroundColor: "black" });
  tabela[2][key] = new Celula("", { backgroundColor: "black" });
  tabela[3][key] = new Celula("", { backgroundColor: "black" });
  tabela[4][key] = new Celula(format(totalInvestido), {
    backgroundColor: "black",
    color: "white",
  });

  return tabela;
};

//*Tabela Modo Analista
const geraDadosTabelaModoAnalista = (data, precoDeMercadoHoje) => {
  const { format } = formatter;
  console.log("gerador de tabela modo analista");
  let colunas = [
    "Nome da Ação",
    "Total de Ações",
    "Preço Médio",
    "Valor Patrimonial",
    "Preço De Mercado Hoje",
    "Valor Patrimonial de Mercado",
    "Valorização Patrimonial em R$",
    "Valorização Patrimonial em %",
  ];
  let totalDeAcoes = 0;
  let totalValorPatrimonial = 0;
  let totalValorPatrimonialDeMercado = 0;
  let totalValorizacaoPatrimonialRS = 0;
  let totalValorizacaoPatrimonialPer = 0;

  //Pega as colunas
  let tabela = [];
  colunas.forEach((element) => {
    if (element === "Preço De Mercado Hoje") {
      tabela.push(
        new Coluna(element, {
          tipo: "Input",
          funcao: (event) => handleBlurModoAnalista(event, atualizaOnBlur),
        })
      );
    } else {
      tabela.push(new Coluna(element, { tipo: "Normal" }));
    }
  });

  //BODY
  data.forEach((value, index) => {
    let valorPatrimonial =
      value.Investido.qntTotal * value.Investido.precoMedio;
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
    let color = "red";
    if (valorizacaoPatrimonialRS > 0) {
      color = "blue";
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

  tabela[0][key] = new Celula("TOTAL", {
    backgroundColor: "black",
    color: "white",
  });
  tabela[1][key] = new Celula(totalDeAcoes, {
    backgroundColor: "black",
    color: "white",
  });
  tabela[2][key] = new Celula("", { backgroundColor: "black" });
  tabela[3][key] = new Celula(format(totalValorPatrimonial), {
    backgroundColor: "black",
    color: "white",
  });
  tabela[4][key] = new Celula("", { backgroundColor: "black" });
  tabela[5][key] = new Celula(format(totalValorPatrimonialDeMercado), {
    backgroundColor: "black",
    color: "white",
  });
  tabela[6][key] = new Celula(format(totalValorizacaoPatrimonialRS), {
    backgroundColor: "black",
    color: "white",
  });
  tabela[7][key] = new Celula(
    `${totalValorizacaoPatrimonialPer.toFixed(2)} %`,
    {
      backgroundColor: "black",
      color: "white",
    }
  );

  return tabela;
};

//Função HandleBlur
const handleBlurModoAnalista = async (event, atualizaOnBlur) => {
  let posicao = event.target.getAttribute("data-posicao").split("/")[1];

  let valor = parseFloat(event.target.value.replace(",", "."));

  atualizaOnBlur(posicao, valor);
};

//Função on Blur
const atualizaOnBlur = (posicao, valor, tabelaAntiga) => {
  let qtd = tabelaAntiga[1][posicao].valor;
  let valorPatrimonial = parseFloat(
    tabelaAntiga[3][posicao].valor
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".")
  );

  let valorPatrimonialDeMercado = qtd * parseFloat(valor);

  let valorizacaoPatrimonialRS =
    parseFloat(valorPatrimonialDeMercado) - valorPatrimonial;

  let valorizacaoPatrimonialPer = valorizacaoPatrimonialRS / valorPatrimonial;

  let color = "red";
  if (valorizacaoPatrimonialRS > 0) {
    color = "blue";
  }

  let posicoes = Object.keys(tabelaAntiga[0]).length - 3;

  let totalValorPatrimonialDeMercado = 0;
  let totalValorPatrimonial;
  let totalValorizacaoPatrimonialRS;
  let totalValorizacaoPatrimonialPer = 0;

  let tabelaAtualizada = tabelaAntiga.map((coluna) => {
    if (coluna.nome === "Preço De Mercado Hoje") {
      coluna[posicao] = new Celula(valor, null);
    }

    if (coluna.nome === "Valor Patrimonial") {
      totalValorPatrimonial = parseFloat(
        coluna[posicoes + 1].valor
          .replace("R$", "")
          .replace(".", "")
          .replace(",", ".")
      );
    }

    if (coluna.nome === "Valor Patrimonial de Mercado") {
      coluna[posicao] = new Celula(
        formatter.format(valorPatrimonialDeMercado),
        null
      );
      for (let posicao = 1; posicao <= posicoes; posicao++) {
        const valor = parseFloat(
          coluna[posicao].valor
            .replace("R$", "")
            .replace(".", "")
            .replace(",", ".")
        );

        totalValorPatrimonialDeMercado += valor;
      }
      coluna[posicoes + 1] = new Celula(
        formatter.format(totalValorPatrimonialDeMercado),
        {
          backgroundColor: "black",
          color: "white",
        }
      );
    }

    if (coluna.nome === "Valorização Patrimonial em R$") {
      coluna[posicao] = new Celula(formatter.format(valorizacaoPatrimonialRS), {
        color: color,
      });

      totalValorizacaoPatrimonialRS =
        totalValorPatrimonialDeMercado - totalValorPatrimonial;
      coluna[posicoes + 1] = new Celula(
        formatter.format(
          totalValorPatrimonialDeMercado - totalValorPatrimonial
        ),
        {
          backgroundColor: "black",
          color: "white",
        }
      );
    }

    if (coluna.nome === "Valorização Patrimonial em %") {
      coluna[posicao] = new Celula(
        `${(valorizacaoPatrimonialPer * 100).toFixed(2)}  %`,
        {
          color: color,
        }
      );
      totalValorizacaoPatrimonialPer =
        (totalValorizacaoPatrimonialRS / totalValorPatrimonial) * 100;

      coluna[posicoes + 1] = new Celula(
        `${totalValorizacaoPatrimonialPer.toFixed(2)} %`,
        {
          backgroundColor: "black",
          color: "white",
        }
      );
    }

    return coluna;
  });

  return tabelaAtualizada;
};

//*Tabela Analise Ação
const geraDadosTabelaAnaliseAcao = (data) => {
  console.log("gerador de tabela Analise Ação");
  let colunas = [
    "Data de Compra",
    "Quantidade",
    "Preço de Compra",
    "Valor de Compra",
  ];
  /*Pega as colunas*/
  let tabela = [];
  colunas.forEach((element) => {
    tabela.push(new Coluna(element, { tipo: "Normal" }));
  });

  //BODY
  data.forEach((value, index) => {
    let valorDeCompra = value.quantidade * value.preco;
    let data = value.data.slice(0, 10).split("-");
    data = `${data[2]} / ${data[1]} / ${data[0]}`;

    let key = index + 1;
    tabela[0][key] = new Celula(data, null);
    tabela[1][key] = new Celula(parseInt(value.quantidade), null);
    tabela[2][key] = new Celula(parseFloat(value.preco), null);
    tabela[3][key] = new Celula(valorDeCompra, null);
  });

  return tabela;
};

//*Formatadores
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export {
  geraDadosTabelaModoAnalista,
  geraDadosTabelaHome,
  geraDadosTabelaAnaliseAcao,
};
