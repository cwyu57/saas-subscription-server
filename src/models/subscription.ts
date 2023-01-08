import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the Service model
export interface SubscriptionAttributes {
  id: number;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface SubscriptionCreationAttributes {}

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<Subscription> {
    Subscription.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        tableName: 'subscriptions',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return Subscription as ModelCtor<Subscription>;
  }

  static associate(models: ModelsInterface): void {
    Subscription.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      constraints: false,
    });
  }
}
