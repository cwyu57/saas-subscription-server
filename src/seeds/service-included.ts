import { Sequelize, QueryInterface } from 'sequelize';

export default {
  up: async (
    queryInterface: QueryInterface,
    sequelize: Sequelize,
  ): Promise<void> => {
    await queryInterface.bulkInsert(
      'service_included',
      [
        {
          id: 1,
          plan_id: 1,
          service_id: 1,
        },
        {
          id: 2,
          plan_id: 2,
          service_id: 1,
        },
        {
          id: 3,
          plan_id: 2,
          service_id: 2,
        },
        {
          id: 4,
          plan_id: 2,
          service_id: 3,
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
