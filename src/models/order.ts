import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the Service model
export interface OrdersAttributes {
  id: number;
  periodIndex: number;

  subscriptionId: number;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export interface OrdersCreationAttributes {}

export class Order
  extends Model<OrdersAttributes, OrdersCreationAttributes>
  implements OrdersAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public periodIndex!: number;

  public subscriptionId!: number;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<Order> {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        periodIndex: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        subscriptionId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: 'orders',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return Order as ModelCtor<Order>;
  }

  static associate(models: ModelsInterface): void {
    Order.belongsTo(models.Subscription, {
      foreignKey: 'subscription_id',
      as: 'subscription',
      constraints: false,
    });
  }
}
