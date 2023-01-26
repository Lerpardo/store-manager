const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { products,newProduct } = require('./mocks/product.service.mock')

const invalidValue = 'a';
const validValue = 'Asa do homem de ferro';

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
  afterEach(function () {
    sinon.restore();
  });
  describe('Cria um novo produto', async () => {
    it('retorna o caso com nome inexistente', async () => {

      const response = await productService.createProduct()

      expect(response.type).to.be.equal('MISSING_KEY')
      expect(response.message).to.be.equal("\"name\" is required")
    })

    it('retorna o caso com nome inválido', async () => {

      const response = await productService.createProduct(invalidValue)

      expect(response.type).to.be.equal('INVALID_VALUE')
      expect(response.message).to.be.equal('\"name\" length must be at least 5 characters long')
    })

    it('retorna o caso com nome válido', async () => {
      sinon.stub(productModel, 'insert').resolves(4)
      sinon.stub(productModel, 'findById').resolves([newProduct])
      
      const response = await productService.createProduct(validValue)

      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.equal(newProduct)
    })
  })

  afterEach(function () {
    sinon.restore();
  });

  describe('Atualiza um produto', async () => {
    it('retorna o caso com nome inexistente', async () => {

      const response = await productService.update(undefined, 2)

      expect(response.type).to.be.equal('MISSING_KEY')
      expect(response.message).to.be.equal("\"name\" is required")
    })

    it('retorna o caso com nome inválido', async () => {

      const response = await productService.update(invalidValue, 2)

      expect(response.type).to.be.equal('INVALID_VALUE')
      expect(response.message).to.be.equal('\"name\" length must be at least 5 characters long')
    })
    
    it('retorna o caso com id inválido', async () => {
      sinon.stub(productModel, 'update').resolves()
      sinon.stub(productModel, 'findById').resolves([])
      
      const response = await productService.update(validValue,invalidValue)
      
    expect(response.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(response.message).to.be.equal('Product not found')
  })
  
  it('retorna o caso válido', async () => {
    sinon.stub(productModel, 'update').resolves()
    sinon.stub(productModel, 'findById').resolves([newProduct])
    
    const response = await productService.update(validValue, 4)

    expect(response.type).to.be.equal(null)
    expect(response.message).to.be.deep.equal([newProduct])
  })
})

  afterEach(function () {
    sinon.restore();
  });

  describe('Deleta um produto', async () => {
    it('retorna o caso com id inválido', async () => {
      // sinon.stub(productModel, 'delete').resolves()
      sinon.stub(productModel, 'findById').resolves([])

      const response = await productService.delProc(invalidValue)

      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND')
      expect(response.message).to.be.equal('Product not found')
    })

    it('retorna o caso válido', async () => {
      sinon.stub(productModel, 'delProc').resolves()
      sinon.stub(productModel, 'findById').resolves([newProduct])

      const response = await productService.delProc(4)

      expect(response.type).to.be.equal(null)
    })
  })

  describe('Pesquisa um produto', async () => {
    it('pesquisa martelo em produtos', async () => {
      sinon.stub(productModel, 'queryProducts').resolves([products[0]])

      const response = await productService.queryProducts('martelo')

      expect(response.type).to.be.equal(null)
      expect(response.message).to.be.deep.equal([{ "id": 1, "name": "Martelo de Thor" }])
    })
  })

  afterEach(function () {
    sinon.restore();
  });
})