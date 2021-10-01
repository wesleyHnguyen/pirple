/**
 * Create and export configuration variables
 */

// Container for all environments
let environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'thisIsASecret'
};

// production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'thisIsASecret'
};

// Determine which environment was pased as a command line argument''
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

// Check that the current environment is one of the environment above, if not, default staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;