import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { ModelsInterface } from '.';

// These are all the attributes in the User model
export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes {}

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

  static associate(models: ModelsInterface): void {}
}
