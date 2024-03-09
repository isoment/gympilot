const { migrate } = require("./testing/databaseSetup");

module.exports = async () => {
  console.log("Running globalSetup before all test suites...");
  await migrate();
};
