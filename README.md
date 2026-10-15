# Telemetria do Carro

App pessoal que grava as viagens usando os sensores do celular (GPS, acelerômetro e giroscópio):
velocidade, distância, tempo parado, curvas à esquerda/direita, frenagens, arrancadas fortes,
mudanças de faixa, forças G, altitude, trajeto colorido pela velocidade e nota de condução.

**Abrir / instalar:** https://huugoliveiraa.github.io/telemetria-carro/
No Chrome do Android: ⋮ → *Instalar app*. No iPhone (Safari): Compartilhar → *Adicionar à Tela de Início*.

Funciona junto com o [Painel do Carro](https://huugoliveiraa.github.io/painel-carro/): mostra o carro
selecionado lá e pode somar os km de cada viagem ao hodômetro. Os dados ficam só no próprio celular.

## Uso
- Celular preso num suporte, app aberto e tela ligada (com o app minimizado o navegador para de entregar o GPS).
- Ajustes → Sensibilidade muda quando frenagens, arrancadas e curvas fortes são contadas.
- Ajustes → Criar viagem de demonstração mostra as telas preenchidas.

## Arquivos
- `index.html`: o app completo
- `manifest.json`: nome, cores e ícones do app instalado
- `sw.js`: service worker (cache para uso offline)
- `icons/`: ícones

## Publicar uma atualização
1. Substitua o `index.html`.
2. No `sw.js`, aumente a versão do cache (`telemetria-v1` → `v2`...).
3. No celular, feche e abra o app duas vezes.
