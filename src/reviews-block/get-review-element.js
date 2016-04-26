/**
 * @fileoverview Review template and review render function based on template
*/
'use strict';

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

var templateElement = document.querySelector('template');
var elementToClone;

if('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

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
module.exports = getReviewElement;
