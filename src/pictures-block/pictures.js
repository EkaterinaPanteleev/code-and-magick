/**
 * @fileoverview Pictures block Module
 * on picture click listener which changes location.hash
 * hashchange listener opens gallery
 */

'use strict';
var gallery = require('./gallery');

var imgs = document.querySelectorAll('.photogallery-image > img');

for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', (function() {
    var hashSrc = imgs[i].getAttribute('src');
    return function(event) {
      event.preventDefault();
      location.hash = '#photo/' + hashSrc;
    };
  })(i));
}

var onHashChange = function() {
  var hashData = location.hash.match(/#photo\/(\S+)/);
  if (hashData) {
    gallery.showGallery(hashData[1]);
  }
};
onHashChange();

window.addEventListener('hashchange', onHashChange);
