import { Field, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({
  tableName: 'contacts',
  underscored: true,
  timestamps: false,
})
export class Phonebook extends Model {
  @Field()
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Field()
  @Column({ allowNull: false })
  firstName: string;

  @Field()
  @Column({ allowNull: false })
  lastName: string;

  @Field({ nullable: true })
  @Column
  nickname: string;

  @Field()
  @Column({ allowNull: false })
  name: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  })
  phoneNumber: string[];

  @Field({ nullable: true })
  @Column
  address: string;

  @Field({ nullable: true })
  @Column
  photo: string;

  @Field({ nullable: true })
  @Column
  photoFilter: string;
}
