exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run.
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        // Appium capabilities for Android Emulator
        platformName: 'Android',
        'appium:deviceName': 'Nexus 5',
        'appium:platformVersion': '10.0', // Corresponds to API_LEVEL 29
        'appium:automationName': 'UiAutomator2',
        'appium:browserName': 'Chrome',
        // Optional: Ensure it connects to the specific adb instance
        // 'appium:udid': 'emulator-5554'
    }],
    
    //
    // ===================
    // Test Configurations
    // ===================
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // Services take over a specific job you don't want to take care of.
    services: [
        ['appium', {
            // Appium service configuration
            command: 'appium',
        }]
    ],
    
    // Framework you want to run your specs with.
    framework: 'mocha',
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
