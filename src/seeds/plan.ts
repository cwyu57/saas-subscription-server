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
          name: 'OTT Basic',
          price: 0,
          is_active: true,
        },
        {
          id: 2,
          name: 'OTT VIP (monthly plan)',
          price: 200,
          is_active: true,
        },
        {
          id: 3,
          name: 'OTT VIP (monthly plan)',
          price: 600,
          is_active: true,
        },
        {
          id: 4,
          name: 'OTT VIP (annually plan)',
          price: 2400,
          is_active: true,
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
