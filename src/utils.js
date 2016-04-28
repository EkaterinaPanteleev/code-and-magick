/**
 * @fileoverview Auxiliary methods
*/
'use strict';

/** @enum {number} */
var KeyCode = {
  ESC: 27
};


module.exports = {
  isNextPageAvailable: function(reviewsToCheck, page, pageSize) {
    if (reviewsToCheck.length % pageSize === 0) {
      return page < (Math.floor(reviewsToCheck.length / pageSize) - 1);
    } else {
      return page < Math.floor(reviewsToCheck.length / pageSize);
    }
  },

  /**
  * counting ammount of days since last birthday
  */
  cookieToExpire: function() {
    var today = new Date();
    var birthDay = new Date(today.getFullYear(), 10, 28);
    if ((today.getMonth() < 10) || (today.getMonth() === 10 && today.getDate() < 28)) {
      birthDay.setFullYear(birthDay.getFullYear() - 1);
    }
    var expireDate = (today) - (birthDay);
    return expireDate;
  },

  /**
     * @param {Event} evt
     * @return {boolean}
   */
  isDeactivationEvent: function(event) {
    return event.keyCode === KeyCode.ESC;
  }
};
