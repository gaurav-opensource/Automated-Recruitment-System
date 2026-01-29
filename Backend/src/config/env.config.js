const dotenv = require("dotenv");
const Joi = require("joi");

// Load .env file
dotenv.config();

// Define schema for env variables
const envSchema = Joi.object({
  // Server
  PORT: Joi.number().default(5000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  // Database
  MONGO_URL: Joi.string().uri().required(),

  // Auth
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default("7d"),
  TEST_SECRET: Joi.string().min(32).required(),

  // Judge0
  JUDGE0_URL: Joi.string().uri().required(),
  JUDGE0_KEY: Joi.string().required(),
  JUDGE0_HOST: Joi.string().required(),

  // Email
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().required(),

  // Frontend / App
  FRONTEND_URL: Joi.string().uri().required(),
  APP_BASE_URL: Joi.string().uri().required(),
}).unknown(true);

// Validate env vars
const { value: env, error } = envSchema.validate(process.env);

if (error) {
  console.error("❌ Environment configuration error:");
  console.error(error.message);
  process.exit(1);
}

// Export validated env vars
module.exports = {
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,

  MONGO_URL: env.MONGO_URL,

  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRES_IN: env.JWT_EXPIRES_IN,
  TEST_SECRET: env.TEST_SECRET,

  JUDGE0_URL: env.JUDGE0_URL,
  JUDGE0_KEY: env.JUDGE0_KEY,
  JUDGE0_HOST: env.JUDGE0_HOST,

  EMAIL_USER: env.EMAIL_USER,
  EMAIL_PASS: env.EMAIL_PASS,

  FRONTEND_URL: env.FRONTEND_URL,
  APP_BASE_URL: env.APP_BASE_URL,
};
