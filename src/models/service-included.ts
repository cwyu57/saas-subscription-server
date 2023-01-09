import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';
import {
  ServiceIncludedAttributes,
  ServiceIncludedCreationAttributes,
} from '../ddd/domain/entity';

// These are all the attributes in the Service model

export class ServiceIncluded
  extends Model<ServiceIncludedAttributes, ServiceIncludedCreationAttributes>
  implements ServiceIncludedAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  public planId!: number | null;

  public serviceId!: number | null;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<ServiceIncluded> {
    ServiceIncluded.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        planId: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        serviceId: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
      },
      {
        tableName: 'service_included',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return ServiceIncluded as ModelCtor<ServiceIncluded>;
  }

  static associate(models: ModelsInterface): void {}
}
