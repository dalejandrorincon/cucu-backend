require('dotenv').config({ overwrite: true });
const path = require('path');
const { USER_DB, PASSWORD_DB, NAME_DB, HOST_DB } = process.env;
const BASE_PATH = path.join(__dirname, 'db');

const options = {
  client: 'pg',
  connection: `postgresql://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/${NAME_DB}`,
  migrations: {
    directory: path.join(BASE_PATH, 'migrations')
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds')
  }
};

module.exports = options;
