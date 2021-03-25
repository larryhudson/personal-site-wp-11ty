// required packages
const axios = require("axios");

// Config from environment variable
const {WP_SITE_URL} = require('../../env');

// Config
const GRAPHQL_URL = `${WP_SITE_URL}/graphql`;

async function graphqlQuery({query}) {

    const response = await axios.post(GRAPHQL_URL, {
        query: query
    });

    if (response.status == 200) {
      return response.data.data
    }
    // Todo: fallback for failure
  }

  module.exports = graphqlQuery