import sequelize from "sequelize";
import db from "../../configs/database";
var split = db.define(
  "split",
  {
    id: { type: sequelize.STRING, primaryKey: true },
    expense_id: { type: sequelize.STRING, null: false },
    friend_id: { type: sequelize.STRING, null: false },
    share_type_value: { type: sequelize.DECIMAL(10, 2), null: false },
    share_type: { type: sequelize.STRING, null: false },
    share_amount: { type: sequelize.DECIMAL(10, 2), null: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = split;
