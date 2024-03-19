import { Request, Response } from "express";
import { PointModel } from "../../../models/point";
import { UserModel } from "../../../models/user";

export default async function CreateNewPoint(req: Request, res: Response){

  const { address, city, admin_id, name_point, state  } = req.body

  const pictures:any = req.files

  const imgs_photo = pictures.map((file_name:any) => file_name?.path)

  const userExist = await UserModel.findOne({_id: admin_id})
  if(!userExist?.verification_twofactores){
    return res.status(401).json({msg:"Este usuário não tem autorização."})
  }

  if(!address || !city || !admin_id || !name_point || !state){
    return res.status(401).json({msg: "Preencha todos os campos!"})
  }

  const newModel =  new PointModel({
    address,
    state,
    city, 
    admin_id,
    spam: 0, 
    name_point, 
    photo_point: [...imgs_photo]
  })

  const received_data = await PointModel.create(newModel);

  const updateUser = await UserModel.updateOne({_id: admin_id}, {
     $push: {
      id_points: received_data?._id
     }
  })
  
  if(updateUser?.modifiedCount <  1){
    return res.status(501).json({msg: "Error no servidor"})
  }
  return res.status(201).json({msg: "Seu ponto foi cadastrado com sucesso!"});
}