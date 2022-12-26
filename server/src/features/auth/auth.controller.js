import { createToken } from '../../middlewares/authTokenHelper';
import userService from '../users/user.service';

const continueWithGoogle = async (req, res) => {
  try {
    const profile = req?.payload;
    const existsInDB = await userService.fetchUserByEmail(profile?.email);
    const token = createToken({ email: profile?.email, id: profile?.sub });
    if (existsInDB.length === 0) {
      userService.createUser({
        id: profile.sub,
        username: `${profile.given_name} ${profile.family_name}`,
        email_id: profile.email,
        avatar: profile.picture,
        currency: 'GBP',
        is_verified: profile.email_verified,
        token: token,
        is_setup_complete: 0,
      });
    }
    res.status(200).json({
      message: 'SUCCESS',
      user: {
        id: profile?.sub,
        is_new:
          existsInDB &&
          existsInDB.length > 0 &&
          existsInDB[0]['is_setup_complete'] !== undefined
            ? existsInDB[0]['is_setup_complete']
            : 0,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};

const authController = {
  continueWithGoogle,
};
export default authController;
