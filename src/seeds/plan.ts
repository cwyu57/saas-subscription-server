import { Sequelize, QueryInterface } from 'sequelize';

export default {
  up: async (
    queryInterface: QueryInterface,
    sequelize: Sequelize,
  ): Promise<void> => {
    await queryInterface.bulkInsert(
      'plans',
      [
        {
          id: 1,
          name: 'OTT Advanced (monthly plan)',
          price: 200,
          is_active: true,
          period_in_days: 30,
        },
        {
          id: 2,
          name: 'OTT Premium (monthly plan)',
          price: 400,
          is_active: true,
          period_in_days: 30,
        },
      ].map(e => ({
        ...e,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );
  },
  down: async (
    queryInterface: QueryInterface,
    sequelize: Sequelize,
  ): Promise<void> => {},
};
