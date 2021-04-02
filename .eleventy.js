module.exports = function(eleventyConfig) {
    const { DateTime }  = require('luxon');
    const util          = require('util');
    const Image = require("@11ty/eleventy-img");

    // Layout aliases for convenience
    eleventyConfig.addLayoutAlias('default', 'layouts/_base.njk');
  
    // a debug utility
    eleventyConfig.addFilter('dump', obj => {
      return util.inspect(obj)
    });
  
  
    // Date helpers
    eleventyConfig.addFilter('readableDate', dateObj => {

      var myDate = DateTime.fromISO(dateObj, {
        zone: 'Australia/Melbourne'
      });

      return myDate.toFormat('d LLLL y');
    });

    eleventyConfig.addFilter('dateFromSeconds', dateObj => {

      var myDate = DateTime.fromSeconds(parseInt(dateObj), {
        zone: 'Australia/Melbourne'
      });

      return myDate.toFormat('d LLLL y');
    });


    eleventyConfig.addFilter('htmlDate', dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('y-MM-dd');
    });

    eleventyConfig.addShortcode("currentDate", () => {
      var currentDate = DateTime.fromJSDate(new Date(), {
        zone: 'Australia/Melbourne'
      });

      return currentDate.toFormat('d LLLL y');
    })

    eleventyConfig.addPassthroughCopy("./src/css");

    // image shortcode
    async function imageShortcode(src, alt, sizes) {
      let metadata = await Image(src, {
        widths: [150, 300],
        formats: ["avif", "jpeg"],
        outputDir: '_site/img',
      });
    
      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };
    
      // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes);
    }

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    return  {
      dir: {
        input: "src",
        includes: "_includes",
        output: "_site"
      },
      passthroughFileCopy: true,
      templateFormats : ["njk", "md"],
      htmlTemplateEngine : "njk",
      markdownTemplateEngine : "njk",
    };
  
  };