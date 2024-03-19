import { Request, Response } from "express";
import { PointModel } from "../../../models/point";
import { UserModel } from "../../../models/user";

export default async function CreateNewPoint(req: Request, res: Response){

  const { photo_point, address, city, admin_id, name_point  } = req.body

  const file = req.file

  const userExist = await UserModel.findOne({_id: admin_id})
  if(!userExist){
    return res.status(401).json({msg:"Usuário não existe."})
  }

  if(!address || !city || !admin_id || !name_point){
    return res.status(401).json({msg: "Preencha todos os campos!"})
  }

  const newModel =  new PointModel({
    address, 
    city, 
    admin_id,
    spam: 0, 
    name_point, 
  })
  return res.status(201).send(file?.path);
}