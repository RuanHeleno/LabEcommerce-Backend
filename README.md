# API LabEcommerce Backend

## Table of contents

- [Overview](#overview)
  - [Demo](#demo)
- [Features](#features)
  - [Create new User](#create-new-user)
  - [Get User By ID](#get-user-by-id)
  - [Get User Purchases By ID](#get-user-purchases-by-id)
  - [Get all Users](#get-all-users)
  - [Edit User By ID](#edit-user-by-id)
  - [Delete User By ID](#delete-user-by-id)
  - [Create new Product](#create-new-product)
  - [Get Product By NAME](#get-product-by-name)
  - [Get Product By ID](#get-product-by-id)
  - [Get all Products](#get-all-products)
  - [Edit Product By ID](#edit-product-by-id)
  - [Delete Product By ID](#delete-product-by-id)
  - [Create new Purchase](#create-new-purchase)
  - [Get Purchase By ID](#get-purchase-by-id)
  - [Get all Purchases](#get-all-purchases)
  - [Edit Purchase By ID](#edit-purchase-by-id)
  - [Delete Purchase By ID](#delete-purchase-by-id)
  - [Get all Purchases Products](#get-all-purchases-products)
- [Process](#process)
  - [Built with](#built-with)
- [Author](#author)

## :mega: Overview

A API to my portfolio made based on a Ecommerce backend. See more below :)

### Demo

[Click here to see more](https://documenter.getpostman.com/view/17432210/2s946eADNj)

## :computer: Features

- Users CRUD
- Products CRUD
- Purchases CRUD

### Create new User

```
// Request
// POST /users
// body JSON
{
    "id": "u001",
    "name": "Ruan",
    "email": "ruan@gmail.com",
    "password": "Ruan@123"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```

---

### Get User By ID

```
// Request
// path params = :id
// GET /users/u001

// Response
// status 200 OK
{
  "id": "u001",
  "name": "Ruan",
  "email": "ruan@gmail.com",
  "password": "Ruan@12345",
  "created_at": "2023-07-13 15:15:21"
}
```

---

### Get User Purchases By ID

```
// Request
// path params = :id
// GET /users/u001/purchases

// Response
// status 200 OK
[
    {
        "id": "pur001",
        "buyer": "u001",
        "total_price": 4600,
        "created_at": "2023-07-13 15:21:13"
    },
    {
        "id": "pur002",
        "buyer": "u001",
        "total_price": 4500,
        "created_at": "2023-07-13 15:23:18"
    }
]
```

---

### Get all Users

```
// Request
// GET /users

// Response
// status 200 OK
[
  {
    "id": "u001",
    "name": "Ruan",
    "email": "ruan@gmail.com",
    "password": "Ruan@12345",
    "created_at": "2023-07-13 15:15:21"
  },
  {
    "id": "u002",
    "name": "Teste",
    "email": "teste@gmail.com",
    "password": "Te
    ste@
    123",
    "created_at": "2023-07-13 15:17:23"
  }
]
```

---

### Edit User By ID

```
// Request
// path params = :id

// PUT /users/u001
// body JSON
{
  "password": "Ruan@12345"
}

// Response
// status 200 OK
{
    message: "Usuário atualizado com sucesso!"
}
```

---

### Delete User By ID

```
// Request
// path params = :id
// DELETE /users/u002

// Response
// status 200 OK
{
    message: "Usuário apagado com sucesso!"
}
```

---

### Create new Product

```
// Request
// POST /products
// body JSON
{
    "id": "prod001",
    "name": "Cadeira gamer",
    "price": 900,
    "description": "Melhor cadeira do mercado!",
    "imageUrl": "https://picsum.photos/seed/Cadeira%20gamer/400"
}

// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso!"
}
```

---

### Get Product By NAME

```
// Request
// query params = name
// GET /products?name=monitor

// Response
// status 200 OK
[
    {
        "id": "prod002",
        "name": "Monitor gamer",
        "price": 700,
        "description": "Melhor monitor do mercado!",
        "image_url": "https://picsum.photos/seed/Monitor%20gamer/400"
    }
]
```

---

### Get Product By ID

```
// Request
// path params = :id
// GET /products/prod001

// Response
// status 200 OK
[
    {
        "id": "prod001",
        "name": "Cadeira gamer",
        "price": 800,
        "description": "Melhor cadeira do mercado!",
        "image_url": "https://picsum.photos/seed/Cadeira%20gamer/400"
    }
]
```

---

### Get all Products

```
// Request
// GET /products

// Response
// status 200 OK
[
    {
        "id": "prod001",
        "name": "Cadeira gamer",
        "price": 800,
        "description": "Melhor cadeira do mercado!",
        "image_url": "https://picsum.photos/seed/Cadeira%20gamer/400"
    },
    {
        "id": "prod002",
        "name": "Monitor gamer",
        "price": 700,
        "description": "Melhor monitor do mercado!",
        "image_url": "https://picsum.photos/seed/Monitor%20gamer/400"
    }
]
```

---

### Edit Product By ID

```
// Request
// path params = :id

// PUT /products/prod001
// body JSON
{
  "price": 800
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso!"
}
```

---

### Delete Product By ID

```
// Request
// path params = :id
// DELETE /products/u002

// Response
// status 200 OK
{
    message: "Produto apagado com sucesso!"
}
```

---

### Create new Purchase

```
// Request
// POST /purchases
// body JSON
{
    "id": "pur002",
    "buyer": "u001",
    "products": [
        {
            "id": "prod001",
            "quantity": 2
        },
        {
            "id": "prod002",
            "quantity": 1
        }
    ]
}

// Response
// status 201 CREATED
{
    message: "Pedido realizado com sucesso!"
}
```

---

### Get Purchase By ID

```
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
    "purchaseId": "pur001",
    "buyerId": "u001",
    "buyerName": "Ruan",
    "buyerEmail": "ruan@gmail.com",
    "totalPrice": 2300,
    "createdAt": "2023-07-13 15:21:13",
    "products": [
        {
            "id": "prod001",
            "name": "Cadeira gamer",
            "price": 800,
            "description": "Melhor cadeira do mercado!",
            "imageUrl": "https://picsum.photos/seed/Cadeira%20gamer/400",
            "quantity": 2
        },
        {
            "id": "prod002",
            "name": "Monitor gamer",
            "price": 700,
            "description": "Melhor monitor do mercado!",
            "imageUrl": "https://picsum.photos/seed/Monitor%20gamer/400",
            "quantity": 1
        }
    ]
}
```

---

### Get all Purchases

```
// Request
// GET /purchases

// Response
// status 200 OK
[
    {
        "id": "pur001",
        "buyer": "u001",
        "total_price": 4600,
        "created_at": "2023-07-13 15:21:13"
    },
    {
        "id": "pur002",
        "buyer": "u001",
        "total_price": 4500,
        "created_at": "2023-07-13 15:23:18"
    }
]
```

---

### Edit Purchase By ID

```
// Request
// path params = :id

// PUT /purchases/pur001
// body JSON
{
  "products": [
    {
      "id": "prod001",
      "quantity": 4
    },
    {
      "id": "prod002",
      "quantity": 2
    }
  ]
}

// Response
// status 200 OK
{
    message: "Pedido atualizado com sucesso!"
}
```

---

### Delete Purchase By ID

```
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Pedido cancelado com sucesso!"
}
```

---

### Get all Purchases Products

```
// Request
// GET /purchasesProducts

// Response
// status 200 OK
[
    {
        "purchase_id": "pur001",
        "product_id": "prod001",
        "quantity": 4
    },
    {
        "purchase_id": "pur001",
        "product_id": "prod002",
        "quantity": 2
    },
    {
        "purchase_id": "pur002",
        "product_id": "prod001",
        "quantity": 3
    },
    {
        "purchase_id": "pur002",
        "product_id": "prod002",
        "quantity": 3
    }
]
```

## :newspaper: Process

### Built with

- [Typescript](https://www.typescriptlang.org)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org)

### :man: Author

<table>
  <tr>
    <td align="center">
        <img 
            src="https://github.com/RuanHeleno.png" 
            width="100px;" 
            alt="Foto do Ruan Heleno no GitHub" 
        /> <br />
        <sub> <a href="https://github.com/ruanHeleno"> <b>Ruan Heleno</b> </a> </sub>
    </td>
  </tr>
</table>

- [Portfolio](https://ruanheleno.github.io)
- [LinkedIn](https://www.linkedin.com/in/ruanheleno/)
