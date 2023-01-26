const { expect } = require('chai');
const sinon = require('sinon');
const { saleProductModel } = require('../../../src/models');
const { saleProductService } = require('../../../src/services');

const { sales } = require('./mocks/sale_product.service.mock')

const invalidValue = 'a';

describe('Verificando service SalesProduct', async () => { 
  describe('Testa o retorno da lista de vendas', async () => {
    beforeEach(function () {
      sinon.stub(saleProductModel, 'findAll').resolves(sales)
    })
    it('não retorna erro', async function () {
      // act
      const response = await saleProductService.findAll();;
      // asert 
      expect(response.type).to.equal(null);
    });

    it('retorna a lista de todos os produtos', async () => {
      // act
      const response = await saleProductService.findAll();
      // assert
      expect(response.message).to.deep.equal(sales)
    })
    afterEach(function () {
      sinon.restore();
    });
  })
  describe('busca de uma venda', async () => {
    it('retorna um erro caso a venda não existe', async () => {
      // arrange
      sinon.stub(saleProductModel, 'findById').resolves([])
      // act
      const response = await saleProductService.findById(145)
      // assert
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(response.message).to.be.equal('Sale not found')
    })

    afterEach(function () {
      sinon.restore();
    });

    it('retorna a venda caso ID existente', async () => {
      sinon.stub(saleProductModel, 'findById').resolves([sales[0]])
      // act
      const response = await saleProductService.findById(1)
      // assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal([sales[0]])
    })
  })
  describe('cadastra uma venda', async () => {
    it('retorna o caso da venda sem productId', async () => {
      
      const response = await saleProductService.insert([{ quantity: 1 }])

      expect(response.type).to.be.equal('MISSING_KEY')
      expect(response.message).to.be.equal('\"productId\" is required')
    })
    it('retorna o caso da venda valor inválido', async () => {

      const response = await saleProductService.insert([{ productId: 1, quantity: 0 }])

      expect(response.type).to.be.equal('INVALID_VALUE')
      expect(response.message).to.be.equal("\"quantity\" must be greater than or equal to 1")
    })
  })
})
