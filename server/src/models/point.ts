import { Document, Schema, model } from "mongoose";

interface Iuser extends Document {
  photo_point: [];
  admin_id: [];
  spam: number;
}

export const CreateNewSchema = new Schema<Iuser>({
  spam: { type: Number },
  photo_point: { type: [] },
  admin_id: { type: [] },
});

export const UserModel = model("points", CreateNewSchema);
