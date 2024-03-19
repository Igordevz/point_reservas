import { Document, Schema, model } from "mongoose";

interface Ipoint extends Document {
  photo_point: [];
  admin_id: [];
  address: string;
  city: string;
  spam: number;
}

export const CreateNewSchema = new Schema<Ipoint>({
  spam: { type: Number },
  photo_point: { type: [] },
  admin_id: { type: [] },
  address: {type: String},
  city: {type: String},
});

export const UserModel = model("points", CreateNewSchema);
