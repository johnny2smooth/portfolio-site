const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {
config.addCollection('work', collection => {
  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
});

config.addFilter('dateFilter', dateFilter);
config.addFilter('w3DateFilter', w3DateFilter);

// Returns work items, sorted by display order then filtered by featured
config.addCollection('featuredWork', collection => {
  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
    x => x.data.featured
  );
});

config.addCollection('blog', collection => {
  return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
});

  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/css/');

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: "src",
      output: "_site"
    }
  };
};