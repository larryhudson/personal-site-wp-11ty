module.exports = function(eleventyConfig) {
    const { DateTime }  = require('luxon');
    const util          = require('util');

    // Layout aliases for convenience
    eleventyConfig.addLayoutAlias('default', 'layouts/_base.njk');
  
    // a debug utility
    eleventyConfig.addFilter('dump', obj => {
      return util.inspect(obj)
    });
  
  
    // Date helpers
    eleventyConfig.addFilter('readableDate', dateObj => {
      return DateTime.fromISO(dateObj).toFormat('d LLLL y');
    });
    eleventyConfig.addFilter('htmlDate', dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('y-MM-dd');
    });


  
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