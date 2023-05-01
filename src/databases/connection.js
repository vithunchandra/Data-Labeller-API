const Sequelize = require("sequelize");
const config = require("../config/config");

const { host, username, password, port, database, dialect } =
  config.development;

const conn = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
});

module.exports = conn;
