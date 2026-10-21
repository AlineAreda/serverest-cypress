
const urlApi = Cypress.expose('apiUrl');

// GET - Listar usuários com filtros opcionais
Cypress.Commands.add('consultarUsuarios', (filtros = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urlApi}/usuarios`,
    qs: filtros,
    failOnStatusCode: false
  }).then((response) => response);
});

// GET - Consultar usuário por ID
Cypress.Commands.add('consultarUsuarioPorId', (id, permitirErro = false) => {
  return cy.request({
    method: 'GET',
    url: `${urlApi}/usuarios/${id}`,
    failOnStatusCode: !permitirErro
  }).then((response) => response);
});

// POST - Cadastrar usuário
Cypress.Commands.add('cadastrarUsuario', (usuario, permitirErro = false) => {
  return cy.request({
    method: 'POST',
    url: `${urlApi}/usuarios`,
    body: usuario,
    failOnStatusCode: !permitirErro
  }).then((response) => response);
});

// PUT - Atualizar usuário
Cypress.Commands.add('atualizarUsuario', (id, dados, permitirErro = false) => {
  return cy.request({
    method: 'PUT',
    url: `${urlApi}/usuarios/${id}`,
    body: dados,
    failOnStatusCode: !permitirErro
  }).then((response) => response);
});

// DELETE - Excluir usuário por ID
Cypress.Commands.add('excluirUsuarioPorId', (id, permitirErro = false) => {
  return cy.request({
    method: 'DELETE',
    url: `${urlApi}/usuarios/${id}`,
    failOnStatusCode: !permitirErro
  }).then((response) => {
    if (!permitirErro) {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    }

    return response;
  });
});

// Garantir que o usuário esteja cadastrado antes da autenticação
Cypress.Commands.add('garantirUsuarioCadastrado', (usuario) => {
  return cy.consultarUsuarios({ email: usuario.email }).then((response) => {
    expect(response.status).to.eq(200);

    const usuarioExistente = response.body.usuarios.find(
      (item) => item.email === usuario.email
    );

    if (usuarioExistente) {
      return cy.wrap(usuarioExistente);
    }

    return cy.cadastrarUsuario(usuario).then((cadastro) => {
      expect(cadastro.status).to.eq(201);
      return cadastro.body;
    });
  });
});
