module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    plugins: ["jest", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:node/recommended",
        "plugin:prettier/recommended",
        "plugin:jest/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    overrides: [
        {
            files: ["*.ts"],
            rules: {
                "node/no-missing-import": "off",
            },
        },
    ],
};
