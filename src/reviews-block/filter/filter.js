/**
 * @fileoverview Filter function
 */

'use strict';


var FilterType = require('./filter-type');
var getFilteredReviews = function(reviews, filterType) {
  var reviewsToFilter = reviews.slice(0);

  switch(filterType) {
    case FilterType.RECENT:
      var recentReviews = reviewsToFilter.filter(function(review) {
        var endPeriod = new Date() - 14 * 24 * 60 * 60 * 1000;
        return Date.parse(review.date) > endPeriod;
      });
      reviewsToFilter = recentReviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;

    case FilterType.GOOD:
      var goodReviews = reviewsToFilter.filter(function(review) {
        return review.rating >= 3;
      });
      reviewsToFilter = goodReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case FilterType.BAD:
      var badReviews = reviewsToFilter.filter(function(review) {
        return review.rating <= 2;
      });
      reviewsToFilter = badReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case FilterType.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return reviewsToFilter;
};

module.exports = getFilteredReviews;
