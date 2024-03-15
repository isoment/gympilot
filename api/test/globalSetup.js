const { migrate, rollback } = require("./testing/databaseSetup");

module.exports = async () => {
  console.log("Running globalSetup before all test suites...");
  await rollback();
  await migrate();
};
