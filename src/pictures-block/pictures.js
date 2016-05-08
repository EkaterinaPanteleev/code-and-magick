/**
 * @fileoverview Pictures block Module
 * on picture click listener which changes location.hash
 * hashchange listener opens gallery
 */

'use strict';
var gallery = require('./gallery');
var imgs = gallery.imgs;

var setHash = function(event) {
  var hashSrc = this.getAttribute('src');
  event.preventDefault();
  location.hash = '#photo/' + hashSrc;
};

for (var i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', setHash);
}

var onHashChange = function() {
  var hashData = location.hash.match(/#photo\/(\S+)/);
  if (hashData) {
    gallery.showGallery(hashData[1]);
  }
};
onHashChange();

window.addEventListener('hashchange', onHashChange);
