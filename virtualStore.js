export class VirtualStore {
  constructor(id, price, name, stock) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
}

export class Cep {
  constructor(cep) {
    this.cep = cep;
  }
}
