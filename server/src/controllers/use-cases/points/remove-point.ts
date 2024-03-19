import { Request, Response } from "express";
import { UserModel } from "../../../models/user";
import { PointModel } from "../../../models/point";
import fs from "fs";
import path from "path";

export default async function RemovePoint(req: Request, res: Response) {
  const { id_point, admin_id } = req.body;

  const userExist = await UserModel.findOne({ _id: admin_id });

  if (!userExist) {
    return res.status(401).json({ msg: "Você não tem permissões para remover este ponto de reservas" });
  }

  const pointRemoveImgDb = await PointModel.findOne({ _id: id_point, admin_id: admin_id });

  if (!pointRemoveImgDb) {
    return res.status(401).json({ msg: "Não encontramos nenhum ponto de reservas" });
  }

  const pathsImg = pointRemoveImgDb.photo_point?.map((path: any) => path);

  pathsImg.forEach((imgPath: string) => {
    const absolutePath = path.join(__dirname, "..", "..", "..", "..", imgPath);

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.log(err);
        
        return;
      }
    });
  });

  const removeDatas = await PointModel.deleteOne({_id: id_point, admin_id: admin_id})

  if(!removeDatas){
    return res.status(501).json({msg: "Ocorreu um error no servidor, tente novamente mais tarde."})
  }
  return res.status(200).json({ msg: "Arquivos removidos com sucesso" });
}
