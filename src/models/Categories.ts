import { Column, Model, Table, DataType, Default } from 'sequelize-typescript';

@Table
export class Categories extends Model {
  @Column(DataType.TEXT)
  name: string;

  @Default(0)
  @Column({ type: DataType.INTEGER })
  parent_id: number;
}
