const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envVariables = (isDevelop) => {
  const prodEnvFile = path.resolve(process.cwd(), '.env');
  const devEnvFile = path.resolve(process.cwd(), '.env.local');

  if (isDevelop && fs.existsSync(devEnvFile)) {
    return dotenv.config({ path: devEnvFile }).parsed;
  }

  if (fs.existsSync(prodEnvFile)) {
    return dotenv.config({ path: prodEnvFile }).parsed;
  }

  throw Error('.env file required');
};

module.exports = envVariables;
