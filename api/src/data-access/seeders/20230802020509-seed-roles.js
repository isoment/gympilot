"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = ["admin", "owner", "employee", "patron"];

    const rolePromises = roles.map(async (role) => {
      // Check if the role already exists
      const existingRole = await queryInterface.rawSelect(
        "roles",
        {
          where: { name: role },
        },
        ["id"],
      );

      if (!existingRole) {
        return queryInterface.insert(null, "roles", { name: role });
      }
    });

    await Promise.all(rolePromises);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("roles", null, {});
  },
};
