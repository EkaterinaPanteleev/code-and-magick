'use strict';

(function() {
  var utils = require('./utils');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var reviewForm = document.querySelector('.review-form');
  var name = document.querySelector('#review-name');
  var description = document.querySelector('#review-text');
  var reviewMark = document.querySelectorAll('input[name="review-mark"]');
  var submitButton = document.querySelector('.review-submit');
  var nameLabel = document.querySelector('.review-fields-name');
  var descriptionLabel = document.querySelector('.review-fields-text');
  var blockLabel = document.querySelector('.review-fields');
  var requiredName = document.querySelector('.required-field-name');
  var requiredDescription = document.querySelector('.required-field-desc');
  var nameErrorMessage = document.querySelector('.field-name-error-message');
  var descErrorMessage = document.querySelector('.field-desc-error-message');
  submitButton.disabled = true;
  name.required = true;
  requiredDescription.classList.add('invisible');
  requiredName.classList.remove('invisible');
  nameLabel.classList.remove('invisible');
  descriptionLabel.classList.add('invisible');
  /**
  *form validation function
  */
  function checkValid() {
    var isValid = false;
    var reviewMarkChecked = document.querySelector('input[name="review-mark"]:checked');
    submitButton.disabled = true;
    if (reviewMarkChecked.value < 3) {
      description.required = true;
      descErrorMessage.innerHTML = description.validationMessage;
      requiredDescription.classList.remove('invisible');
      if (description.checkValidity()) {
        submitButton.disabled = false;
        isValid = true;
        descriptionLabel.classList.add('invisible');
        requiredDescription.classList.add('invisible');
      } else {
        descriptionLabel.classList.remove('invisible');
        requiredDescription.classList.remove('invisible');
      }
    } else {
      description.required = false;
      descErrorMessage.innerHTML = '';
      requiredDescription.classList.add('invisible');
      submitButton.disabled = false;
      isValid = true;
      descriptionLabel.classList.add('invisible');
    }

    if (name.checkValidity()) {
      nameLabel.classList.add('invisible');
      requiredName.classList.add('invisible');
      nameErrorMessage.innerHTML = '';
    } else {
      nameErrorMessage.innerHTML = name.validationMessage;
      nameLabel.classList.remove('invisible');
      requiredName.classList.remove('invisible');
    }

    if (name.value && isValid) {
      submitButton.disabled = false;
      blockLabel.classList.add('invisible');
    } else {
      submitButton.disabled = true;
      blockLabel.classList.remove('invisible');
    }
  }
  for (var i = 0; i < reviewMark.length; i++) {
    reviewMark[i].onchange = checkValid;
  }

  name.oninput = checkValid;
  description.oninput = checkValid;
  /**
  *cookies
  */
  var browserCookies = require('browser-cookies');
  name.value = browserCookies.get('name') || '';
  var markToCheck = browserCookies.get('markToCookies') || '3';
  for (i = 0; i < reviewMark.length; i++) {
    if (reviewMark[i].value === markToCheck) {
      reviewMark[i].checked = true;
    } else {
      reviewMark[i].checked = false;
    }
  }
  checkValid();

  reviewForm.onsubmit = function(event) {
    event.preventDefault();
    browserCookies.set('name', name.value, {
      expires: utils.cookieToExpire
    });
    var markToCookies = document.querySelector('input[name="review-mark"]:checked');
    browserCookies.set('markToCookies', markToCookies.value, {
      expires: utils.cookieToExpire
    });
    this.submit();
  };
})();
