/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'jest-puppeteer',
    globals: {
        __PUPPETEER__: true,
    },
};
