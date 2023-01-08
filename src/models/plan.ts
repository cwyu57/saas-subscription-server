import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';
import { ServiceAttributes } from './service';

// These are all the attributes in the Plan model
export interface PlanAttributes {
  id: number;
  name: string;
  isActive: boolean;

  services?: ServiceAttributes[] | undefined;
}

// Some attributes are optional in `Plan.build` and `Plan.create` calls
export interface PlanCreationAttributes {}

export class Plan
  extends Model<PlanAttributes, PlanCreationAttributes>
  implements PlanAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  public isActive!: boolean;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<Plan> {
    Plan.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isActive: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'plans',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return Plan as ModelCtor<Plan>;
  }

  static associate(models: ModelsInterface): void {
    Plan.belongsToMany(models.Service, {
      through: { model: models.ServiceIncluded },
      foreignKey: {
        field: 'user_id',
        name: 'userId',
      },
      as: 'services',
      constraints: false,
    });
  }
}
