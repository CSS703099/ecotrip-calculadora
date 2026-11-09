import { precoPorTonelada } from './config.js';

const numero = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const fracao = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 7 });
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function preencherCidades(lista, cidades) {
  lista.replaceChildren(...cidades.map(cidade => {
    const opcao = document.createElement('option');
    opcao.value = cidade;
    return opcao;
  }));
}

export function exibirResultado(painel, resultado, modal, origemDaDistancia) {
  painel.querySelector('#distancia-total').textContent = `${numero.format(resultado.distanciaTotal)} km`;
  painel.querySelector('#emissao-total').textContent = `${numero.format(resultado.emissao)} kg CO₂e`;
  painel.querySelector('#origem-distancia').textContent = origemDaDistancia;
  painel.querySelector('#creditos').textContent = fracao.format(resultado.creditos);
  painel.querySelector('#custo').textContent = moeda.format(resultado.custo);
  painel.querySelector('#preco-base').textContent = `${moeda.format(precoPorTonelada)} por t CO₂e`;

  const maiorEmissao = Math.max(...resultado.comparacao.map(({ kg }) => kg));
  const linhas = resultado.comparacao.map(meio => {
    const linha = document.createElement('li');
    linha.className = meio.id === modal ? 'comparison__row comparison__row--selected' : 'comparison__row';
    const nome = document.createElement('span');
    nome.textContent = meio.id === modal ? `${meio.nome} · selecionado` : meio.nome;
    const barra = document.createElement('meter');
    barra.min = 0;
    barra.max = maiorEmissao;
    barra.value = meio.kg;
    barra.setAttribute('aria-label', `Emissão estimada de ${meio.nome}`);
    const valor = document.createElement('strong');
    valor.textContent = `${numero.format(meio.kg)} kg`;
    linha.append(nome, barra, valor);
    return linha;
  });
  painel.querySelector('#comparacao').replaceChildren(...linhas);
  painel.hidden = false;
  painel.focus({ preventScroll: true });
}
