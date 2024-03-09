"use strict";
const { programItems } = require("gympilot-shared-resources");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const key in programItems) {
      if (programItems.hasOwnProperty(key)) {
        for (const item of programItems[key]) {
          // Check if the record already exists
          const existingRecord = await queryInterface.rawSelect(
            "templates",
            {
              where: { name: item.value },
            },
            ["id"],
          );

          if (!existingRecord) {
            await queryInterface.insert(null, "templates", { name: item.value });
          }
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("templates", null, {});
  },
};
