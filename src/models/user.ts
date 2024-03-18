import { Document, Schema, model } from "mongoose";

interface Iuser extends Document {
    name: string,
    password: string,
    email: string,
    isProducer: boolean,
    work:string,
    idChats: [],
    orders_menu: [],
    recovery: string,
    verification_twofactores: boolean,
    codding_create_user: number
}

export const CreateNewSchema = new Schema<Iuser>({
  name: {type: String},
  password: {type: String},
  work:{type:String},
  email: { type: String },
  isProducer: {type: Boolean},
  idChats: {type: []},
  orders_menu: {type: []},
  recovery: {type: String},
  verification_twofactores: {type: Boolean},
  codding_create_user: {type: Number}

});

export const UserModel = model("Users", CreateNewSchema);
