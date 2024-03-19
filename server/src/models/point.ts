import { Document, Schema, model } from "mongoose";

interface Ipoint extends Document {
  photo_point: [];
  admin_id: [];
  spam: number;
}

export const CreateNewSchema = new Schema<Ipoint>({
  spam: { type: Number },
  photo_point: { type: [] },
  admin_id: { type: [] },
});

export const UserModel = model("points", CreateNewSchema);
