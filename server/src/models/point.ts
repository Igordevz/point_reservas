import { Document, Schema, model } from "mongoose";

interface Ipoint extends Document {
  photo_point: [];
  admin_id: string;
  address: string;
  city: string;
  name_point: string;
  state: string;
  spam: number;
}

export const CreateNewSchema = new Schema<Ipoint>({
  spam: { type: Number },
  photo_point: { type: [] },
  admin_id: { type: String },
  address: {type: String},
  city: {type: String},
  state: {type: String},
  name_point: {type: String},

});

export const PointModel = model("points", CreateNewSchema);
