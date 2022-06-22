import * as mongoose from "mongoose";
import dbConnection from '../util/db';

export interface Catalog extends mongoose.Document {
  seller: string;
  productIdentifier: {
    type:string,
    required:true
  };
  type: string;
  category: String;
  models: string;
  featured: boolean;
  msp: string;
  tax: string;
  dimensioUnit: string;
  height: number;
  width: number;
  length: number;
  WeightUnit: string;
  weight: number;
  status: string;
  approvalStatus: boolean;
  cod: boolean;
  brand: string;
  mrp: number;
  thumbnail: string;
  count: number;
}

const catalogSchema = new mongoose.Schema({
  seller: String,
  productIdentifier: {
    type:String,
    required:true
  },
  type: String,
  category: String,
  subCategory: String,
  models: String,
  featured: Boolean,
  brand: String,
  tax: Number,
  weightUnit: String,
  price: Number,
  qty: Number,
  mrp: Number,
  msp: Number,
  status: String,
  cod: Boolean,
  approvalStatus: Boolean,
  isChecked: Boolean,
  count: Number,
  thumbnail: String,
  //stockQuantity:Number
});

const catalogModel = mongoose.model<Catalog & mongoose.Document>('Catalog', catalogSchema);
export default catalogModel;

export interface Category {
  categoryId: number,
  categoryName: string
}
