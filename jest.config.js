/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/crypto/',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [
        'text',
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
};
