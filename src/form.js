'use strict';

(function() {
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
  submitButton.disabled = true;
  requiredDescription.classList.add('invisible');
  requiredName.classList.add('invisible');
  descriptionLabel.classList.add('invisible');
  nameLabel.classList.add('invisible');
  /**
  *form validation function
  */
  function checkValid() {
    var isValid = false;
    var reviewMarkChecked = document.querySelector('input[name="review-mark"]:checked');
    submitButton.disabled = true;
    if (reviewMarkChecked.value < 3) {
      requiredDescription.classList.remove('invisible');
      if (description.value) {
        submitButton.disabled = false;
        isValid = true;
        descriptionLabel.classList.add('invisible');
        requiredDescription.classList.add('invisible');
      } else {
        descriptionLabel.classList.remove('invisible');
        requiredDescription.classList.remove('invisible');
      }
    } else {
      requiredDescription.classList.add('invisible');
      submitButton.disabled = false;
      isValid = true;
      descriptionLabel.classList.add('invisible');
    }

    if (name.value) {
      nameLabel.classList.add('invisible');
      requiredName.classList.add('invisible');
    } else {
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

  name.onkeyup = checkValid;
  description.onkeyup = checkValid;
  /**
  *cookeis
  */
  var browserCookies = require('browser-cookies');
  var reviewMarkChecked = document.querySelector('input[name="review-mark"]:checked');
  name.value = browserCookies.get('name') || '';
  reviewMarkChecked.value = browserCookies.get('reviewMarkChecked') || 3;
  /**
  * рассчет количества дней, прошедших с последнего дня рождения
  */
  var today = new Date();
  var birthDay = new Date(today.getFullYear(), 10, 28);
  if ((today.getMonth() < 10) || (today.getMonth() === 10 && today.getDate() < 28)) {
    birthDay.setFullYear(birthDay.getFullYear() - 1);
  }
  reviewForm.onsubmit = function(event) {
    event.preventDefault();
    browserCookies.set('name', name.value, {
      expires: (today - birthDay)
    });
    browserCookies.set('reviewMarkChecked', reviewMarkChecked.value, {
      expires: (today - birthDay)
    });
    this.submit();
  };
})();

