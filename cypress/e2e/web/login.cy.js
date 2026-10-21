describe('WebApp - Login', function () {

  beforeEach(function () {
    cy.fixture('login').then((login) => {
      this.login = login;
    });

    cy.acessarLogin();
  });

  it('CT-WEB-001 - Deve realizar login de administrador com sucesso', function () {
    const usuarioData = this.login.administrador;

    cy.preencherFormLogin(usuarioData);
    cy.submeterLogin();

    cy.verificarPagina('/admin/home', 'Bem Vindo');
    cy.verificarUsuarioLogado(usuarioData.nome);
  });

  it('CT-WEB-002 - Não deve realizar login com credenciais inválidas', function () {
  const usuarioData = {
    ...this.login.administrador,
    password: this.login.invalidos.senhaIncorreta
  };

  cy.preencherFormLogin(usuarioData);
  cy.submeterLogin();

  cy.verificarMensagemErro('Email e/ou senha inválidos');
  cy.location('pathname').should('eq', '/login');
});

it('CT-WEB-003 - Email é obrigatório', function () {
  const usuarioData = {
    ...this.login.administrador,
    email: ''
  };

  cy.preencherFormLogin(usuarioData);
  cy.submeterLogin();

  cy.verificarMensagemErro('Email é obrigatório');
  cy.location('pathname').should('eq', '/login');
});

it('CT-WEB-004 - Senha é obrigatória', function () {
  const usuarioData = {
    ...this.login.administrador,
    password: ''
  };

  cy.preencherFormLogin(usuarioData);
  cy.submeterLogin();

  cy.verificarMensagemErro('Password é obrigatório');
  cy.location('pathname').should('eq', '/login');
});

it('CT-WEB-005 - Deve realizar login de usuário comum com sucesso', function () {
  const usuarioData = this.login.usuarioComum;

  cy.preencherFormLogin(usuarioData);
  cy.submeterLogin();

  cy.verificarPagina('/home', 'Serverest Store');
});

it('CT-WEB-006 - Deve realizar logout com sucesso', function () {
  const usuarioData = this.login.usuarioComum;

  cy.preencherFormLogin(usuarioData);
  cy.submeterLogin();

  cy.verificarPagina('/home', 'Serverest Store');
  cy.realizarLogout();

  cy.contains('h1', 'Login').should('be.visible');
});

});