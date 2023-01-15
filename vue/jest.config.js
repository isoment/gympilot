module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],

  // If we get SyntaxError: Cannot use import statement outside a module
  // error again we might need to add the package like we did with axios above
  // transformIgnorePatterns: [
  //   "node_modules/(?!(a-module"
  //     + "|another-module"
  //     + "|yet-another-module"
  //     + ")/)",
  // ]
};
