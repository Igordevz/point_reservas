import { Request, Response } from "express";
import { UserModel } from "../../../models/user";
import { transport } from "../../../config/sendmailer";

export default async function NotificationRecoveryPassword(req:Request, res: Response){

    const { email } = req.body;
  try {
    
    const verifyUserDatabase = await UserModel.findOne({email: email})

    if(!verifyUserDatabase){
      return res.status(401).json({msg: 'Nenhum usuário encontrado neste email inserido.'})
    }
    const numberAleatory = Math.floor(Math.random() * 100000)

    await transport.sendMail({
      from: "Food-delivery",
      to: email,
      subject: "Você esqueceu sua senha? - Proteja sua conta.",
      text:`Seu  código para recuperar sua conta: ${numberAleatory}` ,
    })
    const pushUser = await UserModel.updateOne({email: email}, {
        recovery: numberAleatory
    })
    return res.status(200).json(pushUser);

  } catch (error) {
      return res.status(401).json({msg:"Error no serviço interno."})
  }
    

}