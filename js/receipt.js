
export const findProduct = (products, id) => products.find(product => product.id === id);

const lineTotal = (line, products) => {
    const product = findProduct(products, line.productId);
    return product.price * line.quantity;
    
};

export const subTotal = (lines, products) => {
    return lines.map((line) => lineTotal(line, products))
    .reduce((sum, total) => sum + total, 0);
};

const applyDiscount = (amount, code, codes) => {
    const dicount = codes[code] || 0;
    return amount * (1 - dicount);
};

const vatOf = (amount, rate) => amount - amount / ( 1 + rate);

const formatLine = (line, products) => {
    const product = findProduct(products, line.productId);
    const sum = lineTotal(line, products);
    return `${product.name} x${line.quantity} ${sum} kr`;
};

export const formatReceipt = (lines, products, code, codes, rate) => {
    const rows = lines.map((line) => formatLine(line, products));
    const beforeDiscount = subTotal(lines, products);
    const total = applyDiscount(beforeDiscount, code, codes);
    const vat = vatOf(total, rate)

    const totalRow = `Totalt: ${total.toFixed(2)} kr (varav moms ${vat.toFixed(2)} kr)`;

    return [...rows, totalRow];
}

