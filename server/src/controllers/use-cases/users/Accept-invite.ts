import { Request, Response } from "express";
import { UserModel } from "../../../models/user";

export default async function AcceptInvite(req: Request, res: Response) {
  const { id, type, token } = req.body;

  try {
    if (type !== "invite") {
      return res
        .status(400)
        .json({ msg: "O tipo de solicitação não é um convite." });
    }
    const login: any = await UserModel.findOne({ access_jwt: token });
    const getFile = login?.notification.findIndex(
      (index: any) => index.id_user == id
    );
    if (!Array.isArray(login?.notification)) {
      login.notification = [];
    }
    const updateUser = await UserModel.updateOne(
      { access_jwt: token },
      {
        $set: {
          friends: [
            {
              user: id,
            },
          ],
        },
      }
    );
    if (getFile !== -1) {
      login?.notification.splice(getFile, 1);
      await login.save();
    }
    // resolver problema abaixo
    const user = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          friends: [
            {
              user: login?._id,
            },
          ],
        },
      }
    );

    if (updateUser?.modifiedCount >= 1) {
      return res
        .status(200)
        .json({ msg: "Convite de amizade aceito com sucesso." });
    } else {
      return res
        .status(404)
        .json({ msg: "Convite de amizade não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao aceitar convite de amizade:", error);
    return res
      .status(500)
      .json({ msg: "Ocorreu um erro ao aceitar o convite de amizade." });
  }
}
