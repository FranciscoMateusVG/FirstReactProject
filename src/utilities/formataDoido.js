import Celula from "../components/ObjectsConstructors/Cell";
//*Formatadores
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formata = (tabelaModoAnalista, posicao, valor) => {
  let qtd = tabelaModoAnalista[1][posicao].valor;
  let valorPatrimonial = parseFloat(
    tabelaModoAnalista[3][posicao].valor
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

  let posicoes = Object.keys(tabelaModoAnalista[0]).length - 3;

  let totalValorPatrimonialDeMercado = 0;
  let totalValorPatrimonial;
  let totalValorizacaoPatrimonialRS;
  let totalValorizacaoPatrimonialPer = 0;

  let tabelaAtualizada = tabelaModoAnalista.map((coluna) => {
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

export default formata;
