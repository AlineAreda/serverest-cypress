
const urlApi = Cypress.expose('apiUrl');

// GET - Listar usuários com filtros opcionais
Cypress.Commands.add('consultarUsuarios', (filtros = {}) => {
  return cy.request({
    method: 'GET',
    url: `${urlApi}/usuarios`,
    qs: filtros,
    failOnStatusCode: false
  });
});

// GET - Consultar usuário por ID
Cypress.Commands.add('consultarUsuarioPorId', (id, permitirErro = false) => {
  return cy.request({
    method: 'GET',
    url: `${urlApi}/usuarios/${id}`,
    failOnStatusCode: !permitirErro
  });
});

// POST - Cadastrar usuário
Cypress.Commands.add('cadastrarUsuario', (usuario, permitirErro = false) => {
  return cy.request({
    method: 'POST',
    url: `${urlApi}/usuarios`,
    body: usuario,
    failOnStatusCode: !permitirErro
  });
});

// PUT - Atualizar usuário
Cypress.Commands.add('atualizarUsuario', (id, dados, permitirErro = false) => {
  return cy.request({
    method: 'PUT',
    url: `${urlApi}/usuarios/${id}`,
    body: dados,
    failOnStatusCode: !permitirErro
  });
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
      expect(response.body.message)
        .to.eq('Registro excluído com sucesso');
    }

    return response;
  });
});

// Garantir que o usuário exista e possua as credenciais esperadas
Cypress.Commands.add('garantirUsuarioCadastrado', (usuario) => {
  return cy.consultarUsuarios({ email: usuario.email }).then((response) => {
    expect(response.status).to.eq(200);

    const usuarioExistente = response.body.usuarios.find(
      (item) => item.email === usuario.email
    );

    // Usuário não existe: realiza o cadastro
    if (!usuarioExistente) {
      return cy.cadastrarUsuario(usuario).then((cadastro) => {
        expect(cadastro.status).to.eq(201);
        expect(cadastro.body._id).to.be.a('string').and.not.be.empty;

        return cadastro.body;
      });
    }

    // Usuário existe: valida o perfil
    expect(
      usuarioExistente.administrador,
      `Perfil divergente para ${usuario.email}`
    ).to.eq(usuario.administrador);

    // Valida as credenciais antes de reutilizar o cadastro
    return cy.request({
      method: 'POST',
      url: `${urlApi}/login`,
      body: {
        email: usuario.email,
        password: usuario.password
      },
      failOnStatusCode: false
    }).then((login) => {
      expect(
        login.status,
        `Credenciais divergentes para ${usuario.email}. ` +
        'Utilize um usuário de teste com dados exclusivos.'
      ).to.eq(200);

      return usuarioExistente;
    });
  });
});
