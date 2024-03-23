"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_tiers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price_usd_cents: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_active_members: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_locations: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addConstraint("product_tiers", {
      fields: ["name"],
      type: "unique",
      name: "product_tiers_name_unique_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_tiers");
  },
};
