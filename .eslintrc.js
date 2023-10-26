module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    plugins: ["jest"],
    extends: [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
};
