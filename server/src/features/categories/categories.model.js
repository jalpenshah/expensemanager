import sequelize from "sequelize";
import db from "../../configs/database";
var categories = db.define(
  "categories",
  {
    id: { type: sequelize.STRING, primaryKey: true },
    user_id: { type: sequelize.STRING, null: false },
    category: { type: sequelize.STRING, null: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = categories;
