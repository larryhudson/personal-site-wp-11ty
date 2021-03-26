// required packages
const graphqlQuery = require('../_utils/graphql');

async function getData() {
    const data = await graphqlQuery({
      query: `query posts {
        posts: posts {
          nodes {
            content
            slug
            title
            date
            excerpt
          }
        }
        homePage: nodeByUri(uri: "/") {
          ... on Page {
            content
            title
          }
        }
        postsPage: nodeByUri(uri: "/posts/") {
          ... on Page {
            content
            title
          }
        }
      }      
      `
      });

      return {
        posts: data.posts.nodes,
        homePage: data.homePage,
        postsPage: data.postsPage
      }
  }

  module.exports = getData