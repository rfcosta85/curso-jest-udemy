import { VirtualStore } from "./virtualStore.js";
import { Cep } from "./virtualStore.js";

export function lojaVirtual(id, price, name, stock) {
  const southeast = [21, 11, 31, 28];
  const amount = 1;
  const cep = new Cep(29);
  let newWebStore = new VirtualStore(id, price * amount, name, stock - amount);
  // Verifica se o cep é do sudeste
  if (southeast.includes(cep.cep) && price < 100) {
    if (amount > 1 && amount < 3) {
      newWebStore = new VirtualStore(
        id,
        tenPercentOfDiscount(price * amount) + southeastFreight(),
        name,
        stock - amount
      );
    } else if (amount > 2) {
      newWebStore = new VirtualStore(
        id,
        twentyPercentOfDiscount(price * amount) + southeastFreight(),
        name,
        stock - amount
      );
    } else {
      newWebStore = new VirtualStore(
        id,
        price * amount + southeastFreight(),
        name,
        stock - amount
      );
    }
    return newWebStore;
  } else {
    if (amount > 1 && amount < 3) {
      newWebStore = new VirtualStore(
        id,
        tenPercentOfDiscount(price * amount) + freight(),
        name,
        stock - amount
      );
    } else if (amount > 2) {
      newWebStore = new VirtualStore(
        id,
        twentyPercentOfDiscount(price * amount) + freight(),
        name,
        stock - amount
      );
    } else {
      newWebStore = new VirtualStore(
        id,
        price * amount + freight(),
        name,
        stock - amount
      );
    }
    return newWebStore;
  }
}

function tenPercentOfDiscount(price) {
  const discount = 0.1;
  return price - price * discount;
}

function twentyPercentOfDiscount(price, amount) {
  const discount = 0.2;
  return price - price * discount;
}

function freight() {
  const freight = 25;
  return freight;
}

function southeastFreight() {
  const freight = 10;
  return freight;
}
