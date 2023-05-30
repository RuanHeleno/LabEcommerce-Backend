/* import { products, users } from "./database";

console.log(users);
console.log(products); */

/* import { createUser, getAllUsers } from "./database";

createUser("u003", "RuanHeleno", "ruanheleno@gmail.com", "123");
getAllUsers(); */

import { createProduct, getAllProducts, searchProductsByName } from "./database";

createProduct("prod003", "Teclado Gamer", 230, "Melhor teclado do mundo!", "https://picsum.photos/seed/Teclado%20gamer/400");
getAllProducts();
console.table(searchProductsByName("gamer"));