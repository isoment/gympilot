"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productTiers = [
      {
        name: "Free",
        price_usd_cents: 0,
        max_active_members: 15,
        max_locations: 1,
      },
      {
        name: "Starter",
        price_usd_cents: 1500,
        max_active_members: 50,
        max_locations: 1,
      },
      {
        name: "Plus",
        price_usd_cents: 5000,
        max_active_members: 200,
        max_locations: 5,
      },
      {
        name: "Pro",
        price_usd_cents: 10000,
        max_active_members: 500,
        max_locations: 10,
      },
      {
        name: "Elite",
        price_usd_cents: 20000,
        max_active_members: 1000,
        max_locations: 50,
      },
    ];

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
