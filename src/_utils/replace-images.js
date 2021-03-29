const Image = require('@11ty/eleventy-img');

async function replaceImagesInContent(content) {

    var re = /<img.*?src=\"(.*?)\"(.*?)\>/g;
    var match;
    var workingString = content;

    while ((match = re.exec(content)) != null) {

        [imgTag, imgUrl] = match;

        let metadata = await Image(imgUrl, {
          widths: [480, 768, 992],
          formats: ["avif", "jpeg"],
          outputDir: '_site/img',
        });

        var imgHtml = Image.generateHTML(metadata, {
          alt: '',
          sizes: [480, 768, 992]
        })

        workingString = workingString.replace(
            imgTag,
            imgHtml
        )
    }

    return workingString
}

module.exports = replaceImagesInContent