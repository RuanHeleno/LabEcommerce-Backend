import { Response } from "express";

export const HandleError = (error: Error, res: Response): void => {
  if (res.statusCode === 200) res.status(500);

  res.send(error.message);
};
