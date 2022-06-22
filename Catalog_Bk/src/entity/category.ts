import * as mongoose from "mongoose";
import dbConnection from '../util/db';

export interface SubCategory extends mongoose.Document {
  categoryName: string;
  thumbnail: string;
  status: Number;
}

export interface Category extends mongoose.Document {
  categoryName: string;
  thumbnail: String;
  status: Number;
  subcategory: [SubCategory];
}

const SubCategorySchema = new mongoose.Schema({
  categoryName: { type: String },
  thumbnail: { type: String },
  status: { type: Number }
});

const categorySchema = new mongoose.Schema({
  categoryName: { type: String },
  thumbnail: { type: String },
  status: { type: Number },
  subcategory: [SubCategorySchema]
});

const categoryModel = mongoose.model<Category & mongoose.Document>('Category', categorySchema);
export default categoryModel;
