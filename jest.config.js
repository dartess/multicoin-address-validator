module.exports = {
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/src/crypto/",
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: [
        "text",
    ],
};
