import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Producto extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
  public precio!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'productos',
  }
);

