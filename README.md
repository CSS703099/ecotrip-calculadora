# EcoTrip — Simulador de impacto ambiental

Projeto final da trilha CI&T — Do Prompt ao Agente, da DIO. Simula a emissão de uma viagem de bicicleta, carro, ônibus ou caminhão e estima a compensação em créditos de carbono.

## Usar

Escolha origem, destino e transporte e clique em **Calcular impacto**. Digite a distância de ida se a rota estiver fora da base ou se quiser substituí-la. A opção de ida e volta dobra a distância. A base traz rotas simuladas, incluindo trajetos na Região dos Lagos.

```bash
python3 -m http.server 8000 --directory site
node --test tests/*.test.js
```

Abra http://localhost:8000 depois de iniciar o servidor. Node 22 ou superior para os testes.

## Cálculo

| Transporte | Fator didático em kg CO₂e/km |
| --- | ---: |
| Bicicleta | 0,000 |
| Carro | 0,192 |
| Ônibus | 0,105 |
| Caminhão | 0,268 |

- Emissões estimadas em kg CO₂e = distância total × fator do transporte.
- Créditos estimados em t CO₂e = emissões em kg CO₂e ÷ 1.000.
- Custo = créditos × R$ 65,00 por tonelada no cenário didático.

Exemplo reproduzível: Rio de Janeiro → Cabo Frio, carro, 155 km. O cálculo resulta em 29,76 kg CO₂e, 0,02976 crédito e R$ 1,93 arredondados na interface. Os fatores, as rotas e o preço são demonstrativos. O cálculo omite ciclo de vida, ocupação real e condições de tráfego. A bicicleta é zero para a operação direta.

## Construção assistida por IA

A sequência foi HTML semântico, estilos BEM com variáveis, base de rotas e configuração, cálculo puro, renderização, eventos e testes. O projeto foi implementado com assistência do Codex. Os prompts podem ser reutilizados no GitHub Copilot.

> Implemente apenas calculator.js. A função calcularViagem(distancia, modal, idaEVolta) deve validar a distância e o modal, devolver distância total, kg de CO₂e, créditos e custo e comparar os quatro meios com os mesmos quilômetros. Mantenha valores sem arredondar e separe o módulo de cálculo da interface.

## Publicação

[Abra a calculadora no GitHub Pages](https://css703099.github.io/ecotrip-calculadora/).

O workflow em [.github/workflows/pages.yml](.github/workflows/pages.yml) roda os testes e publica apenas a pasta site. No GitHub, selecione **Settings → Pages → Source → GitHub Actions** e execute o workflow se necessário.
