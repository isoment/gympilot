"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = ["admin", "owner", "employee", "patron"];

    const rolePromises = roles.map((role) => {
      return queryInterface.insert(null, "roles", { name: role });
    });

    await Promise.all(rolePromises);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
