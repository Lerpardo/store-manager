const { expect } = require('chai');
const sinon = require('sinon');
const { saleProductModel } = require('../../../src/models');

const { saleList,newSale,updateSale } = require('./mocks/saleProduct.model.mock')

const connection = require('../../../src/models/connection');

describe('Verificando model saleProduct', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([saleList]);

    const result = await saleProductModel.findAll();

    expect(result).to.be.deep.equal(saleList);

  })

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([saleList[0]]);
    // Act
    const result = await saleProductModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(saleList[0]);
  });

  afterEach(function () {
    sinon.restore();
  });

  // it('Cadastrando nova venda', async () => {
  //   // Arrange
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
  //   // Act
  //   const result = await saleProductModel.insert(newSale);
  //   // Assert
  //   expect(result).to.be.deep.equal(2);
  // })

  it('Atualizando venda já cadastrado', async () => {
    sinon.stub(connection, 'execute').resolves();
    // Act
    const result = await saleProductModel.update(updateSale, 3);
    // Assert
    expect(result).to.be.deep.equal(3);
  })

  it('Deletando venda', async () => {
    sinon.stub(connection, 'execute').resolves();
    // Act
    const result = await saleProductModel.delProc(3);
    // Assert
    expect(result).to.be.deep.equal(3);

  })

  afterEach(function () {
    sinon.restore();
  });

})