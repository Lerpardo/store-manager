const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services')
const { productController } = require('../../../src/controllers')
const { products } = require('./mocks/product.controller.mock')

describe('Verificando controller Product', async () => {
  describe('Buscando produtos', async () => {
    it('quando não existe nenhum produto cadastrado retorna um array vazio', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findAll').resolves({ type: 'PRODUCT_NOT_FOUND', message: [] })

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith([]);


    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna com sucesso todos produtos cadastrados', async () => {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findAll').resolves({ type: null, message: products })

      await productController.getProducts(req, res);

      expect(res.status).to.been.calledWith(200)

      expect(res.json).to.have.been.calledWith(products);
    })
  })
  describe('buscando produtos por Id', async () => {
    it('quando o ID não corresponde com nenhum cadastro', async () => {
      const res = {};
      const req = {
        params: {
          id:99
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({message:'Product not found'});


    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna com sucesso busca por produto', async () => {

      const res = {};
      const req = {
        params: {
          id: 1
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: null, message: [products[0]] })

      await productController.getProductById(req, res);

      expect(res.status).to.been.calledWith(200)

      expect(res.json).to.have.been.calledWith(products[0]);
    })
  })
  })