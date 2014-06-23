# jQuery.transitionEndPromise

Convenience API for simple interfacing with CSS Transitions and CSS Animations.


## Usage

This wrapper provides the same API for transitions and animations

### Promise TransitionEnd Event

```js
var $element = $('#selector');
// acquire a promise
var promise = $element.transitionEndPromise({
  // [optional] timeout in milliseconds the promise
  // is resolved regardless of transitionend event
  resolveTimeout: 1000,
  // [optional] timeout in milliseconds the promise
  // is rejected in case of no transitionend event
  rejectTimeout: 1000,
  // [optional] filter the transitionend events for 
  // the event that was triggered for the specified 
  // CSS property name
  name: 'width',
  // [optional] filter callback to apply to 
  // transitionend events, return true to resolve 
  // the promise return false to ignore the event
  filter: function(event) {
    return true;
  }
});

// use the promise any way you like
promise.then(function(event) {
  console.log("The transition ended", event);
});

// add a class (or set a style or something) that triggers a transition
$element.addClass('something');
```

### Promise AnimationEnd Event

```js
var $element = $('#selector');
// acquire a promise
var promise = $element.animationEndPromise({
  // [optional] timeout in milliseconds the promise
  // is resolved regardless of animationend event
  resolveTimeout: 1000,
  // [optional] timeout in milliseconds the promise
  // is rejected in case of no animationend event
  rejectTimeout: 1000,
  // [optional] filter the animationend events for 
  // the event that was triggered for the specified 
  // CSS Animation name
  name: 'width',
  // [optional] filter callback to apply to 
  // animationend events, return true to resolve 
  // the promise return false to ignore the event
  filter: function(event) {
    return true;
  }
});

// use the promise any way you like
promise.then(function(event) {
  console.log("The animation ended", event);
});

// add a class (or set a style or something) that triggers an animation
$element.addClass('something');
```


## Install

```bash
# with bower
bower install jQuery-transitionEndPromise

# with npm #
npm install jquery-transitionendpromise
```


## License

jQuery-transitionEndEvent is published under the [MIT License](http://opensource.org/licenses/mit-license).


## Changelog ##

### 0.1.0 (June 23rd 2014) ###

* Initial Version