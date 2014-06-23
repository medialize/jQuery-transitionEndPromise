/*! 
 * jQuery-transitionEndEvent v0.1.0
 * @web: https://github.com/medialize/jQuery-transitionEndEvent/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals (root is window)
    factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';

  var eventNames = {
    // $.transitionEndPromise
    // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend
    transition: 'webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionend',
    // $.animationEndPromise
    // https://developer.mozilla.org/en-US/docs/Web/Events/animationend
    animation: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
  };

  var eventPropertyNames = {
    transition: 'propertyName',
    animation: 'animationName'
  };

  $.each(eventNames, function(key, eventNames) {
    var _key = key + 'EndPromise';
    var _nameProperty = eventPropertyNames[key];

    $[_key] = {
      version: '0.1.0',
      // DOM events to listen for
      eventNames: eventNames,
      // milliseconds to wait before automatically resolving the promise
      resolveTimeout: 0,
      // milliseconds to wait before automatically rejecting the promise
      rejectTimeout: 0
    };

    // convert transitionEnd event to a promise
    $.fn[_key] = function(options) {
      options = $.extend({}, $[_key], options || {});
      var deferred = $.Deferred();
      var $item = this.first();
      var resolveTimer, rejectTimer;

      $item.on(options.eventNames, function(event) {
        var _event = event.originalEvent;

        if (options.filter && !options.filter(_event)) {
          return;
        }

        if (options.name && _event[_nameProperty] !== options.name) {
          return;
        }

        deferred.resolve(_event);
      });

      if (options.resolveTimeout) {
        resolveTimer = setTimeout(deferred.resolve, options.resolveTimeout);
      }

      if (options.rejectTimeout) {
        rejectTimer = setTimeout(deferred.reject, options.rejectTimeout);
      }

      return deferred.promise().then(function(event) {
        resolveTimer && clearTimeout(resolveTimer);
        rejectTimer && clearTimeout(rejectTimer);
        $item.off(options.eventNames, deferred.resolve);
        return event;
      });
    };
  });

  return $;
}));