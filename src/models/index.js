const db = {};
const { DataTypes } = require("sequelize");
const conn = require("../databases/connection");

const User = require("./User");
const Task = require("./Task");
const Data = require("./Data");
const Label = require("./Label");
const TaskType = require("./TaskType");
const UserBlacklist = require("./UserBlacklist");
const PossibleClassification = require("./PossibleClassification");

db.User = User(conn, DataTypes);
db.Task = Task(conn, DataTypes);
db.Data = Data(conn, DataTypes);
db.Label = Label(conn, DataTypes);
db.TaskType = TaskType(conn, DataTypes);
db.UserBlacklist = UserBlacklist(conn, DataTypes);
db.PossibleClassification = PossibleClassification(conn, DataTypes);

for (const key of Object.keys(db)) {
  db[key].associate(db);
}

module.exports = db;
