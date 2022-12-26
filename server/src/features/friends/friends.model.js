import sequelize from "sequelize";
import db from "../../configs/database";
var friends = db.define(
  "friends",
  {
    id: { type: sequelize.STRING, primaryKey: true },
    user_id: { type: sequelize.STRING, null: false },
    name: { type: sequelize.STRING, null: false },
    avatar: { type: sequelize.STRING, null: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = friends;
