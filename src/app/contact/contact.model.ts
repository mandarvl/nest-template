import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table
export class Contact extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        allowNull: false
    })
    name: string;

    @Column({
        allowNull: true
    })
    photo: string;

    @Column({
        allowNull: true,
        unique: true
    })
    phonePrimary: string;

    @Column({
        allowNull: true
    })
    phoneSecondary: string;

    @Column({
        allowNull: true,
        unique: true
    })
    email: string;

    @Column({
        allowNull: true,
        type: DataType.ENUM('M', 'F')
    })
    sex: Sex;

    @Column({
        allowNull: true
    })
    password: string;

    @Column({
        allowNull: false
    })
    isActive: boolean;

    @Column({
        allowNull: true,
        type: DataType.TEXT
    })
    notes: string;

    @Column({
        allowNull: true
    })
    country: string;
}

export enum Sex {
    M,
    F
};

export interface ContactAuthResponse {
    token: string;
    user: Contact;
}