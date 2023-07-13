import { Request, Response } from "express";

import { db } from "../../database/knex";
import { TProducts } from "../../types";

import { HandleError } from "../../Error/HandleError";

export const EditProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const [product] = await db("products").where({ id: id });

      if (!product) {
        res.status(400);
        throw new Error("Produto não encontrado!");
      }

      const newId = req.body.id as string | undefined;
      const newName = req.body.name as string | undefined;
      const newPrice = req.body.price as number | undefined;
      const newDescription = req.body.description as string | undefined;
      const newImageUrl = req.body.imageUrl as string | undefined;

      if (newId) {
        if (newId.substring(0, 4) !== "prod") {
          res.status(400);
          throw new Error("ID precisa começar com a palavra prod!");
        }

        if (newId.length !== 7) {
          res.status(400);
          throw new Error("ID deve possuir 7 caracteres!");
        }

        const [productID] = await db("products").where({ id: newId });

        if (productID) {
          res.status(400);
          throw new Error("ID já existente!");
        }
      }

      if (newPrice) {
        if (newPrice < 0) {
          res.status(400);
          throw new Error("Preço não pode ser menor que 0!");
        }
      }

      if (newDescription) {
        if (newDescription.length < 3) {
          res.status(400);
          throw new Error("Descrição não pode ter menos que 3 caracteres!");
        }
      }

      if (newImageUrl) {
        const regex = new RegExp(
          "(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?"
        );
        const test = regex.test(newImageUrl);

        if (!test) {
          res.status(400);
          throw new Error("Digite corretamente a URL da imagem com https");
        }
      }

      const updateProduct: TProducts = {
        id: newId || product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        description: newDescription || product.description,
        image_url: newImageUrl || product.imageUrl,
      };

      await db("products").update(updateProduct).where({ id: id });

      res.status(200).send("Produto atualizado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
