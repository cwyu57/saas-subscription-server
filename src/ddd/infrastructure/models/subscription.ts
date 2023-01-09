import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';
import {
  SubscriptionAttributes,
  SubscriptionCreationAttributes,
} from '../../domain/entity';
import { PaymentInfo } from './payment-info';
import { Order } from './order';
import { Plan } from './plan';

// These are all the attributes in the Service model

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public status!: string; // Note that the `null assertion` `!` is required in strict mode.

  public validTo!: number; // Note that the `null assertion` `!` is required in strict mode.

  public planId!: number; // Note that the `null assertion` `!` is required in strict mode.

  public userId!: string; // Note that the `null assertion` `!` is required in strict mode.

  public paymentInfo?: PaymentInfo | undefined;

  public plan?: Plan | undefined;

  public orders?: Order[] | undefined;

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
        status: {
          type: DataTypes.ENUM,
          values: ['valid', 'suspend', 'invalid'],
          defaultValue: 'invalid',
          allowNull: false,
        },
        validTo: {
          type: DataTypes.BIGINT({ length: 13 }),
        },
        planId: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        userId: {
          type: DataTypes.UUID,
        },
        paymentInfoId: {
          type: DataTypes.INTEGER.UNSIGNED,
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
    // Subscription.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //   as: 'user',
    //   constraints: false,
    // });
    Subscription.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'plan',
      constraints: false,
    });
    Subscription.belongsTo(models.PaymentInfo, {
      foreignKey: {
        field: 'payment_info_id',
        name: 'paymentInfoId',
      },
      as: 'paymentInfo',
      constraints: false,
    });
    Subscription.hasMany(models.Order, {
      foreignKey: {
        field: 'subscription_id',
        name: 'subscriptionId',
      },
      as: 'orders',
      constraints: false,
    });
  }
}
