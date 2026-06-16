module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};