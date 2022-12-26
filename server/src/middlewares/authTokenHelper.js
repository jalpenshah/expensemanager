import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '226138449041-ulsgtq3egdkjhok8onmbhd1hmmmbab4a.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res, next) => {
  try {
    const token = req.headers.authentication.split(' ')[1];
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).send();
  }
};

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'checkJWT_SECRET', {
    expiresIn: '1d',
  });
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authentication.split(' ')[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'checkJWT_SECRET',
      (error, payload) => {
        if (error) {
          res
            .status(401)
            .json({
              message:
                error.name === 'TokenExpiredError'
                  ? 'Token has expired'
                  : 'Invalid token',
            })
            .send();
        } else {
          req.payload = payload;
          next();
        }
      }
    );
  } catch (error) {
    res.status(401).send({ message: error.toString() });
  }
};

export { verifyGoogleToken, createToken, verifyToken };
