import { Request, Response } from "express";
import { UserModel } from "../../../models/user";
import bcrypt from "bcrypt";
export default async function RecoveryPassword(req: Request, res: Response) {
  const { code, password, email } = req.body;

  try {
    if (password.length < 5) {
      return res
        .status(401)
        .json({ msg: "Sua senha deve conter no mínimo 5 dígitos" });
    }
    if(code == ""){
      return res.status(401).json({msg: "Informe um código para mudar a sua senha"})
    }
    const verifyCode = await UserModel.findOne({
      recovery: code,
      email: email,
    });
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (!verifyCode) {
      return res.status(401).json({
        msg: "Alguma informação errada, se o error persistir contate com o suporte.",
      });
    }
    await UserModel.updateOne(
      { recovery: code, email: email },
      { password: passwordHash, recovery: "" }
    );
    return res.status(200).json({ msg: "Usuário atualizado com sucesso." });
  } catch (error) {
    return res.status(401).json({
      msg: "Alguma informação errada, se o error persistir contate com o suporte.",
    });
  }
}
