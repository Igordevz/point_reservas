import { Document, Schema, model } from "mongoose";

interface Ipoint extends Document {
  photo_point: [];
  admin_id: [];
  address: string;
  city: string;
  name_point: string;

  spam: number;
}

export const CreateNewSchema = new Schema<Ipoint>({
  spam: { type: Number },
  photo_point: { type: [] },
  admin_id: { type: [] },
  address: {type: String},
  city: {type: String},
  name_point: {type: String},

});

export const PointModel = model("points", CreateNewSchema);
