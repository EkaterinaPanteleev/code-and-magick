'use strict';

var getFilteredReviews = require('./filter/filter');
var FilterType = require('./filter/filter-type');
var load = require('./load');
var getReviewElement = require('./get-review-element');
var utils = require('../utils');

var filtersContainer = document.querySelector('.reviews-filter');
var reviewsBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var moreReviews = document.querySelector('.reviews-controls-more');
filtersContainer.classList.add('invisible');

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/**
 * Initial list of loaded reviews. Is used for filtering.
 */
var reviews = [];

/**
 * Current state of review list, which takes filtration and sorting.
 * Is used for rendering.
 * @type {Array}
 */
var filteredReviews = [];


var DEFAULT_FILTER = FilterType.ALL;
var PAGE_SIZE = 3;
var pageNumber = 0;


/** @param {Array.<Object>} reviews */
var renderReviews = function(reviewsToRender, page, replace) {
  if(replace) {
    reviewsContainer.innerHTML = '';
    moreReviews.classList.add('invisible');
  }
  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  reviewsBlock.classList.remove('reviews-list-loading');
  reviewsToRender.slice(from, to).forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  if (reviewsToRender.length > 3) {
    moreReviews.classList.remove('invisible');
  }
};

var setFilterEnabled = function(filter) {
  filteredReviews = getFilteredReviews(reviews, filter);
  pageNumber = 0;
  renderReviews(filteredReviews, pageNumber, true);
};

var setFiltrationEnabled = function() {
  filtersContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('reviews-filter-item')) {
      setFilterEnabled(event.target.getAttribute('for'));
    }
  });
};

var getMoreReviews = function() {
  moreReviews.addEventListener('click', function() {
    if (utils.isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
    }
    if (!utils.isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
      moreReviews.classList.add('invisible');
    }
  });
};

load(REVIEWS_LOAD_URL, function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled(true);
  setFilterEnabled(DEFAULT_FILTER);
  getMoreReviews();
  filtersContainer.classList.remove('invisible');
});


