import { Request, Response } from "express";
import { UserModel } from "../../../models/user";
import bcrypt from "bcrypt";
export default async function LoginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const userExist: any = await UserModel.findOne({ email: email });
  if (!userExist) {
    return res.status(401).json({ msg: "usuário não encontrado" });
  }
 
  const passChecked: any = await bcrypt.compare(password, userExist?.password);
  if (userExist?.verification_twofactores == false) {
    return res.status(401).json({ msg: "Faça a verificação de duas etapas" });
  }
  if(passChecked) {
    return res.status(200).json(userExist);
  } else {
    return res.status(401).json({ msg: "usuário não encontrado" });
  }
}
