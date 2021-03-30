const Image = require('@11ty/eleventy-img');

async function getHtmlForImg(url) {
  let metadata = await Image(url, {
    widths: [480, 768, 992],
    formats: ["avif", "jpeg"],
    outputDir: '_site/img',
  });

  return Image.generateHTML(metadata, {
    alt: '',
    sizes: [480, 768, 992]
  })
}

async function replaceImagesInContent(content) {

    var re = /<img.*?src=\"(.*?)\"(.*?)\>/g;
    var match;
    var workingString = content;

    var imagesToReplace = []


    // Get matches and add them to array
    while ((match = re.exec(content)) != null) {

        [imgTag, imgUrl] = match;

        imagesToReplace.push({
          tag: imgTag,
          url: imgUrl
        })
    }

    // Add processed image HTML to image tags
    var replacements = imagesToReplace.map(async ({tag, url}) => {
      var html = await getHtmlForImg(url)
      return {
        tag,
        url,
        html
      }
    })

    // Replace image tags with new image HTML
    replacements.forEach(r => {
      workingString = workingString.replace(
        r.tag,
        r.html
    )
    })

    return workingString
}

module.exports = replaceImagesInContent