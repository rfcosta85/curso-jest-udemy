import { VirtualStore } from "../virtualStore";
import { lojaVirtual } from "../lojaVirtual";

describe("lojaVirtual", () => {
  test("it should return an object with id, price, name and stock", () => {
    const product = new VirtualStore(1, 100, "tv", 10);
    const updatedStocks = lojaVirtual(
      product.id,
      product.price,
      product.name,
      product.stock
    );

    expect(updatedStocks).toEqual(
      expect.objectContaining({
        id: 1,
        price: 125,
        name: "tv",
        stock: 9,
      })
    );
  });
});
