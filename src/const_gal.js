/**
 * @fileoverview Gallary component
 */


'use strict';
var utils = require('./utils');
/** @constructor */
var Gallery = function() {
  var self = this;
  this.element = document.querySelector('.overlay-gallery');
  var closeElement = this.element.querySelector('.overlay-gallery-close');
  var controlLeft = this.element.querySelector('.overlay-gallery-control-left');
  var controlRight = this.element.querySelector('.overlay-gallery-control-right');
  var pictureContainer = this.element.querySelector('.overlay-gallery-preview-picture');
  var currentNumber = this.element.querySelector('.preview-number-current');
  var totalNumber = this.element.querySelector('.preview-number-total');
  var imgs = document.querySelectorAll('.photogallery-image > img');

  this.activePicture = 0;
  this.picturesToShow = [];

  this.getPictures = function() {
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('src');
      this.picturesToShow.push(src);
    }
    return this.picturesToShow;
  };

  this.controlCheck = function() {
    if (this.activePicture <= 0) {
      controlLeft.classList.add('invisible');
    } else {
      controlLeft.classList.remove('invisible');
    }
    if (this.activePicture >= this.picturesToShow.length - 1) {
      controlRight.classList.add('invisible');
    } else {
      controlRight.classList.remove('invisible');
    }
  };

  this._onCloseClickHandler = function() {
    self.hideGallery();
  };
  this._onDocumentKeydownHandler = function() {
    if (utils.isDeactivationEvent(event)) {
      event.preventDefault();
      self.hideGallery();
    }
  };
  this._onPictureClickHandler = function(currentPicture) {
    this.showGallery(currentPicture);
  };

  this._onPrevClickHandler = function() {
    self.showGallery(self.activePicture - 1);
  };

  this._onNextClickHandler = function() {
    self.showGallery(self.activePicture + 1);
  };

  this.showPicture = function(pic) {
    pictureContainer.innerHTML = '';
    var pictureElement = new Image();
    pictureContainer.appendChild(pictureElement);
    pictureElement.src = pic;
  };

  this.showGallery = function(pictureNumber) {
    this.element.classList.remove('invisible');
    this.activePicture = pictureNumber;
    this.controlCheck();
    currentNumber.innerHTML = '';
    currentNumber.innerHTML = pictureNumber + 1;
    totalNumber.innerHTML = '';
    totalNumber.innerHTML = this.picturesToShow.length;
    this.showPicture(this.picturesToShow[pictureNumber]);
    controlLeft.addEventListener('click', this._onPrevClickHandler);
    controlRight.addEventListener('click', this._onNextClickHandler);
    closeElement.addEventListener('click', this._onCloseClickHandler);
    document.addEventListener('keydown', this._onDocumentKeydownHandler);
  };
  this.hideGallery = function() {
    this.element.classList.add('invisible');
    controlLeft.removeEventListener('click', this._onPrevClickHandler);
    controlRight.removeEventListener('click', this._onNextClickHandler);
    closeElement.removeEventListener('click', this._onCloseClickHandler);
    document.removeEventListener('keydown', this._onDocumentKeydownHandler);
  };

  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', (function(memorizedI) {
      return function() {
        self._onPictureClickHandler(memorizedI);
      };
    })(i));
  }
};
module.exports = new Gallery();
