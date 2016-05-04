/**
 * @fileoverview Constructor Review
*/

'use strict';
var getReviewElement = require('./get-review-element');
var quizAnswer = document.querySelectorAll('.review-quiz-answer');
/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data, container);
  this.onQuizClick = this.onQuizClick.bind(this);
  for (var i = 0; i < quizAnswer.length; i++) {
    quizAnswer[i].addEventListener('click', this.onQuizClick);
  }
  container.appendChild(this.element);
};

Review.prototype.onQuizClick = function(event) {
  event.target.classList.add('review-quiz-answer-active');
};
Review.prototype.remove = function() {
  for (var i = 0; i < quizAnswer.length; i++) {
    quizAnswer[i].removeEventListener('click', this.onQuizClick);
  }
  this.element.parentNode.removeChild(this.element);
};
module.exports = Review;
