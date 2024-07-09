module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
