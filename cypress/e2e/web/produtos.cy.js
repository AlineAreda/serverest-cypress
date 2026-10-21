describe("WebApp - Cadastro de Produtos", function () {
  let produtoId;
  let token;

  beforeEach(function () {
    produtoId = null;
    token = null;

    cy.fixture("produtos").then((produtos) => {
      this.produto = produtos.cadastro.sucesso;
    });

    cy.fixture("login").then((login) => {
      cy.autenticarAdministrador(login.administrador);
    });

    cy.window().then((win) => {
      token = win.localStorage.getItem("serverest/userToken");
      expect(token).to.be.a("string").and.not.be.empty;
    });

    cy.acessarCadastroProdutos();
  });

  it("CT-WEB-007 - Deve cadastrar produto com sucesso", function () {
    const produto = {
      ...this.produto,
      nome: `${this.produto.nome} ${Date.now()}`,
    };

    cy.intercept("POST", "**/produtos").as("cadastroProduto");

    cy.preencherFormProduto(produto);
    cy.submeterCadastroProduto();

    cy.wait("@cadastroProduto").then(({ response }) => {
      produtoId = response?.body?._id;

      expect(response.statusCode).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(produtoId).to.be.a("string").and.not.be.empty;
    });

    cy.location("pathname").should("eq", "/admin/listarprodutos");
    cy.contains(produto.nome).should("be.visible");
  });

it('CT-WEB-008 - Não deve cadastrar produto com campos obrigatórios vazios', function () {
  cy.intercept('POST', '**/produtos').as('cadastroProduto');

  cy.submeterCadastroProduto();

  cy.wait('@cadastroProduto').then(({ response }) => {
    expect(response.statusCode).to.eq(400);
  });

  cy.verificarErrosCadastroProduto([
    'Nome é obrigatório',
    'Preço é obrigatório',
    'Descrição é obrigatório',
    'Quantidade é obrigatório'
  ]);

  cy.location('pathname')
    .should('eq', '/admin/cadastrarprodutos');
});

  afterEach(() => {
    if (produtoId) {
      cy.excluirProdutoPorId(produtoId, token);
    }
  });
});
