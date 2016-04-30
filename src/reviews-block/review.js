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
  var quizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  this.onQuizClick = function() {
    this.classList.add('review-quiz-answer-active');
  };
  this.remove = function() {
    for (var i = 0; i < quizAnswer.length; i++) {
      quizAnswer[i].removeEventListener('click', this.onQuizClick);
    }
    this.element.parentNode.removeChild(this.element);
  };

  for (var i = 0; i < quizAnswer.length; i++) {
    quizAnswer[i].addEventListener('click', this.onQuizClick);
  }
  container.appendChild(this.element);
};

module.exports = Review;
