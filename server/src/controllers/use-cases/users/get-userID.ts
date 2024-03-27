import { Request, Response } from "express";
import { UserModel } from "../../../models/user";

export default async function GetUserId(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const data = await UserModel.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ msg: "Você não tem amigos adicionados" });
  }
}
