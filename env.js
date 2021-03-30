// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  WP_SITE_URL: process.env.WP_SITE_URL,
  LASTFM_API_KEY: process.env.LASTFM_API_KEY
};