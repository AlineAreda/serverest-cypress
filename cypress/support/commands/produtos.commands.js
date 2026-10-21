const urlApi = Cypress.expose('apiUrl');

Cypress.Commands.add('excluirProdutoPorId', (id, token) => {
  return cy.request({
    method: 'DELETE',
    url: `${urlApi}/produtos/${id}`,
    headers: {
      Authorization: token
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq('Registro excluído com sucesso');

    return response;
  });
});

// Acessar formulário de cadastro de produtos
Cypress.Commands.add('acessarCadastroProdutos', () => {
  cy.get('[data-testid="cadastrarProdutos"]')
    .should('be.visible')
    .click();

  cy.verificarPagina('/admin/cadastrarprodutos', 'Cadastro de Produtos');
});

// Preencher formulário de cadastro
Cypress.Commands.add('preencherFormProduto', (produto) => {
  cy.get('[data-testid="nome"]').type(produto.nome);
  cy.get('[data-testid="preco"]').type(String(produto.preco));
  cy.get('[data-testid="descricao"]').type(produto.descricao);
  cy.get('[data-testid="quantity"]').type(String(produto.quantidade));

  cy.get('[data-testid="imagem"]')
    .selectFile(`cypress/fixtures/${produto.imagem}`);
});

// Submeter cadastro de produto
Cypress.Commands.add('submeterCadastroProduto', () => {
  cy.contains('button', 'Cadastrar')
    .should('be.visible')
    .click();
});

// Validar mensagens de erro no cadastro de produtos
Cypress.Commands.add('verificarErrosCadastroProduto', (mensagens) => {
  cy.get('[role="alert"]')
    .should('have.length', mensagens.length)
    .should(($alertas) => {
      const textos = $alertas
        .toArray()
        .map((alerta) => alerta.textContent.trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, ' ')
          .toLowerCase());

      mensagens.forEach((mensagem) => {
        const mensagemNormalizada = mensagem
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, ' ')
          .toLowerCase();

        expect(
          textos.some((texto) => texto.includes(mensagemNormalizada)),
          `Alertas exibidos: ${textos.join(' | ')}`
        ).to.eq(true);
      });
    });
});