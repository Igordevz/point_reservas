import { Request, Response } from "express";
import { UserModel } from "../../../models/user";

export default async function ValidatorTokenAcount(req:Request, res:Response ){

  const { token } = req.body


  if(!token){
    return res.status(401).json({msg: "Insira um token"})
  }

  const tokenValid = await UserModel.updateOne({codding_twofactores: token}, { 
    verification_twofactores: true
  })


  if(tokenValid.modifiedCount >= 1){
    return res.status(200).json({ msg: "Email ativado com sucesso!" })
  } else { 
    return res.status(200).json({msg: "Não foi possivel ativar este Email"})
  }

}