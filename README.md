# Desafio Kinvo Front-End Web

<div align="center">

![Logo Kinvo](./logo.svg)

**Implementação do Desafio Kinvo Front-End Web**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Styled Components](https://img.shields.io/badge/Styled%20Components-6-DB7092?logo=styled-components)](https://styled-components.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

</div>

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação e Setup](#instalação-e-setup)
- [Como Rodar a Aplicação](#como-rodar-a-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Utilizada](#api-utilizada)

---

## 🎯 Sobre o Projeto

Este projeto implementa o desafio proposto pela Kinvo para avaliar habilidades de desenvolvimento front-end. A solução foi construída em **React com Styled Components**, consumindo dados reais de uma API mock e oferecendo funcionalidades completas de filtro, ordenação e paginação.

***Obs: Esse projeto foi desenvolvido a partir de um desafio técnico para fins de estudo e portfólio.***

---

## ✨ Funcionalidades Implementadas

- [x] **Filtro de Produtos** - Buscar produtos por nome ou classe de ativo em tempo real
- [x] **Ordenação** - 5 opções de ordenação (Nome A-Z, Z-A, Data de Vencimento, Rentabilidade)
- [x] **Consumo de API Real** - Integração com a API Mock da Kinvo
- [x] **Paginação** - 5 produtos por página com controles intuitivos
- [x] **React** - Componentes funcionais com hooks
- [x] **Styled Components** - Estilização modular e escalável
- [x] **Design Responsivo** - Funciona em desktop, tablet e mobile

### 🎁 Bônus Implementados

- ✅ Estatísticas dinâmicas (Total de produtos, rentabilidade)
- ✅ Feedback visual durante carregamento
- ✅ Tratamento de erros robusto
- ✅ Código TypeScript com tipagem forte
- ✅ Código limpo e bem documentado
- ✅ Acessibilidade (labels, ARIA attributes)

---

## 🛠️ Tecnologias Utilizadas

### Principais

- **React 19** - Biblioteca JavaScript para UI
- **TypeScript 5** - Tipagem estática e segurança de tipos
- **Styled Components 6** - CSS-in-JS para estilização de componentes
- **Axios** - Cliente HTTP para requisições à API
- **Vite 7** - Bundler e dev server ultra-rápido

### Desenvolvimento

- **Node.js 18+**
- **npm** - Gerenciador de pacotes

---

## 📦 Requisitos

- **Node.js 18.0.0+** - [Baixar](https://nodejs.org/)
- **npm 9.0.0+** (geralmente vem com Node.js)

Verifique as versões instaladas:

```bash
node --version
npm --version
```

---

## 🚀 Instalação e Setup

### 1️⃣ Clonar o Repositório

```bash
# Clone seu fork do repositório
git clone https://github.com/SEU_USUARIO/kinvo-front-end-test.git
cd kinvo-front-end-test
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

Este comando instalará todas as dependências listadas no `package.json`:

- `react` e `react-dom` - Biblioteca React
- `styled-components` - CSS-in-JS
- `axios` - Cliente HTTP
- `vite` e `@vitejs/plugin-react` - Build tools
- `typescript` e tipos - TypeScript
- Demais dependências auxiliares

### 3️⃣ Configurar Variáveis de Ambiente (Opcional)

Se necessário, crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData
```

Nota: A aplicação utiliza a URL da API diretamente no código.

---

## 📱 Como Rodar a Aplicação

### Desenvolvimento (com Hot Reload)

```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:3000`

**Recursos do modo desenvolvimento:**

- Hot Module Replacement (HMR) - Recarregamento automático
- Source maps - Debugging facilitado
- Compilação rápida

### Build para Produção

```bash
npm run build
```

Cria uma versão otimizada em `dist/`

### Preview do Build

```bash
npm run preview
```

Visualiza a versão produção localmente

---

## 📁 Estrutura do Projeto

```
kinvo-front-end-test/
├── public/                    # Arquivos estáticos
│   ├── index.html            # HTML principal
│   └── logo.svg              # Logo Kinvo
│
├── src/                       # Código fonte
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── Header.tsx        # Cabeçalho da página
│   │   ├── FilterControls.tsx# Filtro e ordenação
│   │   ├── FixedIncomeTable.tsx# Tabela de produtos
│   │   └── Pagination.tsx    # Controles de paginação
│   │
│   ├── pages/               # Páginas/layouts
│   │   └── Home.tsx         # Página principal (orquestrador)
│   │
│   ├── services/            # Camada de serviços
│   │   └── api.ts           # Integração com API
│   │
│   ├── styles/              # Estilos globais
│   │   └── global.ts        # Estilos globais com Styled Components
│   │
│   ├── types/               # Definições TypeScript
│   │   └── index.ts         # Interfaces e tipos
│   │
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Ponto de entrada React
│
├── material/                 # Arquivos de design
│   └── layout.xd            # Protótipo Adobe XD
│
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração TypeScript
├── tsconfig.node.json       # Config TS para Vite
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

---

## 🔌 API Utilizada

**URL da API:**

```
https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData
```

**Estrutura de Resposta:**

```json
[
  {
    "id": "1",
    "name": "Tesouro Prefixado 2025",
    "description": "Tesouro Direto",
    "due_date": "2025-01-15T00:00:00.000Z",
    "asset_name": "Tesouro",
    "profitability": 11.25,
    "asset_icon": null,
    "class_name": "Tesouro Direto"
  }
]
```

---

## ✅ Checklist de Implementação

- [x] Setup inicial com Vite + React + TypeScript
- [x] Instalação de dependências (Styled Components, Axios)
- [x] Criação de estrutura de pastas escalável
- [x] Componentes React funcionais
- [x] Integração API com Axios
- [x] Filtro de produtos em tempo real
- [x] Ordenação com múltiplas opções
- [x] Paginação (5 itens por página)
- [x] Estilização com Styled Components
- [x] Design responsivo
- [x] Tratamento de erros
- [x] Estatísticas dinâmicas
- [x] README documentado
- [x] Git com commits claros

---

## 📞 Suporte

Encontrou um problema? Crie uma [Issue](https://github.com/kinvoapp/kinvo-front-end-test/issues) descrevendo:

- O que esperava que acontecesse
- O que realmente aconteceu
- Passos para reproduzir
- Seu ambiente (navegador, SO, versão Node)

---

**Última atualização:** Janeiro 2026

**Status:** ✅ Pronto para Produção
