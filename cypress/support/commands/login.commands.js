const urlApi = Cypress.expose('apiUrl');

// POST - Realizar login
Cypress.Commands.add('realizarLogin', (usuario, permitirErro = false) => {
  return cy.request({
    method: 'POST',
    url: `${urlApi}/login`,
    body: {
      email: usuario.email,
      password: usuario.password
    },
    failOnStatusCode: !permitirErro
  }).then((response) => {
    if (!permitirErro) {
      expect(response.status).to.eq(200);
    }

    return response;
  });
});

Cypress.Commands.add('autenticarAdministrador', () => {
  cy.fixture('login').then((login) => {
    const usuario = login.administrador;

    cy.session(['administrador', usuario.email], () => {
      cy.realizarLogin(usuario).then((response) => {
        const token = response.body.authorization;

        cy.visit('/login', {
          onBeforeLoad(win) {
            win.localStorage.setItem('serverest/userToken', token);
            win.localStorage.setItem('serverest/userEmail', usuario.email);
            win.localStorage.setItem('serverest/userNome', usuario.nome);
          }
        });
      });
    }, {
      validate() {
        cy.window().then((win) => {
          expect(win.localStorage.getItem('serverest/userToken'))
            .to.match(/^Bearer .+/);
        });
      }
    });
  });

  cy.visit('/admin/home');

  return cy.window().then((win) => {
    return win.localStorage.getItem('serverest/userToken');
  });
});

// Garantir cadastro e realizar login pela API
Cypress.Commands.add('autenticarUsuario', (usuario, permitirErro = false) => {
  return cy.garantirUsuarioCadastrado(usuario).then(() => {
    return cy.realizarLogin(usuario, permitirErro);
  });
});

// Acessar a página de login
Cypress.Commands.add('acessarLogin', () => {
  cy.visit('/login');
  cy.url().should('include', '/login');
  cy.contains('h1', 'Login').should('be.visible');
});

// Preencher formulário de login
Cypress.Commands.add('preencherFormLogin', (usuario) => {
  if (usuario.email) {
    cy.get('input[placeholder="Digite seu email"]')
      .type(usuario.email);
  }

  if (usuario.password) {
    cy.get('input[placeholder="Digite sua senha"]')
      .type(usuario.password);
  }
});

// Clicar no botão Entrar
Cypress.Commands.add('submeterLogin', () => {
  cy.contains('button', 'Entrar').click();
});

// Verificar mensagem de erro
Cypress.Commands.add('verificarMensagemErro', (mensagemEsperada) => {
  cy.get('[role="alert"]')
    .contains('span', mensagemEsperada)
    .should('be.visible');
});

// Verificar página acessada
Cypress.Commands.add('verificarPagina', (rota, tituloPagina) => {
  cy.location('pathname').should('eq', rota);
  cy.contains('h1', tituloPagina).should('be.visible');
});

// Verificar usuário administrador autenticado
Cypress.Commands.add('verificarUsuarioLogado', (nome) => {
  cy.get('h1')
    .should('be.visible')
    .and('contain.text', 'Bem Vindo')
    .and('contain.text', nome);
});

// Realizar logout
Cypress.Commands.add('realizarLogout', () => {
  cy.get('[data-testid="logout"]')
    .should('be.visible')
    .click();

  cy.location('pathname').should('eq', '/login');
});