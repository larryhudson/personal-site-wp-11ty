// required packages
const lastfmQuery = require('../_utils/lastfm');

async function getData() {
    return await lastfmQuery()
  }

module.exports = getData