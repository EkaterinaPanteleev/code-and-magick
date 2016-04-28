'use strict';
var utils = require('./utils');
var overlayGallery = document.querySelector('.overlay-gallery');
var closeButton = document.querySelector('.overlay-gallery-close');
var controlLeft = document.querySelector('.overlay-gallery-control-left');
var controlRight = document.querySelector('.overlay-gallery-control-right');
var pictureContainer = document.querySelector('.overlay-gallery-preview');
var imgs = document.querySelectorAll('.photogallery-image > img');

var srcValues = [];
var activePicture;
var picturesToShow;

var getSrcValues = function() {
  for (var i = 0; i < imgs.length; i++) {
    var src = imgs[i].getAttribute('src');
    srcValues.push(src);
  }
};

var getPictures = function(pictures) {
  picturesToShow = pictures;
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
  showPicture(picturesToShow[pictureNumber]);
};

var showPicture = function(pic) {
  pictureContainer.innerHTML = '';
  var pictureElement = new Image();
  pictureContainer.appendChild(pictureElement);
  pictureElement.src = pic;
};

var hideGallery = function() {
  overlayGallery.classList.add('invisible');
};

var _onPictureClickHandler = function() {
  var currentPicture;
  for (var i = 0; i < picturesToShow.length; i++) {
    if (picturesToShow[i] === 'img/screenshots/2.png') {
      currentPicture = i;
      console.log(currentPicture);
    }
  }
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

getSrcValues();
getPictures(srcValues);

for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', _onPictureClickHandler);
}
controlLeft.addEventListener('click', _onPrevClickHandler);
controlRight.addEventListener('click', _onNextClickHandler);
closeButton.addEventListener('click', _onCloseClickHandler);
document.addEventListener('keydown', _onDocumentKeydownHandler);
