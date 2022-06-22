import {Entity,OneToOne,JoinColumn, OneToMany,CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, Column,BeforeInsert, BeforeUpdate,Timestamp} from "typeorm";
import {createHmac}  from 'crypto';
import { Address } from "./UserAddress";
import {User} from './User';
import {Orders} from './Order';

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null})
    productId: number;

    @Column({ default: null})
    productIdentifier: string;

    @Column({ default: null})
    category: string;

    @Column({ default: null})
    subCategory: string;

    @Column({ default: null})
    weightUnit: string;

    @Column({ default: null})
    tax: string;

    @Column({ default: null})
    price: number=0;

    @Column({ default: null})
    qty: number=0;

    @Column({ default: null})
    cod: number=0;

    @Column({ default: null})
    brand: string;

    @Column({ default: null})
    thumbnail: string;

    @Column({ default: null})
    itemCount: number=0;

    @CreateDateColumn()
    createDate

   @ManyToOne(type => Orders, orders => orders.item)
   orders: Orders;
}