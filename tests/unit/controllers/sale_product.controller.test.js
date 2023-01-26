const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleProductService } = require('../../../src/services')
const { saleProductController } = require('../../../src/controllers')
const { saleList } = require('./mocks/sale_product.controller.mock')

describe('Verificando controller SalesProduct', async () => {
  describe('Buscando vendas', async () => {
    it('quando não existe nenhum produto cadastrado retorna um array vazio', async () => {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleProductService, 'findAll').resolves({ type: 'PRODUCT_NOT_FOUND', message: [] })

      await saleProductController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith([]);


    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna com sucesso todas vendas cadastradas', async () => {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleProductService, 'findAll').resolves({ type: null, message: saleList })

      await saleProductController.getSales(req, res);

      expect(res.status).to.been.calledWith(200)

      expect(res.json).to.have.been.calledWith(saleList);
    })
  })
})