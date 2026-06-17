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

  // Add hierarchical numbering to headings + generate ToC
  eleventyConfig.addTransform("headingNumbers", function(content, outputPath) {
    if (outputPath && outputPath.includes("/blog/")) {
      const headingRegex = /<h([2-6])>([^<]+)<\/h([2-6])>/g;
      const headings = [];
      let match;

      // First pass: collect all headings
      while ((match = headingRegex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2];
        headings.push({ level, text, originalMatch: match[0] });
      }

      // Build numbering
      const numbers = {};
      const numberCounters = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      const numberedHeadings = [];

      headings.forEach((heading) => {
        // Reset counters for deeper levels when we go back up
        for (let level = heading.level + 1; level <= 6; level++) {
          numberCounters[level] = 0;
        }
        numberCounters[heading.level]++;

        // Build hierarchical number (e.g., "2.1.3")
        let numStr = '';
        for (let level = 2; level <= heading.level; level++) {
          if (numStr) numStr += '.';
          numStr += numberCounters[level];
        }
        numbers[heading.originalMatch] = numStr;
        numberedHeadings.push({ ...heading, number: numStr });
      });

      // Second pass: replace headings with numbered versions and add IDs
      content = content.replace(/<h([2-6])>([^<]+)<\/h([2-6])>/g, (match, level, text, closingLevel) => {
        const numStr = numbers[match];

        // Normalize accents and special characters for ID
        const normalized = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '');

        const id = normalized
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');

        return `<h${level} id="${id}"><span class="heading-number">${numStr}</span> <a href="#${id}" class="heading-link">${text}</a></h${level}>`;
      });

      // Generate table of contents
      if (numberedHeadings.length > 0) {
        let toc = '<nav class="table-of-contents">\n';
        toc += '<h2>Índice</h2>\n';
        toc += '<ol>\n';

        let currentLevel = 2;

        numberedHeadings.forEach((heading, index) => {
          // Normalize accents for ID
          const normalized = heading.text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '');

          const id = normalized
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');

          if (heading.level > currentLevel) {
            for (let i = currentLevel; i < heading.level; i++) {
              toc += '<ol>\n';
            }
          } else if (heading.level < currentLevel) {
            for (let i = currentLevel; i > heading.level; i--) {
              toc += '</li>\n</ol>\n';
            }
            toc += '</li>\n';
          } else if (index > 0) {
            toc += '</li>\n';
          }

          toc += `<li><a href="#${id}"><span class="toc-number">${heading.number}</span> ${heading.text}</a>`;
          currentLevel = heading.level;
        });

        for (let i = currentLevel; i >= 2; i--) {
          toc += '</li>\n</ol>\n';
        }

        toc += '</nav>\n';

        // Insert ToC after post-meta and before post-content
        content = content.replace(
          /<div class="post-content">/,
          `<div class="post-content">\n        ${toc}`
        );
      }

      return content;
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