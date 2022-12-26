import user from './user.model';
import db from '../../configs/database';
import logger from '../../configs/logger';

const createUser = async (userObj) => {
  try {
    const newUser = await user.create(userObj);
    return newUser;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const fetchUserByEmail = async (emailId) => {
  try {
    return await user.findAll({
      where: { email_id: emailId },
    });
  } catch (error) {
    throw error;
  }
};

const fetchUserById = async (id) => {
  try {
    return await user.findAll({
      where: { id: id },
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, params) => {
  try {
    return await user.update(params, {
      where: { id: userId },
    });
  } catch (error) {
    throw error;
  }
};

const fetchPartnerEmail = async (userId) => {
  const query = `SELECT id,email_id,is_partner_verified FROM user where id IN (SELECT partner_id FROM user WHERE id='${userId}')`;
  const records = await db.query(query);
  if (records.length > 0) {
    return {
      id: records[0][0].id,
      partnerId: records[0][0].email_id,
      isPartnerVerified: records[0][0].is_partner_verified,
    };
  } else {
    return null;
  }
};

const userService = {
  createUser,
  fetchUserByEmail,
  fetchUserById,
  updateUser,
  fetchPartnerEmail,
};
export default userService;
