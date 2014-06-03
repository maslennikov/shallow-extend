shallow-extend
=========

[![build status](https://secure.travis-ci.org/maslennikov/shallow-extend.png)
](http://travis-ci.org/maslennikov/shallow-extend)


A utility function similar to `extend()` in `underscore` or `lo-dash`.

```javascript
function extend(destination /*...sources*/) {/*...*/}
```

Copies properties of all sources to the destination object overriding its own
existing properties. When extending from multiple sources, fields of every next
source will override same named fields of previous sources. Returns the destination object.

Makes only a shallow copy of the source fields, in contrast to
[node-extend](https://github.com/justmoon/node-extend) or
[node-deep-extend](https://github.com/unclechu/node-deep-extend).

Examples
----------

Merge and modify:
```javascript
var source1 = {a: 1, b: 1, c: 1};
var source2 = {b: 2, c: 2};
var source3 = {c: 3};

var destination = extend(source1, source2, source3);
// destination --> source1
// source1 --> {a: 1, b: 2, c: 3}
// source2 --> {b: 2, c: 2}
// source3 --> {c: 3}
```

Do not modify anything:
```javascript
var source1 = {a: 1, b: 1, c: 1};
var source2 = {b: 2, c: 2};
var source3 = {c: 3};

var destination = extend({}, source1, source2, source3);
// destination --> {a: 1, b: 2, c: 3}
// source1 --> {a: 1, b: 1, c: 1}
// source2 --> {b: 2, c: 2}
// source3 --> {c: 3}
```

Managing defaults:
```javascript
function takesOptions(opts) {
    var params = extend({
        a: 'default value',
        b: 'default value'
    }, opts);

    // proceed with params
}
```
