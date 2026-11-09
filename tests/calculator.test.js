import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calcularViagem } from '../site/calculator.js';
import { distanciaDaRota, mesmaCidade } from '../site/rotas.js';

test('localiza a rota nos dois sentidos sem distinguir acentos', () => {
  assert.equal(distanciaDaRota(' Rio de Janeiro ', 'Sao Paulo'), 430);
  assert.equal(distanciaDaRota('são paulo', 'RIO DE JANEIRO'), 430);
  assert.equal(distanciaDaRota('São Paulo', 'Macaé'), null);
  assert.equal(mesmaCidade('São  Paulo', 'sao paulo'), true);
});

test('calcula as quatro emissões, os créditos e a compensação', () => {
  const resultado = calcularViagem(155, 'carro');
  assert.equal(resultado.distanciaTotal, 155);
  assert.ok(Math.abs(resultado.emissao - 29.76) < 1e-9);
  assert.ok(Math.abs(resultado.creditos - 0.02976) < 1e-9);
  assert.ok(Math.abs(resultado.custo - 1.9344) < 1e-9);
  assert.equal(resultado.comparacao.length, 4);
  assert.equal(resultado.comparacao.find(meio => meio.id === 'bicicleta').kg, 0);
});

test('dobra o percurso quando há retorno e mantém bicicleta com emissão direta zero', () => {
  const resultado = calcularViagem(13, 'bicicleta', true);
  assert.equal(resultado.distanciaTotal, 26);
  assert.equal(resultado.emissao, 0);
  assert.equal(resultado.custo, 0);
});

test('recusa distâncias inválidas e modal herdado do protótipo', () => {
  for (const distancia of [0, -1, NaN, Infinity, 100001]) {
    assert.throws(() => calcularViagem(distancia, 'carro'), RangeError);
  }
  assert.throws(() => calcularViagem(10, 'constructor'), RangeError);
});
