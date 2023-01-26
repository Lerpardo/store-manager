const saleList = [
  {
    "saleId": 1,
    "date": "2023-01-26T05:17:54.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-01-26T05:17:54.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const updateSale = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]

module.exports = {
  saleList,
  newSale,
  updateSale
}