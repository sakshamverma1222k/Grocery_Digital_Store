import { Entity, JoinTable, ManyToMany, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Timestamp } from "typeorm";
import { createHmac } from 'crypto';
import { Address } from "./UserAddress";
import { User } from './User';
import { Item } from './Item';

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    mobile: string;

    @Column({ default: 0 })
    totalPrice: number = 0;

    @Column({ default: 0 })
    tax: number = 0;

    @Column({ default: 0 })
    itemCount: number = 0;

    @Column({ default: 'pending' })
    paymentStatus: string;

    @Column({ default: 'none' })
    paymentMode: string;

    @Column({ default: 'new' })
    deliveryStatus: string;

    @CreateDateColumn()
    createDate

    @OneToMany(type => Item, item => item.orders, { cascade: true })
    item: Item[];

    @ManyToOne(type => User, user => user.orders)
    user: User;

    @ManyToOne(type => Address, address => address.orders)
    address: Address;

}