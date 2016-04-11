'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var elementToClone;
reviewsFilter.classList.add('invisible');

if('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

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

  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};
/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
  reviewsBlock.classList.remove('reviews-list-loading');
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

getReviews(function(loadedReviews) {
  var reviews = loadedReviews;
  renderReviews(reviews);
  reviewsFilter.classList.remove('invisible');
});


