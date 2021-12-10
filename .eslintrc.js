module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/indent': ['error', 4],
        'import/prefer-default-export': 'off',
        'max-len': ['error', 120, 2, {
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignorePattern: '^/\\* eslint-disable',
        }],
        'no-plusplus': 'off',
    },
};
