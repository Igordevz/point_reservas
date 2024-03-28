import { Request, Response } from "express";
import { PointModel } from "../../../models/posts";

export default async function GetPoints(req:Request, res:Response) {

  const data = await PointModel.find();

  res.status(200).json(data)
} 
