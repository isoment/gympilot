"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "owner_onboarding_complete", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
      after: "password",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "owner_onboarding_complete");
  },
};
