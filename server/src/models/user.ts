import { Document, Schema, model } from "mongoose";

interface Iuser extends Document {
  name: string;
  password: string;
  email: string;
  recovery: string; // caso esqueceu a senha
  verification_twofactores: boolean; // verificação de dois fatores
  codding_create_user: number; // codigo de verificação
  photo_user: string;
  photo_point: [];
  chat: []; //insert Ids to clients

  spam: number;
}

export const CreateNewSchema = new Schema<Iuser>({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  recovery: { type: String },
  photo_user: { type: String },

  verification_twofactores: { type: Boolean },
  codding_create_user: { type: Number },
  spam: { type: Number },
  photo_point: { type: [] },
  chat: { type: [] },
});

export const UserModel = model("Users", CreateNewSchema);
