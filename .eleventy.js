module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("favicon.svg");

  // Date filters
  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(date));
  });

  eleventyConfig.addFilter("dateFilter", (date) => {
    return new Date(date).toISOString();
  });

  // Add heading anchors to markdown (like GitHub)
  eleventyConfig.addTransform("headingAnchors", function(content, outputPath) {
    if (outputPath && outputPath.includes("/blog/")) {
      // Replace headings with IDs and anchor links
      return content.replace(/<h([2-6])>([^<]+)<\/h([2-6])>/g, (match, level, text, closingLevel) => {
        // Normalize accents and special characters
        const normalized = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, ''); // Remove diacritical marks

        const id = normalized
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-')       // Replace spaces with hyphens
          .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens

        return `<h${level} id="${id}"><a href="#${id}" class="heading-link">${text}</a></h${level}>`;
      });
    }
    return content;
  });

  // Collection for blog posts
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/"
  };
};