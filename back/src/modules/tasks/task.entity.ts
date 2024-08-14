import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from "../users/user.entity";

@Table
export class Task extends Model<Task> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    completed: boolean;
}