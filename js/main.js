
import { products, lines, discountCodes, VAT_RATE } from './data.js';
import { formatReceipt } from './receipt.js';
import { createCart } from "./cart.js"; 


const cart = createCart(products);

cart.add("latte", 1);
cart.add("kaffe", 2);
cart.add("macka", 1);
cart.add("macka", 2);

const receipt = formatReceipt(cart.lines(), products, "STUDENT", discountCodes, VAT_RATE);
console.log(cart);





console.log(cart.total());

console.log(cart.lines());

// Det enda stället med sidoeffekter är här i main.js: console.log(formatReceipt(...)).
// console.log(fromatReceipt(lines, products, "STUDENT", discountCodes, VAT_RATE));
// Kör två gånger. Blir det samma kvitto nu?

// --- Del B och C, självstudier till torsdagen ---
// Se README. Ni tar med Kassan till workshoppen och granskar varandras kod.
const receiptContainer = document.createElement("ul");
document.querySelector("main").append(receiptContainer);


const renderReceipt = (rows) => {
    receiptContainer.innerHTML = "";
    const li = rows.map(row => {
       return `<li class="row">${row}</li>`
    }).join("");
    receiptContainer.innerHTML = li;
}

renderReceipt(receipt)

