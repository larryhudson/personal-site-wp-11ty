const axios = require('axios');
const url = require('url');


const {POCKET_API_CONSUMER_KEY, POCKET_API_REQUEST_TOKEN, POCKET_API_ACCESS_TOKEN} = require('../../env')

async function getPocketRequestToken() {

    const POCKET_REQUEST_TOKEN_URL = 'https://getpocket.com/v3/oauth/request'

    const response = await axios.post(POCKET_REQUEST_TOKEN_URL, {
        consumer_key: POCKET_API_CONSUMER_KEY,
        redirect_uri: 'https://www.larryhudson.io/auth-done'
    });

    if (response.status == 200) {
        console.log(response.data)
        return response.data
    }
  }

  async function getPocketAccessToken() {

    const POCKET_ACCESS_TOKEN_URL = 'https://getpocket.com/v3/oauth/authorize'

    const response = await axios.post(POCKET_ACCESS_TOKEN_URL, {
        consumer_key: POCKET_API_CONSUMER_KEY,
        code: POCKET_API_REQUEST_TOKEN
    });

    if (response.status == 200) {
        console.log(response.data)
        return response.data
    }
  }

  async function getPocketArticles() {

      const POCKET_GET_URL = 'https://getpocket.com/v3/get'

      const response = await axios.post(POCKET_GET_URL, {
          consumer_key: POCKET_API_CONSUMER_KEY,
          access_token: POCKET_API_ACCESS_TOKEN,
          state: 'archive',
          favorite: 1
      })

      if (response.status == 200) {
          const articleIds = Object.keys(response.data.list)
          var articles = articleIds.map(id => response.data.list[id]).sort((a, b) => parseInt(b.time_favorited) - parseInt(a.time_favorited))
          console.log(articles)
          articles = articles.map(article => {

              if (article.domain_metadata && article.domain_metadata.name == 'YouTube') {
                  const videoUrl = new URL(article.resolved_url)
                  const videoId = videoUrl.searchParams.get('v')
                  article.top_image_url = `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`
                //   Todo: use YouTube oembed API to fetch data about YouTube video
                // https://stackoverflow.com/questions/10896233/how-can-i-retrieve-youtube-video-details-from-video-url-using-php
              }

              // Add website by splitting up the URL and removing www. if needed   
              article.website = article.resolved_url.split('/')[2]
              article.website = article.website.startsWith('www.') ? article.website.slice(4) : article.website
              return article
          })
          return articles
      }
  }



  module.exports = getPocketArticles