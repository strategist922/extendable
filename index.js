// 'use strict'; <-- Root of all evil, causes thrown errors on readyOnly props.

/**
 * Simple extend function.
 *
 * @param {Object} obj The object we should extend.
 * @returns {Object} obj
 * @api public
 */
function mixin(obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function each(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });

  return obj;
}

/**
 * Backbone.js helper functions, these have been copy-pasted from the backbone.js
 * source code so they can re-used in our application interface.
 *
 * @license MIT, http://backbonejs.org
 */

//
// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
//
module.exports = function extend(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ parent.apply(this, arguments); };
  }

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  function Surrogate(){ this.constructor = child; }
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) mixin(child.prototype, protoProps);

  // Add static properties to the constructor function, if supplied.
  mixin(child, parent, staticProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};
