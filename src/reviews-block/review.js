/**
 * @fileoverview Constructor Review
*/

'use strict';
var getReviewElement = require('./get-review-element');
/**
 * @param {Object} data
 * @param {Element} container
 * @constructor
 */
var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement(this.data, container);
  this.quizAnswer = this.element.querySelectorAll('.review-quiz-answer');
  this.onQuizClick = this.onQuizClick.bind(this);
  for (var i = 0; i < this.quizAnswer.length; i++) {
    this.quizAnswer[i].addEventListener('click', this.onQuizClick);
  }
  container.appendChild(this.element);
};

Review.prototype.onQuizClick = function(event) {
  event.target.classList.add('review-quiz-answer-active');
};
Review.prototype.remove = function() {
  for (var i = 0; i < this.quizAnswer.length; i++) {
    this.quizAnswer[i].removeEventListener('click', this.onQuizClick);
  }
  this.element.parentNode.removeChild(this.element);
};
module.exports = Review;
