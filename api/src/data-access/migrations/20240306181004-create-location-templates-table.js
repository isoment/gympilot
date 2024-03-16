"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("location_templates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      location_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "locations",
          key: "id",
          name: "location_templates_location_id_fk",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      template_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "templates",
          key: "id",
          name: "location_templates_template_id_fk",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // Add a constraint to ensure that each location can only have one record of a given template
    await queryInterface.addConstraint("location_templates", {
      fields: ["location_id", "template_id"],
      type: "unique",
      name: "unique_location_template_combination",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("location_templates");
  },
};
