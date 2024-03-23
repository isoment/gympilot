"use strict";
const { productTiers } = require("gympilot-shared-resources");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const product of productTiers) {
      const existingRecord = await queryInterface.rawSelect(
        "product_tiers",
        {
          where: { name: product.name },
        },
        ["id"],
      );

      if (!existingRecord) {
        await queryInterface.insert(null, "product_tiers", product);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
