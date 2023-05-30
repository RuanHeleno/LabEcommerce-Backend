import { TProducts, TUser } from "./types";

export const users: Array<TUser> = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@gmail.com",
    password: "fulano123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@gmail.com",
    password: "beltrana00",
    createdAt: new Date().toISOString(),
  },
];

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  const newUser: TUser = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  console.log("Cadastro realizado com sucesso");
};

export const getAllUsers = () => {
  console.table(users);
};

export const products: Array<TProducts> = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
) => {
  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl
  };

  products.push(newProduct);
  console.log("Produto criado com sucesso");
};

export const getAllProducts = () => {
  console.table(products);
};

export const searchProductsByName = (name: string) => { 
  return products.find(product => product.name.toLowerCase().includes(name.toLowerCase()));
}