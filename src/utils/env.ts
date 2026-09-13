import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  USERNAME: process.env.SAUCE_USER || 'standard_user',
  PASSWORD: process.env.SAUCE_PASSWORD || 'secret_sauce',
};
