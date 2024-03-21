"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("organizations", "product_tier_id", {
      type: Sequelize.BIGINT,
      allowNull: false,
      after: "owner_id",
      references: {
        model: "product_tiers",
        key: "id",
        name: "organizations_product_tier_id_fk",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("organizations", "product_tier_id");
  },
};
