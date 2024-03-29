import { Document, Schema, model } from "mongoose";

interface Iuser extends Document {
  name: string;
  password: string;
  email: string;
  recovery: string; // caso esqueceu a senha
  verification_twofactores: boolean; // verificação de dois fatores
  codding_twofactores: number; // codigo de verificação
  photo_user: string;
  access_jwt: string;
  id_points: [];
  chat: []; //insert Ids to clients
  notification: [], 
  friends: [],
  
}

export const CreateNewSchema = new Schema<Iuser>({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  recovery: { type: String },
  photo_user: { type: String },
  access_jwt: { type: String },
  verification_twofactores: { type: Boolean },
  codding_twofactores: { type: Number },
  id_points: { type: [] },
  notification: { type: [] },

  friends: { type: [] },

  chat: { type: [] },
});

export const UserModel = model("Users", CreateNewSchema);
