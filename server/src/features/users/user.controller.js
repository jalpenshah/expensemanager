import userService from './user.service';
import categoryService from '../categories/categories.service';
import { sendMail } from '../../utils/email';
import logger from '../../configs/logger';

import { v4 as uuidv4 } from 'uuid';

const createUser = async (req, res) => {
  try {
    const userObj = {
      email: req.body.email,
    };
    const data = await userService.createUser(userObj);

    res.status(200).json({
      data: data,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error });
  }
};

const fetchUserByEmail = async (req, res) => {
  try {
    const emailId = req.params.emailId;
    res.status(200).json({
      data: await userService.fetchUserByEmail(emailId),
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ message: error });
  }
};

const fetchPartnerEmail = async (req, res) => {
  try {
    const userId = req.payload.id;
    if (userId !== null) {
      try {
        const { partnerId, isPartnerVerified } =
          await userService.fetchPartnerEmail(userId);
        const responseObj = {
          partnerId: partnerId,
          isVerified: isPartnerVerified,
        };
        res.status(200).json(responseObj);
      } catch (err) {
        res.status(200).json({});
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ message: error });
  }
};

const saveSetup = async (req, res) => {
  try {
    const userId = req.payload.id;
    const userEmail = req.payload.email;
    const categories = req.body.categories;
    const partnerEmailId = req.body.partnerEmail;
    const params = {
      currency: req.body.currency,
      is_setup_complete: 1,
    };

    if (partnerEmailId !== null && partnerEmailId !== undefined) {
      const partnerUser = await userService.fetchUserByEmail(partnerEmailId);

      //send email for verification
      sendMail(partnerEmailId, 'Partner account verification!', {
        template: 'PARTNER_VERIFY',
        params: {
          userId,
          userEmail,
        },
      });

      if (partnerUser.length > 0) {
        params['partner_id'] = partnerUser[0].id;
        params['is_partner_verified'] = 0;
      }
    }

    if (req) await userService.updateUser(userId, params);

    categories.forEach(async (category) => {
      const categoryModel = {};
      categoryModel['id'] = uuidv4();
      categoryModel['user_id'] = userId;
      categoryModel['category'] = category;
      categoryService
        .addCategory(categoryModel)
        .catch((err) =>
          logger.error(
            `Catching error for unique data error, ${userId}-${category}`
          )
        );
    });
    res.status(200).json({
      status: 'SUCCESS',
      isPartnerValid: params['partner_id'] !== undefined,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error });
  }
};

const verifyPartner = async (req, res) => {
  try {
    const id = req.params.ref;
    //Setting is_partner_verified flag as true for user and partner
    const { id: pId } = await userService.fetchPartnerEmail(id);
    const params = {
      is_partner_verified: 1,
    };
    const partnerParams = {
      partner_id: id,
      is_partner_verified: 1,
    };
    await userService.updateUser(id, params);
    await userService.updateUser(pId, partnerParams);
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userController = {
  createUser,
  fetchUserByEmail,
  saveSetup,
  fetchPartnerEmail,
  verifyPartner,
};
export default userController;
