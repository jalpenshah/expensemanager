import sequelize from "sequelize";
import db from "../../configs/database";
var expense = db.define(
  "expense",
  {
    id: { type: sequelize.STRING, primaryKey: true },
    user_id: { type: sequelize.STRING, null: false },
    paid_by: { type: sequelize.STRING, null: false },
    type: { type: sequelize.STRING, null: false },
    category: { type: sequelize.STRING, null: false },
    title: { type: sequelize.STRING, null: false },
    desc: { type: sequelize.STRING, null: true },
    amount: { type: sequelize.DECIMAL(10, 2), null: false },
    currency: { type: sequelize.STRING, null: false },
    date: { type: sequelize.DATE, null: false },
    is_doc_uploaded: { type: sequelize.STRING, null: false },
    split_id: { type: sequelize.STRING, null: true },
    user_share: { type: sequelize.DECIMAL(10, 2), null: true },
    share_type: { type: sequelize.STRING, null: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = expense;
