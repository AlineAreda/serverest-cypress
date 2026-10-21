# 💻 Challenge QA | Automação de Testes API e Web com Cypress — ServeRest

![Cypress](https://img.shields.io/badge/Cypress-16.2.0-17202C)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E)
![Yarn](https://img.shields.io/badge/Yarn-4.5.1-2C8EBB)
![Allure](https://img.shields.io/badge/Report-Allure-FF6A00)

Projeto desenvolvido como **desafio técnico de Quality Assurance**, com foco em automação de testes de **API e interface Web**, organização de código, preparação de dados, validação de regras de negócio e integração contínua.

**Aplicação sob teste:** [ServeRest](https://serverest.dev/) — API REST e aplicação Web de demonstração.

## 📋 Descrição e Estratégia de Testes

A solução utiliza o Cypress para validar comportamentos essenciais do ServeRest em duas camadas:

- **API:** testes diretos dos contratos e comportamentos do endpoint de usuários, sem depender da interface.
- **Web:** testes dos fluxos de autenticação e cadastro de produtos, verificando a experiência do usuário, mensagens e navegação.

Para os cenários Web, operações de apoio como preparação de usuários, autenticação administrativa e exclusão de produtos utilizam requisições à API. Assim, o teste da interface concentra-se nas interações relevantes ao cenário, reduzindo etapas desnecessárias.

✅ **Escopo:** cobertura inicial e representativa dos fluxos selecionados; não pretende ser uma cobertura exaustiva da aplicação.

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Finalidade |
| --- | --- |
| Cypress 16 | Automação de testes API e Web |
| JavaScript | Linguagem dos testes e comandos |
| Node.js / Yarn 4 | Ambiente e gerenciamento de dependências |
| Fixtures JSON | Massa de teste estruturada |
| Custom Commands | Reutilização de ações e validações |
| Allure Report | Resultados e relatórios de execução |
| GitHub Actions | Execução em CI e armazenamento de evidências |

## 🧪 Testes Automatizados

### 🔌 API — Usuários

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CT-001 | Cadastrar administrador | HTTP 201 e ID retornado |
| CT-002 | Cadastrar usuário duplicado | HTTP 400 e mensagem de e-mail já utilizado |
| CT-003 | Consultar usuário por ID | HTTP 200 e dados correspondentes |
| CT-004 | Consultar ID inexistente | HTTP 400 e usuário não encontrado |
| CT-005 | Consultar ID inválido | HTTP 400 e validação do formato do ID |

### 🔐 Web — Login

| ID | Cenário |
| --- | --- |
| CT-WEB-001 | Login de administrador |
| CT-WEB-002 | Login com senha incorreta |
| CT-WEB-003 | Validação de e-mail obrigatório |
| CT-WEB-004 | Validação de senha obrigatória |
| CT-WEB-005 | Login de usuário comum |
| CT-WEB-006 | Logout |

### 📦 Web — Produtos

| ID | Cenário |
| --- | --- |
| CT-WEB-007 | Cadastro de produto com preenchimento e upload de imagem |
| CT-WEB-008 | Validação dos campos obrigatórios no cadastro de produto |

✅ **Total implementado: 13 cenários.** A evidência do Allure abaixo registra uma execução em 21/10/2026 com os 13 testes aprovados (100%). Esse resultado corresponde à execução apresentada, não a uma garantia de sucesso em todas as execuções.

## 📸 Evidências de Execução

### 🎥 Demonstração do Cypress

Registro visual da execução e da organização das suítes automatizadas de API e Web.

[![Demonstração da execução Cypress](https://github.com/user-attachments/assets/93cb4253-6e6f-4a85-a831-4f8885ce2666)](https://github.com/user-attachments/assets/93cb4253-6e6f-4a85-a831-4f8885ce2666)

### 📊 Resultado da execução — Allure Report

Na execução registrada em **21/10/2026**, os **13 cenários foram aprovados (100%)**, distribuídos em **5 testes de API** e **8 testes Web**.

![Relatório Allure com 13 testes aprovados](https://github.com/user-attachments/assets/6806efbf-0d97-47bd-aa3c-bfe349264d8f)

> As evidências foram anexadas ao GitHub. O percentual apresentado refere-se à execução registrada no relatório.

## 📂 Estrutura do Projeto

```text
serverest-cypress/
├── .github/
│   ├── workflows/
│   │   └── cypress.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── usuarios.cy.js
│   │   └── web/
│   │       ├── login.cy.js
│   │       └── produtos.cy.js
│   ├── fixtures/
│   │   ├── imagens/
│   │   ├── login.json
│   │   ├── produtos.json
│   │   └── usuarios.json
│   └── support/
│       ├── commands/
│       │   ├── usuarios.commands.js
│       │   ├── login.commands.js
│       │   └── produtos.commands.js
│       ├── e2e.js
│       └── utils.js
├── cypress.config.js
├── package.json
└── yarn.lock
```

- **`e2e/`**: cenários e assertions.
- **`fixtures/`**: dados reutilizáveis e imagem de upload.
- **`commands/`**: ações de API, navegação, formulários e validações.
- **`utils.js`**: funções puras, incluindo geração de ID e normalização de texto.
- **`cypress.config.js`**: URLs, configurações do Cypress e integração Allure.

## 🚀 Como Executar o Projeto

### 📌 Pré-requisitos e Instalação

- Git
- Node.js 22 (versão utilizada no workflow de CI)
- Corepack / Yarn 4.5.1

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/AlineAreda/serverest-cypress.git
cd serverest-cypress
corepack enable
yarn install
```

Os testes utilizam os ambientes públicos, definidos em `cypress.config.js`:

- **Web:** https://front.serverest.dev
- **API:** https://serverest.dev

Não é necessário subir a aplicação ServeRest localmente para executar a configuração atual.

### 👩‍💻 Executar os Testes

**Modo interativo:**

```bash
yarn cy:open
```

**Toda a suíte em modo headless:**

```bash
yarn cy:run
```

**Somente API:**

```bash
yarn cy:run --spec "cypress/e2e/api/**/*.cy.js"
```

**Somente Web:**

```bash
yarn cy:run --spec "cypress/e2e/web/**/*.cy.js"
```

## 🧹 Gestão de Massa e Isolamento dos Testes

- Dados de usuários e produtos ficam em fixtures JSON.
- Os cenários Web preparam usuários por meio de `garantirUsuarioCadastrado()`: o comando consulta o e-mail, cadastra quando não existe e, para registros existentes, verifica o perfil e autentica com as credenciais esperadas.
- Testes de API de usuários excluem os registros criados ao final do cenário, quando há um ID disponível.
- O cadastro Web de produtos utiliza nome com timestamp para reduzir colisões e tenta excluir o produto criado ao final.
- A autenticação administrativa prepara o usuário, realiza um novo login via API por cenário e disponibiliza o token à aplicação Web, sem reutilizar sessões com `cy.session()`.
- Os testes de produtos interceptam a requisição de cadastro para verificar o status HTTP e obter o ID necessário à limpeza.
- A validação das mensagens de erro de produtos usa normalização de texto para lidar com diferenças de acentuação, espaços e caixa.

⚠️ **Limitações conhecidas:** o ServeRest público é compartilhado e pode sofrer reinicializações, colisões de e-mail ou indisponibilidade. Quando um e-mail já existe com credenciais ou perfil divergentes, a preparação falha com uma mensagem explícita, sem modificar registros de terceiros. A autenticação administrativa é refeita por cenário, mas o ambiente continua sujeito a alterações externas. A limpeza de produtos depende da captura do ID após a resposta de cadastro.

## 📊 Relatórios de Testes — Allure

A integração `allure-cypress` coleta resultados durante a execução.

```bash
yarn cy:run
yarn allure generate allure-results --clean -o allure-report
yarn allure open allure-report
```

- `allure-results/`: resultados brutos da execução.
- `allure-report/`: relatório HTML gerado.

A disponibilidade de screenshots e outros anexos depende dos dados efetivamente capturados durante a execução.

## 🤖 Execução Automática — GitHub Actions

O workflow está em [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml).

📌 **Gatilhos configurados:**

1. **Automático:** após uma Pull Request ser mesclada na branch `main`.
2. **Manual:** pela aba **Actions → Testes Cypress e Allure → Run workflow**, selecionando a branch.

O pipeline instala dependências, executa `yarn cy:run`, tenta gerar o relatório Allure e publica os artefatos disponíveis (resultados, relatório, screenshots e vídeos). Os artefatos são mantidos por **14 dias**.

Uma falha na suíte é refletida no resultado final do job. A geração e o upload de evidências são tentados mesmo quando os testes falham.

## 🏗️ Decisões Técnicas

- **Separação API/Web:** validação de contratos diretamente na API e de comportamento visual pela interface.
- **Commands por domínio:** organização em usuários, login e produtos, evitando duplicação.
- **Fixtures:** separação entre dados e lógica dos cenários.
- **Limpeza de massa:** exclusão de registros criados sempre que possível.
- **Assertions explícitas:** verificação de status HTTP, mensagens, navegação e dados retornados.
- **CI e evidências:** execução reproduzível e relatórios acessíveis a partir do GitHub Actions.

## 💡 Melhorias Futuras

- **Ampliar a cobertura por risco:** acrescentar cenários funcionais, negativos e de integração conforme criticidade dos fluxos.
- **Evoluir a massa de testes:** gerar usuários exclusivos por execução para reduzir colisões na instância pública.
- **Aprimorar a execução em CI:** avaliar seleção de suítes e estratégias de otimização do tempo de feedback.
- **Expandir a rastreabilidade:** categorizar cenários e acompanhar tendências de execução no Allure.
- **Avaliar ambiente isolado:** executar o ServeRest em ambiente controlado para reduzir interferências externas.

---

## 📌 Considerações Finais

**Repositório:** [AlineAreda/serverest-cypress](https://github.com/AlineAreda/serverest-cypress)

Desenvolvido com ❤️ por [Aline Areda](https://github.com/AlineAreda), como demonstração de organização, pensamento crítico e aplicação prática de automação de testes em um desafio técnico de QA.
