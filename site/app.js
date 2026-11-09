import { calcularViagem } from './calculator.js';
import { cidades, distanciaDaRota, mesmaCidade } from './rotas.js';
import { exibirResultado, preencherCidades } from './ui.js';

const formulario = document.querySelector('#viagem');
const painel = document.querySelector('#resultado');
const mensagem = document.querySelector('#mensagem');

preencherCidades(document.querySelector('#cidades'), cidades);

formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  painel.hidden = true;
  mensagem.textContent = '';

  const dados = new FormData(formulario);
  const origem = String(dados.get('origem'));
  const destino = String(dados.get('destino'));
  const entradaManual = dados.get('distancia');
  const manual = entradaManual !== '';
  const distancia = manual ? Number(entradaManual) : distanciaDaRota(origem, destino);

  try {
    if (!origem.trim() || !destino.trim()) {
      throw new Error('Informe a origem e o destino da viagem.');
    }
    if (mesmaCidade(origem, destino) && !manual) {
      throw new Error('Para um trajeto dentro da mesma cidade, informe a distância manual.');
    }
    if (distancia === null) {
      throw new Error('Rota fora da base simulada. Informe a distância de ida manualmente.');
    }
    const modal = dados.get('transporte');
    const resultado = calcularViagem(distancia, modal, dados.has('ida-volta'));
    const origemDaDistancia = manual ? 'Distância informada manualmente' : 'Distância da base simulada';
    exibirResultado(painel, resultado, modal, origemDaDistancia);
  } catch (erro) {
    mensagem.textContent = erro.message;
  }
});
