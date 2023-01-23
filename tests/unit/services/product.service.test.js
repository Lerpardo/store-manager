const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { products } = require('./mocks/product.service.mock')

const invalidValue = 'a';

describe('Verificando service Product', async () => {
  describe('Testa o retorno da lista de produtos', async () => {
    beforeEach(function () {
      sinon.stub(productModel, 'findAll').resolves(products)
    })
    it('não retorna erro', async function () {
      // act
      const response = await productService.findAll();;
      // asert 
      expect(response.type).to.equal(null);
    });

    it('retorna a lista de todos os produtos', async () => {
      // act
      const response = await productService.findAll();
      // assert
      expect(response.message).to.deep.equal(products)
    })
    afterEach(function () {
      sinon.restore();
    });
  })
  describe('busca de um produto', async () => {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productService.findById(invalidValue);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
    
    it('retorna um erro caso o produto não existe', async () => {
      // arrange
      sinon.stub(productModel, 'findById').resolves([])
      // act
      const response = await productService.findById(145)
      // assert
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(response.message).to.be.equal('Product not found')
    })

    afterEach(function () {
      sinon.restore();
    });

    it('retorna o produto caso ID existente', async () => {
      sinon.stub(productModel, 'findById').resolves(products[0])
      // act
      const response = await productService.findById(1)
      // assert
      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.equal(products[0])
    })
  })
})