import { Request, Response } from "express";
import { PointModel } from "../../../models/posts";
import { UserModel } from "../../../models/user";

export default async function CreateNewPoint(req: Request, res: Response){

  const { title, token, description  } = req.body

  const pictures:any = req.files

  const imgs_photo = pictures.map((file_name:any) => file_name?.path)

  const userExist = await UserModel.findOne({access_jwt: token})
  if(!userExist?.verification_twofactores){
    return res.status(401).json({msg:"Este usuário não tem autorização."})
  }

  if(!title ||  !token || !description){
    return res.status(401).json({msg: "Preencha todos os campos!"})
  }

  const newModel =  new PointModel({
    title,
    description,
    admin_id: userExist._id,
    like:[],
    photo_point: [...imgs_photo]
  })

  const received_data = await PointModel.create(newModel);

  const updateUser = await UserModel.updateOne({access_jwt: token}, {
     $push: {
      id_points: received_data?._id
     }
  })
  
  if(updateUser?.modifiedCount <  1){
    return res.status(501).json({msg: "Error no servidor"})
  }
  return res.status(201).json({msg: "Seu anúncio foi feito com sucesso!"});
}