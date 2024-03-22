import { Request, Response } from "express";
import { UserModel } from "../../../models/user";
import bcrypt from "bcrypt"
import { transport } from "../../../config/sendmailer";
import { uuid } from 'uuidv4';

export default async function CreateUser(req: Request, res:Response) {
    

    const { name, email, password } = req.body

    const numberAleatory = Math.floor(Math.random() * 100000)

    if (name == null || email == null || password == null) {
        return res.status(401).json({msg:"Preencha todos os campos"})
    }
    if (name.length < 4) {
        return res.status(401).json({msg: "Nome incompleto"})
    }
    if (email.length < 5) {
        return res.status(401).json({ msg: "Email Incorreto" });
    }
    if (password.length < 5) {
      return res.status(401).json({ msg: "Sua senha deve conter no mínimo 5 dígitos" });
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    
    const dataUser = new UserModel({
        name,
        email,
        access_jwt: uuid(),
        password: passwordHash, 
        verification_twofactores: false,
        codding_twofactores: numberAleatory,
    })

    const emailExist = await UserModel.findOne({ email: email })
    
    if (emailExist) {
        return res.status(401).json({ msg: "Este email já esta cadastrado" });
    }

    const createUser = await UserModel.create(dataUser) 
    if(createUser){
        await transport.sendMail({
            from: "Point-Reservs",
            to: email,
            subject: "Autenticação de dois fatores",
            text:`Ative sua conta inserindo este código:  ${numberAleatory} ` , // create two factores last
          }) 
    }
    return res.status(201).json(createUser)
}