import { Sequelize, Model, DataTypes, ModelCtor, Optional } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the Service model
export interface PaymentInfoAttributes {
  id: number;
  cardKey: string;
  cardToken: string;
  firstSix: string;
  lastFour: string;
  cardHolderName: string;
  cardHolderEmail: string;
  cardHolderPhone: string;
}

// Some attributes are optional in `Service.build` and `Service.create` calls
export type PaymentInfoCreationAttributes = Optional<
  PaymentInfoAttributes,
  'id'
>;

export class PaymentInfo
  extends Model<PaymentInfoAttributes, PaymentInfoCreationAttributes>
  implements PaymentInfoAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public cardKey!: string;

  public cardToken!: string;

  public firstSix!: string;

  public lastFour!: string;

  public cardHolderName!: string;

  public cardHolderEmail!: string;

  public cardHolderPhone!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<PaymentInfo> {
    PaymentInfo.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        cardKey: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cardToken: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        firstSix: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        lastFour: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cardHolderName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cardHolderEmail: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cardHolderPhone: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        tableName: 'payment_infos',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return PaymentInfo as ModelCtor<PaymentInfo>;
  }

  static associate(models: ModelsInterface): void {
    PaymentInfo.hasOne(models.Subscription, {
      foreignKey: {
        field: 'payment_info_id',
        name: 'paymentInfoId',
      },
      as: 'subscription',
      constraints: false,
    });
  }
}
