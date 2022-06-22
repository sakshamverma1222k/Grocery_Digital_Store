import {Entity,ManyToOne, PrimaryGeneratedColumn,CreateDateColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {User} from './User';
import {Orders} from './Order';

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null})
    mobile: string;

    @Column({ default: null})
    house: string;

    @Column({ default: null})
    street: string;

    @Column({ default: null})
    city: string;

    @Column({ default: null})
    dist: string;

    @Column({ default: null})
    state: string;

    @Column({ default: null})
    pincode: number=0;

    @Column({ default: 0})
    status: number=0;

    @CreateDateColumn()
    createDate

   @ManyToOne(type => User, user => user.address)
   user: User;

   @OneToMany(type => Orders, orders => orders.address)
   orders: Orders;
}