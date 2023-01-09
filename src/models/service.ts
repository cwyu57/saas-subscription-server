import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the Service model
export interface ServiceAttributes {
  id: number;
  code: string;
  name: string;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface ServiceCreationAttributes {}

export class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public code!: string;

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
        code: {
          type: DataTypes.STRING(255),
          allowNull: false,
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

  static associate(models: ModelsInterface): void {
    Service.belongsToMany(models.Plan, {
      through: { model: models.ServiceIncluded },
      foreignKey: {
        field: 'service_id',
        name: 'serviceId',
      },
      as: 'plans',
      constraints: false,
    });
  }
}
