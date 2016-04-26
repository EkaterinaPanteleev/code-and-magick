/**
 * @fileoverview Data load method
 */

'use strict';

/**
 * @param {string} url
 * @param {function(Object)} callback
*/
var reviewsBlock = document.querySelector('.reviews');
var load = function(url, callback) {
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

  xhr.open('GET', url);
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    reviewsBlock.classList.add('reviews-load-failure');
  };
  xhr.send();
};
module.exports = load;
