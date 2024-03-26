import { Request, Response } from "express";
import { UserModel } from "../../../models/user";

export default async function addFriends(req: Request, res: Response) {
  const { email, token } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ msg: "Insira um email para adicionar em sua amizade." });
    }

    const userAdd = await UserModel.findOne({ email });

    if (!userAdd) {
      return res.status(404).json({ msg: "Nenhum usuário encontrado com o email fornecido." });
    }

    const user:any = await UserModel.findOne({ access_jwt: token });
    if (userAdd._id.equals(user?._id)) {
      return res.status(400).json({ msg: "Você não pode adicionar você mesmo." });
    }

    const alreadyFriend = user?.friends.some((friend:any) => friend?.user.equals(userAdd._id));
    if (alreadyFriend) {
      return res.status(400).json({ msg: "Você já adicionou esse usuário como amigo." });
    }


    await UserModel.updateOne(
      { email: email },
      {
        $push: {
          notification: {
            title: "Pedido de amizade",
            description: `Você tem um pedido de amizade pendente de ${user?.name}.`,
            id_user: user?._id,
            name: user?.name,
            visible: false,
            type: "invite",
          },
        },
      }
    );

    return res.status(200).json({ msg: "Pedido de amizade enviado com sucesso." });
  } catch (error) {
    console.error("Erro ao adicionar amigo:", error);
    return res.status(500).json({ msg: "Ocorreu um erro ao adicionar o usuário como amigo." });
  }
}
