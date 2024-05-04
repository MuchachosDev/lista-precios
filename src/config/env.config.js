import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.requiredOption('--mode <mode>', 'Mode App', 'prod');
program.parse();

const env = program.opts().mode;

dotenv.config({
  path: `.env.${env}`,
  override: true,
});

export default {
  URL: process.env.URL,
  MONGODB_HOST: process.env.MONGODB_HOST,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  DEFAULT_DOLLAR: process.env.DEFAULT_DOLLAR,
  PREFIX_DATABASE_ID: process.env.PREFIX_DATABASE_ID,
};
