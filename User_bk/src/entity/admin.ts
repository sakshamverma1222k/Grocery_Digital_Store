import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { createHmac } from 'crypto';

@Entity()
export class AdminSeller {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    sellerMobile: string;

    @Column({ default: null })
    sellerFullName: string;

    @Column({ default: null })
    sellerEmail: string;

    @Column({ default: null })
    sellerAge: number;

    @Column({ default: null })
    sellerWebSite: string;

    @Column({ default: null })
    sellerIntroduction: string;

    @Column({ default: null })
    sellerUserName: string;

    @Column({ default: 0 })
    retry: number = 0;

    @Column({ default: 0 })
    otp: number = 0;

    @Column({ default: 0 })
    verified: number = 0;

    @Column({ default: null })
    status: number = 0;

    @Column({ default: true })
    seller: boolean = true;

    @CreateDateColumn()
    updateDate

    @Column({ default: null , select: false })
    sellerPassword: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.sellerPassword) {
            this.sellerPassword = createHmac('sha256', this.sellerPassword).digest('hex');
        }
    }
}