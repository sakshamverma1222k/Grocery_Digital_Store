import * as mongoose from "mongoose";
import dbConnection from '../util/db';
import { Catalog } from "./catalog";

export interface Cart extends mongoose.Document {
    user: string;
    items: [Catalog];
    status: string;
    createdAt: Date;
}

const cartSchema = new mongoose.Schema({
    user: String,
    items: [],
    status: String,
    createdAt: Date
});

const cartModel = mongoose.model<Cart & mongoose.Document>('Cart', cartSchema);
export default cartModel;
