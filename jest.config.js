export default {
    testEnvironment: 'node',
    transform: {}, // Disable transform for ESM support
    testTimeout: 60000,
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: 'test-results', outputName: 'integration-report.xml' }] // Requirements ask for json, but widely supported
    ]
};
