
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
