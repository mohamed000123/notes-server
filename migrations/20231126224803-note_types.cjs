"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("note_types", [
      { name: "congratulation", is_disabled: false },
      { name: "invitation", is_disabled: false },
      { name: "consolation", is_disabled: false },
      { name: "greeting", is_disabled: true },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("note_types", null, {});
  },
};
