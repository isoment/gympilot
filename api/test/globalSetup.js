const { migrate } = require("./testing/databaseSetup");

module.exports = async () => {
  console.log("Running global setup before all test suites...");
  await migrate();
};
