import {Entity, PrimaryGeneratedColumn, CreateDateColumn,Column,BeforeInsert, BeforeUpdate,Timestamp} from "typeorm";
import {createHmac}  from 'crypto';

@Entity()
export class Sms {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null})
    mobile: string;

    @Column({ default: null})
    user: number;

    @Column({ default: null})
    message: String;

    @Column({ default: null})
    dob: Date;

    @Column({ default: null})
    countryCode: string;

    @Column({ default: null})
    status: number=0;

    @CreateDateColumn()
    createDate

}
