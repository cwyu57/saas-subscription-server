import { Sequelize, QueryInterface } from 'sequelize';

export default {
  up: async (
    queryInterface: QueryInterface,
    sequelize: Sequelize,
  ): Promise<void> => {
    await queryInterface.bulkInsert(
      'services',
      [
        {
          id: 1,
          code: '720p-unlimited',
          display: '720p 隨選觀看',
        },
        {
          id: 2,
          code: '1080p-unlimited',
          display: '1080p 隨選觀看',
        },
        {
          id: 3,
          code: 'ad-free',
          display: '觀劇無廣告',
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
