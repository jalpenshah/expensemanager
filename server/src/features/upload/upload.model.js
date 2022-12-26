import sequelize from "sequelize";
import db from "../../configs/database";
var upload = db.define(
  "upload",
  {
    id: { type: sequelize.STRING, primaryKey: true },
    url: { type: sequelize.STRING, null: true },
    type: { type: sequelize.STRING, null: false },
    parent_id: { type: sequelize.STRING, null: false },
    image: { type: sequelize.BLOB, null: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = upload;
