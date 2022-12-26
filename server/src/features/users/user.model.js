import sequelize from 'sequelize';
import db from '../../configs/database';
var user = db.define(
  'user',
  {
    id: { type: sequelize.STRING, primaryKey: true },
    username: { type: sequelize.STRING, null: false },
    password: { type: sequelize.STRING, null: false },
    token: { type: sequelize.STRING, null: false },
    email_id: { type: sequelize.STRING, null: false },
    avatar: { type: sequelize.STRING, null: true },
    currency: { type: sequelize.STRING, null: false },
    is_verified: { type: sequelize.INTEGER, null: false },
    is_setup_complete: { type: sequelize.INTEGER, null: false },
    partner_id: { type: sequelize.STRING, null: true },
    is_partner_verified: { type: sequelize.INTEGER, null: true },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = user;
