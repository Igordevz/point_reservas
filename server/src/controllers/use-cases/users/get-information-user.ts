import { Request, Response } from "express";
import { UserModel } from "../../../models/user";

export default async function GetInformationUser(req:Request, res: Response){

  const {  token  } = req.body

  if(!token){
    res.status(401).json({msg: "Insira um token"})
  }
  const usersFind = await UserModel.findOne({access_jwt: token})

  if(!usersFind){
    res.status(401).json({msg: "Faça login novamente para obter acesso"})
  }
  else {

    return res.status(200).json(usersFind);
  }
}
