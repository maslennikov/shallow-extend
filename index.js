'use strict';

module.exports = extend;


/**
 * Copies properties of all sources to the destination object overriding its own
 * existing properties. When extending from multiple sources, fields of every
 * next source will override same named fields of previous sources.
 *
 * @returns destination object
 */
function extend(destination /*...sources*/) {
    destination = destination || {};

    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] || {};

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                destination[key] = source[key];
            }
        }
    }
    return destination;
}
