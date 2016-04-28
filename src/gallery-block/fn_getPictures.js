/**
 * @fileoverview Function saves the array of objects, describing photos
*/

'use strict';

var imgs = document.querySelectorAll('.photogallery-image > img');
var picturesToShow = [];

var getPictures = function() {
  for (var i = 0; i < imgs.length; i++) {
    var src = imgs[i].getAttribute('src');
    picturesToShow.push(src);
  }
  return picturesToShow;
};

getPictures();

module.exports = picturesToShow;

