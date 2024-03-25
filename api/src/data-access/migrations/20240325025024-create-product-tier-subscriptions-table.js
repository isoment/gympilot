"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_tier_subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      organization_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
          name: "product_tier_subscriptions_organization_id_fk",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_tier_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "product_tiers",
          key: "id",
          name: "product_tier_subscriptions_product_tier_id_fk",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_tier_subscriptions");
  },
};
