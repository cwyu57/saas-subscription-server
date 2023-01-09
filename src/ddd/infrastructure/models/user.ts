import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';
import { UserAttributes, UserCreationAttributes } from '../../domain/entity';

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.

  public email!: string;

  public name!: string;

  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static factory(sequelize: Sequelize): ModelCtor<User> {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
        underscored: true,
        paranoid: true,
      },
    );
    return User as ModelCtor<User>;
  }

  static associate(models: ModelsInterface): void {
    User.hasMany(models.Subscription, {
      foreignKey: 'user_id',
      as: 'subscriptions',
      constraints: false,
    });
    User.belongsToMany(models.Plan, {
      through: { model: models.Subscription },
      foreignKey: {
        field: 'user_id',
        name: 'userId',
      },
      as: 'plans',
      constraints: false,
    });
  }
}
