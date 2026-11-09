const rotas = [
  ['Rio de Janeiro', 'Cabo Frio', 155],
  ['Cabo Frio', 'Arraial do Cabo', 13],
  ['Rio de Janeiro', 'Arraial do Cabo', 165],
  ['Cabo Frio', 'Armação dos Búzios', 25],
  ['Cabo Frio', 'Macaé', 75],
  ['Rio de Janeiro', 'São Paulo', 430],
  ['Rio de Janeiro', 'Belo Horizonte', 440],
  ['São Paulo', 'Curitiba', 410],
  ['São Paulo', 'Belo Horizonte', 585],
  ['Curitiba', 'Florianópolis', 305],
  ['Brasília', 'Goiânia', 210],
  ['Recife', 'João Pessoa', 120],
  ['Salvador', 'Aracaju', 325],
];

export const cidades = [...new Set(rotas.flatMap(([origem, destino]) => [origem, destino]))]
  .sort((a, b) => a.localeCompare(b, 'pt-BR'));

function normalizar(cidade) {
  return cidade.trim().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ').toLowerCase();
}

export function distanciaDaRota(origem, destino) {
  const a = normalizar(origem);
  const b = normalizar(destino);
  return rotas.find(([x, y]) => (
    (normalizar(x) === a && normalizar(y) === b) ||
    (normalizar(x) === b && normalizar(y) === a)
  ))?.[2] ?? null;
}

export function mesmaCidade(origem, destino) {
  return normalizar(origem) === normalizar(destino);
}
