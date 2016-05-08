/**
 * @fileoverview Gallary constructor
 * shows clicked picture in the gallery
 * shows prev/next pucture
 * closes gallery on closeElement clik or Esc
 */

'use strict';
var utils = require('../utils');

/** @constructor */
var Gallery = function() {
  this.element = document.querySelector('.overlay-gallery');
  this.closeElement = this.element.querySelector('.overlay-gallery-close');
  this.currentNumber = this.element.querySelector('.preview-number-current');
  this.totalNumber = this.element.querySelector('.preview-number-total');
  this.controlLeft = this.element.querySelector('.overlay-gallery-control-left');
  this.controlRight = this.element.querySelector('.overlay-gallery-control-right');
  this.pictureContainer = this.element.querySelector('.overlay-gallery-preview-picture');
  this.imgs = document.querySelectorAll('.photogallery-image > img');

  this.activePicture = 0;
  this.picturesToShow = [];

  this._onCloseClickHandler = this._onCloseClickHandler.bind(this);
  this._onDocumentKeydownHandler = this._onDocumentKeydownHandler.bind(this);
  this._onPrevClickHandler = this._onPrevClickHandler.bind(this);
  this._onNextClickHandler = this._onNextClickHandler.bind(this);

  this.getPictures();
};

Gallery.prototype.getPictures = function() {
  this.picturesToShow = Array.prototype.map.call(this.imgs, function(obj) {
    return obj.getAttribute('src');
  });
  return this.picturesToShow;
};

Gallery.prototype.controlCheck = function() {
  if (this.activePicture <= 0) {
    this.controlLeft.classList.add('invisible');
  } else {
    this.controlLeft.classList.remove('invisible');
  }
  if (this.activePicture >= this.picturesToShow.length - 1) {
    this.controlRight.classList.add('invisible');
  } else {
    this.controlRight.classList.remove('invisible');
  }
};

Gallery.prototype.showGallery = function(pictureSrc) {
  this.element.classList.remove('invisible');
  var pictureNumber = this.picturesToShow.indexOf(pictureSrc);
  this.activePicture = pictureNumber;
  this.controlCheck();
  this.currentNumber.innerHTML = pictureNumber + 1;
  this.totalNumber.innerHTML = this.picturesToShow.length;
  this.showPicture(this.picturesToShow[pictureNumber]);
  this.controlLeft.addEventListener('click', this._onPrevClickHandler);
  this.controlRight.addEventListener('click', this._onNextClickHandler);
  this.closeElement.addEventListener('click', this._onCloseClickHandler);
  document.addEventListener('keydown', this._onDocumentKeydownHandler);
};

Gallery.prototype.showPicture = function(pic) {
  this.pictureContainer.innerHTML = '';
  var pictureElement = new Image();
  this.pictureContainer.appendChild(pictureElement);
  pictureElement.src = pic;
};

Gallery.prototype.hideGallery = function() {
  location.hash = '';
  this.element.classList.add('invisible');
  this.controlLeft.removeEventListener('click', this._onPrevClickHandler);
  this.controlRight.removeEventListener('click', this._onNextClickHandler);
  this.closeElement.removeEventListener('click', this._onCloseClickHandler);
  document.removeEventListener('keydown', this._onDocumentKeydownHandler);
};

Gallery.prototype._onCloseClickHandler = function() {
  this.hideGallery();
};

Gallery.prototype._onDocumentKeydownHandler = function() {
  if (utils.isDeactivationEvent(event)) {
    event.preventDefault();
    this.hideGallery();
  }
};

Gallery.prototype._onPrevClickHandler = function() {
  location.hash = '#photo/' + this.picturesToShow[this.activePicture - 1];
};

Gallery.prototype._onNextClickHandler = function() {
  location.hash = '#photo/' + this.picturesToShow[this.activePicture + 1];
};

module.exports = new Gallery();
