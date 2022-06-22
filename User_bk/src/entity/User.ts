import { Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, BeforeUpdate, Timestamp } from "typeorm";
import { createHmac } from 'crypto';
import { Address } from "./UserAddress";
import { Orders } from "./Order";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    mobile: string;

    @Column({ default: null })
    fullName: string;

    @Column({ default: null })
    email: String;

    @Column({ default: null })
    dob: Date;

    @Column({ default: null })
    country: string;

    @Column({ default: null })
    state: string;

    @Column({ default: null })
    city: string;

    @Column({ default: null })
    otp: number;

    @Column({ default: 0 })
    retry: number = 0;

    @Column({ default: 0 })
    verified: number = 0;

    @Column({ default: null })
    status: number = 0;

    @CreateDateColumn()
    updateDate

    @Column({ default: null, select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = createHmac('sha256', this.password).digest('hex');
        }
    }

    @OneToMany(type => Address, address => address.user)
    address: Address[];

    @OneToMany(type => Orders, orders => orders.user)
    orders: Orders[];
}