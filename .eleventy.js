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
    eleventyConfig.addFilter('htmlDate', dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('y-MM-dd');
    });

    eleventyConfig.addPassthroughCopy("./src/css");

    // image shortcode
    async function imageShortcode(src, alt, sizes) {
      let metadata = await Image(src, {
        widths: [150],
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

    async function optimiseImages(content) {
      var regex = /<img.*?src=\"(.*?)\"(.*?)\>/;
      var src = regex.exec(content);

      if (src) {
        [imgTag, imgUrl] = src;
        console.log(imgTag)
        console.log(imgUrl)

        let metadata = await Image(imgUrl, {
          widths: [480, 610],
          formats: ["avif", "jpeg"],
          outputDir: '_site/img',
        });

        var imgHtml = await Image.generateHTML(metadata, {
          alt: '',
          sizes: [480, 610]
        })

        console.log(imgHtml)

        var newContent = content.replace(imgTag, imgHtml)
      } else {
        var newContent = content
      }

      return await newContent
    }

    eleventyConfig.addFilter('optimiseImages', optimiseImages)

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);


  
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