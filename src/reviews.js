'use strict';

var filtersContainer = document.querySelector('.reviews-filter');
var reviewsBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');
var moreReviews = document.querySelector('.reviews-controls-more');
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
var filteredReviews = [];

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var DEFAULT_FILTER = Filter.ALL;
var PAGE_SIZE = 3;
var pageNumber = 0;
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

var getFilteredReviews = function(reviewsToFilter, filter) {
  reviewsToFilter = reviews.slice(0);

  switch(filter) {
    case Filter.RECENT:
      var recentReviews = reviewsToFilter.filter(function(review) {
        var endPeriod = new Date() - 14 * 24 * 60 * 60 * 1000;
        return Date.parse(review.date) > endPeriod;
      });
      reviewsToFilter = recentReviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;

    case Filter.GOOD:
      var goodReviews = reviewsToFilter.filter(function(review) {
        return review.rating >= 3;
      });
      reviewsToFilter = goodReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case Filter.BAD:
      var badReviews = reviewsToFilter.filter(function(review) {
        return review.rating <= 2;
      });
      reviewsToFilter = badReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case Filter.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return reviewsToFilter;
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

var isNextPageAvailable = function(reviewsToCheck, page, pageSize) {
  reviewsToCheck = filteredReviews;
  if (filteredReviews.length % pageSize === 0) {
    return page < (Math.floor(filteredReviews.length / pageSize) - 1);
  } else {
    return page < Math.floor(filteredReviews.length / pageSize);
  }
};

var getMoreReviews = function() {
  moreReviews.addEventListener('click', function() {
    if (isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
    }
    if (!isNextPageAvailable(filteredReviews, pageNumber, PAGE_SIZE)) {
      moreReviews.classList.add('invisible');
    }
  });
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled(true);
  setFilterEnabled(DEFAULT_FILTER);
  getMoreReviews();
  filtersContainer.classList.remove('invisible');
});


