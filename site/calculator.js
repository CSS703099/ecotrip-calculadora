import { precoPorTonelada, transportes } from './config.js';

export function calcularViagem(distancia, modal, idaEVolta = false) {
  if (!Number.isFinite(distancia) || distancia <= 0 || distancia > 100000) {
    throw new RangeError('Informe uma distância de ida maior que zero e de até 100.000 km.');
  }
  if (!Object.hasOwn(transportes, modal)) {
    throw new RangeError('Selecione um meio de transporte.');
  }

  const distanciaTotal = idaEVolta ? distancia * 2 : distancia;
  const comparacao = Object.entries(transportes).map(([id, meio]) => ({
    id,
    nome: meio.nome,
    kg: distanciaTotal * meio.fator,
  }));
  const emissao = comparacao.find(({ id }) => id === modal).kg;
  const creditos = emissao / 1000;
  return {
    distanciaTotal,
    emissao,
    creditos,
    custo: creditos * precoPorTonelada,
    comparacao,
  };
}
