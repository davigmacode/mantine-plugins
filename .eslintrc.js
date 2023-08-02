module.exports = {
  root: true,
  extends: ["mantine-plugins-config/eslint/base"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
