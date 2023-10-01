"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("password_resets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("password_resets", ["email"]);
    await queryInterface.addIndex("password_resets", ["token"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("password_resets", ["email"]);
    await queryInterface.removeIndex("password_resets", ["token"]);

    await queryInterface.dropTable("password_resets");
  },
};
