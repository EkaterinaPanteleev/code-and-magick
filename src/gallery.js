'use strict';
var utils = require('./utils');
var overlayGallery = document.querySelector('.overlay-gallery');
var closeButton = document.querySelector('.overlay-gallery-close');
var controlLeft = document.querySelector('.overlay-gallery-control-left');
var controlRight = document.querySelector('.overlay-gallery-control-right');
var pictureContainer = document.querySelector('.overlay-gallery-preview-picture');
var currentNumber = document.querySelector('.preview-number-current');
var totalNumber = document.querySelector('.preview-number-total');
var imgs = document.querySelectorAll('.photogallery-image > img');
var activePicture;

var picturesToShow = [];

var getPictures = function() {
  for (var i = 0; i < imgs.length; i++) {
    var src = imgs[i].getAttribute('src');
    picturesToShow.push(src);
  }
  return picturesToShow;
};

var controlCheck = function() {
  if (activePicture <= 0) {
    controlLeft.classList.add('invisible');
  } else {
    controlLeft.classList.remove('invisible');
  }
  if (activePicture >= picturesToShow.length - 1) {
    controlRight.classList.add('invisible');
  } else {
    controlRight.classList.remove('invisible');
  }
};

var showGallery = function(pictureNumber) {
  overlayGallery.classList.remove('invisible');
  activePicture = pictureNumber;
  controlCheck();
  currentNumber.innerHTML = '';
  currentNumber.innerHTML = pictureNumber + 1;
  totalNumber.innerHTML = '';
  totalNumber.innerHTML = picturesToShow.length;
  showPicture(picturesToShow[pictureNumber]);
  controlLeft.addEventListener('click', _onPrevClickHandler);
  controlRight.addEventListener('click', _onNextClickHandler);
  closeButton.addEventListener('click', _onCloseClickHandler);
  document.addEventListener('keydown', _onDocumentKeydownHandler);
};

var showPicture = function(pic) {
  pictureContainer.innerHTML = '';
  var pictureElement = new Image();
  pictureContainer.appendChild(pictureElement);
  pictureElement.src = pic;
};

var hideGallery = function() {
  overlayGallery.classList.add('invisible');
  controlLeft.removeEventListener('click', _onPrevClickHandler);
  controlRight.removeEventListener('click', _onNextClickHandler);
  closeButton.removeEventListener('click', _onCloseClickHandler);
  document.removeEventListener('keydown', _onDocumentKeydownHandler);
};

var _onPictureClickHandler = function(currentPicture) {
  showGallery(currentPicture);
};

var _onPrevClickHandler = function() {
  showGallery(activePicture - 1);
};

var _onNextClickHandler = function() {
  showGallery(activePicture + 1);
};

var _onCloseClickHandler = function() {
  hideGallery();
};

var _onDocumentKeydownHandler = function() {
  if (utils.isDeactivationEvent(event)) {
    event.preventDefault();
    hideGallery();
  }
};

for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', (function(memorizedI) {
    return function() {
      _onPictureClickHandler(memorizedI);
    };
  })(i));
}

module.exports = {
  getPictures: getPictures,
  showGallery: showGallery
};


