# Kinvo — Desafio Front-end (implementação)

Este repositório contém uma implementação completa do Desafio Kinvo Front-end (nível Pleno), construída com React + Vite + Styled Components.

Principais funcionalidades entregues

- Busca / Filtragem por texto na seção "Minhas Rendas Fixas"
- Ordenação por nome e rentabilidade via seletor
- Paginação com 5 itens por página
- Consumo de dados reais da API: `https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData`
- Testes unitários (Vitest + Testing Library) cobrindo fetch, busca e paginação
- CI básico com GitHub Actions executando os testes

Tecnologias

- React 18 (componentes funcionais + hooks)
- Styled Components para estilos isolados
- Vite para dev server e build
- Vitest + Testing Library para testes

Arquitetura e organização

- `src/App.jsx` — ponto de entrada da UI e regras de apresentação
- `src/index.css` — estilos globais mínimos
- `src/__tests__/App.test.jsx` — testes automatizados
- `public` / `index.html` — ponto de entrada HTML servida pelo Vite

Decisões técnicas e justificativas

- Usei Vite para velocidade no desenvolvimento e compatibilidade com ESM.
- Optei por `styled-components` para atender requisito do desafio e manter estilos em componentes.
- Vitest foi escolhido para testes por sua integração nativa com Vite e por prover ambiente similar ao Jest com melhor velocidade; é uma escolha válida conforme a especificação "framework de sua preferência".

Como rodar localmente

1. Instale dependências

```bash
npm install
```

2. Rode em modo desenvolvimento

```bash
npm run dev
```

3. Execute testes

```bash
npm test
```

Arquivos importantes

- `src/App.jsx` — componente principal com busca, ordenação e paginação.
- `src/index.css` — estilos globais.
- `src/__tests__/App.test.jsx` — testes unitários.
- `.github/workflows/ci.yml` — fluxo CI para executar testes em push/PR.

Checklist de requisitos

- [x] Filtragem por texto (Trainee/Estágio)
- [x] Consumo da API real (Junior)
- [x] Ordenação via seletor (Junior)
- [x] React + Styled Components + Paginação 5 por página (Pleno)
- [x] Testes automatizados e CI (melhoria além do mínimo)

Sugestões de melhorias futuras

- Adicionar gráficos interativos por produto (Highcharts / Recharts) — boa demonstração para níveis Sênior.
- Aumentar cobertura de testes e introduzir testes E2E (Cypress) para fluxo completo.
- Extrair componentes menores (`ProductCard`, `Pagination`, `Controls`) para melhorar testabilidade e reuso.
- Adicionar TypeScript para segurança de tipos e escalabilidade.

Commit messages (sugestão)

- Use Conventional Commits para ajudar o avaliador a entender a história do projeto. Exemplos:
	- `feat: add pagination component`
	- `fix: handle empty API response`
	- `test: add unit tests for search`

PR template

Ao abrir o PR, inclua:
- Título claro (feat/fix/chore)
- Descrição com o que foi implementado
- Como rodar e verificar as mudanças


Preparando o pull request

- Branch enviada: `feat/kinvo-implementation` no seu fork.
- Sugestão de título: `feat: implement Kinvo Front-end challenge — React + Styled Components`
- Sugestão de corpo: veja o arquivo `README.md` — seção "Como rodar localmente" e a lista de features entregues.

Se quiser, eu posso abrir o PR automaticamente se você me fornecer um token GitHub com permissões `repo` (opcional). Caso prefira, crie o PR manualmente apontando de `giselleandrade1/kinvo-frontend.test:feat/kinvo-implementation` para `kinvoapp/kinvo-front-end-test:master` (ou `main`).

---

Boa sorte na avaliação — se quiser, eu posso agora:

- Adicionar gráficos funcionais por produto;
- Refatorar a UI para combinar 100% com os ativos em `/material`;
- Melhorar a arquitetura separando em componentes e adicionando TypeScript.
