import { Document, Schema, model } from "mongoose";

interface Ipoint extends Document {
  photo_point: [];
  admin_id: string;
  title: string;
  description: string;
  like: [];
}

export const CreateNewSchema = new Schema<Ipoint>({
  like: { type: [] },
  photo_point: { type: [] },
  admin_id: { type: String },
  title: {type: String},
  description: {type: String},

});

export const PointModel = model("points", CreateNewSchema);
