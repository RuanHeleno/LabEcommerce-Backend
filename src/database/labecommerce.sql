-- Active: 1687214921422@@127.0.0.1@3306

CREATE TABLE
    if NOT EXISTS users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

/* INSERT INTO users
VALUES (
        'u001',
        'Fulano',
        'fulano@gmail.com',
        'fulano123',
        '19/06/2023'
    ), (
        'u002',
        'Beltrana',
        'beltrana@gmail.com',
        'beltrana00',
        '19/06/2023'
    ), (
        'u003',
        'Ruan',
        'ruan@gmail.com',
        'ruan123',
        '19/06/2023'
    ); */

SELECT * FROM users;

DELETE FROM users WHERE id = "u003";

DROP TABLE users;

CREATE TABLE
    if NOT EXISTS products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

/* INSERT INTO products
VALUES (
        'prod001',
        'Mouse gamer',
        250,
        'Melhor mouse do mercado',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod002',
        'Monitor',
        900,
        'Monitor LED Full HD 24 polegadas',
        'https://picsum.photos/seed/Monitor/400'
    ), (
        'prod003',
        'Teclado Gamer',
        330,
        'Melhor Teclado do mercado',
        'https://picsum.photos/seed/Teclado%20gamer/400'
    ), (
        'prod004',
        'Headset Razor',
        449.99,
        'Melhor Headset da Razor na cor vermelha!',
        'https://picsum.photos/seed/headset/400'
    ), (
        'prod005',
        'SSD Externo Kingston',
        330,
        'Melhor SSD da Kingston do mercado',
        'https://picsum.photos/seed/SSD%20Kingston/400'
    ); */

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE "%gamer%";

DELETE FROM products WHERE id = "prod005";

UPDATE products
SET
    name = "SSD Externo Samsung",
    price = 300,
    description = "Melhor SSD da Samsung do mercado",
    image_url = 'https://picsum.photos/seed/SSD%20Samsung/400'
WHERE id = "prod005";

DROP TABLE products;

CREATE TABLE
    if NOT EXISTS purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        
        FOREIGN KEY(buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE 
    );

/* INSERT INTO purchases
VALUES (
        'p001',
        'u003',
        250,
        '27/06/2023'
    ), (
        'p002',
        'u002',
        150,
        '27/06/2023'
    ), (
        'p003',
        'u001',
        50,
        '27/06/2023'
    ); */

SELECT * FROM purchases;

UPDATE purchases SET total_price = 300 WHERE id = "p001";

SELECT
    users.id AS purchase_id,
    buyer AS buyer_id,
    name AS buyer_name,
    email,
    total_price,
    purchases.created_at
FROM users
    INNER JOIN purchases ON users.id = purchases.buyer;

DROP TABLE purchases;

CREATE TABLE
    if NOT EXISTS purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

/* INSERT INTO purchases_products
VALUES ('p001', 'prod005', 10), ('p002', 'prod003', 2), ('p003', 'prod002', 5);
 */
SELECT * FROM purchases_products;

SELECT *
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;

DROP TABLE purchases_products;