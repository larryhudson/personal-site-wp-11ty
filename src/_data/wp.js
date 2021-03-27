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
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
        homePage: nodeByUri(uri: "/") {
          ... on Page {
            content
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
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
      

      const homePageData = {
        ...data.homePage,
        featuredImage: {
          ...data.homePage.featuredImage.node
        }
      }


      return {
        posts: data.posts.nodes,
        homePage: homePageData,
        postsPage: data.postsPage
      }
  }

  module.exports = getData