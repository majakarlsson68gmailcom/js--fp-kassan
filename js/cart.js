import { subTotal, findProduct } from "./receipt.js";

export const createCart = (products) => {
  let lines = [];

  const add = (productId, quantity = 1) => {
    if (!findProduct(products, productId)) {
      throw new Error(`Okänd produkt: ${productId}`);
    }

    const exist = lines.some((line) => line.productId === productId);

    if (!exist) {
      lines = [...lines, { productId, quantity }];
    } else {
      lines = lines.map((line) => {
        return line.productId === productId
          ? { ...line, quantity: line.quantity + quantity }
          : line;
      });
    }
  };

  const remove = (productId) => {
    lines = lines.filter((line) => line.productId !== productId);
  };

  const total = () => subTotal(lines, products);

  return {
    add,
    remove,
    lines: () => [...lines],
    total,
  };
};
