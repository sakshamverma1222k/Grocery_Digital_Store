import * as mongoose from "mongoose";
import dbConnection from '../util/db';
import { Catalog } from "./catalog";
var Schema = mongoose.Schema;

export interface Inventory extends mongoose.Document {
    id: string;
    quantity: number;
    createdAt: Date;
    reservations: [];
}

const inventorySchema = new mongoose.Schema({
    id: { type: Schema.Types.ObjectId, ref: 'Catalog' },
    quantity: { type: Number, min: 0 },
    createdAt: Date,
    reservations: []
});

const inventoryModel = mongoose.model<Inventory & mongoose.Document>('Inventory', inventorySchema);
export default inventoryModel;