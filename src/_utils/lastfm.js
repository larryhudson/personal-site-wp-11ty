// required packages
const axios = require("axios");

// Config from environment variable
const {LASTFM_API_KEY} = require('../../env');

// Config
const LASTFM_URL = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=6&period=7day&user=harryludson&api_key=${LASTFM_API_KEY}&format=json`;

async function lastfmQuery() {

    const response = await axios.get(LASTFM_URL);

    if (response.status == 200) {
        console.log(response.data)

        response.data.topalbums.album.forEach(album => {
            var lastImageUrl = album.image[album.image.length - 1]['#text']
            album.imageUrl = lastImageUrl
        })

      return response.data.topalbums
    }
    // Todo: fallback for failure
  }

  module.exports = lastfmQuery