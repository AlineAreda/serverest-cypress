import { gerarIdAleatorio } from '../../support/utils';

describe("Endpoint - /usuarios", function () {
  let idUsuario;

  beforeEach(function () {
    idUsuario = null;

    cy.fixture("usuarios").then((usuarios) => {
      this.usuarios = usuarios;
    });
  });

  it("CT-001 - Deve cadastrar usuário administrador com sucesso", function () {
    const usuarioData = this.usuarios.cadastro.sucesso.administrador;

    cy.cadastrarUsuario(usuarioData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.all.keys("message", "_id");
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.be.a("string").and.not.be.empty;

      idUsuario = response.body._id;
    });
  });

  it("CT-002 - Não deve cadastrar usuário duplicado", function () {
    const usuarioData = {
      ...this.usuarios.cadastro.duplicado,
    };

    // Preparação da massa
    cy.cadastrarUsuario(usuarioData).then((response) => {
      idUsuario = response.body._id;
      expect(response.status).to.eq(201);
    });

    // Validação do cenário
    cy.cadastrarUsuario(usuarioData, true).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.all.keys("message");
      expect(response.body.message).to.eq("Este email já está sendo usado");
    });
  });

  it("CT-003 - Deve buscar usuário por ID com sucesso", function () {
    const usuarioData = this.usuarios.cadastro.sucesso.usuarioComum;

    // Preparação da massa
    cy.cadastrarUsuario(usuarioData).then((response) => {
      idUsuario = response.body._id;
      expect(response.status).to.eq(201);

      // Consulta e validação
      cy.consultarUsuarioPorId(idUsuario).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({
          _id: idUsuario,
          nome: usuarioData.nome,
          email: usuarioData.email,
          password: usuarioData.password,
          administrador: usuarioData.administrador,
        });
      });
    });
  });

  it('CT-004 - Não deve encontrar usuário quando ID inexistente', function () {
  const idInexistente = gerarIdAleatorio();

  cy.consultarUsuarioPorId(idInexistente, true).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.all.keys('message');
    expect(response.body.message).to.eq('Usuário não encontrado');
  });
});

it('CT-005 - Não deve consultar usuário quando ID inválido', function () {
  const idInvalido = '123';

  cy.consultarUsuarioPorId(idInvalido, true).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.deep.eq({
      id: 'id deve ter exatamente 16 caracteres alfanuméricos'
    });
  });
});

  afterEach(() => {
    if (idUsuario) {
      cy.excluirUsuarioPorId(idUsuario);
    }
  });
});
