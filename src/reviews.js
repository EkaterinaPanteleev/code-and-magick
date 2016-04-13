'use strict';

var filtersContainer = document.querySelector('.reviews-filter');
var reviewsBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
filtersContainer.classList.add('invisible');

if('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

var reviews = [];

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var DEFAULT_FILTER = Filter.ALL;

/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */

var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);
  var authorImage = new Image();
  var authorImageLoadTimeout;

  authorImage.onload = function(event) {
    clearTimeout(authorImageLoadTimeout);

    element.querySelector('img').src = event.target.src;
    element.querySelector('img').title = data.author.name;
    element.querySelector('img').alt = data.author.name;
    element.querySelector('img').setAttribute('width', 124);
    element.querySelector('img').setAttribute('height', 124);
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  authorImage.src = data.author.picture;

  authorImageLoadTimeout = setTimeout(function() {
    authorImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};


/** @param {Array.<Object>} reviews */
var renderReviews = function(reviewsToRender) {
  reviewsToRender = reviews;
  reviewsContainer.innerHTML = '';
  reviewsBlock.classList.remove('reviews-list-loading');
  reviewsToRender.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

var getFilteredReviews = function(reviewsToFilter, filter) {
  reviewsToFilter = reviews.slice(0);

  switch(filter) {
    case Filter.BAD:
      reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
  }

  return reviewsToFilter;
};

var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);
};

var setFiltrationEnabled = function(enabled) {
  var filters = filtersContainer.querySelectorAll('input[name="reviews"]');
  for(var i = 0; i < filters.length; i++) {
    filters[i].onclick = enabled ? function() {
      setFilterEnabled(this.id);
      console.log(this.id);
    } : null;
  }
};


/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  reviewsBlock.classList.add('reviews-list-loading');
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(event) {
    var loadedData = JSON.parse(event.target.response);
    callback(loadedData);
  };

  xhr.oneror = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };
  xhr.send();
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled(true);
  setFilterEnabled(DEFAULT_FILTER);
  filtersContainer.classList.remove('invisible');
});


