import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the Service model
export interface ServiceAttributes {
  id: number;
  name: string;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface ServiceCreationAttributes {}

export class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<Service> {
    Service.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: 'services',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return Service as ModelCtor<Service>;
  }

  static associate(models: ModelsInterface): void {}
}
