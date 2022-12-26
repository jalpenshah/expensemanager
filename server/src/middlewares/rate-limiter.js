const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  skipSuccessfulRequests: true,
});

const rateLimiterCustom = (message, skipSuccessfulRequests) =>
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    skipSuccessfulRequests: skipSuccessfulRequests,
    message: message,
  });

const limiter = {
  rateLimiterCustom,
  rateLimiter,
};
export default limiter;
