'use strict';

var extend = require('../'),
    test = require('tape');


test('Empty arguments', function(assert) {
    assert.deepEqual(extend(), {}, 'returns an empty object');
    assert.end();
});

test('Single argument', function(assert) {
    var target = {a: 1, b: 2};
    assert.equal(extend(target), target, 'returns target');
    assert.end();
});

test('Overwriting target', function(assert) {
    var target = {a: 1};
    var source = {a: 2, b: 2};

    var result = extend(target, source);
    assert.equal(result, target, 'returns target');
    assert.deepEqual(target, source, 'all fields are overwritten');
    assert.end();
});

test('Merging fields', function(assert) {
    var target = {a: 1, b: 1};
    var source = {b: 2};

    var result = extend(target, source);
    assert.deepEqual(target, {a: 1, b: 2}, 'fields are merged');
    assert.end();
});

test('Modifying only target', function(assert) {
    var target = {a: 1, b: 1, c: 1};
    var source2 = {b: 2, c: 2};
    var source3 = {c: 3};

    var result = extend(target, source2, source3);
    assert.deepEqual(target, {a: 1, b: 2, c: 3}, 'target is extended');
    assert.deepEqual(source2, {b: 2, c: 2}, 'source2 is preserved');
    assert.deepEqual(source3, {c: 3}, 'source3 is preserved');
    assert.end();
});

test('Falsy source properties', function(assert) {
    var target = {};
    var source = {a: null, b: false, c: 0, d: undefined};

    assert.deepEqual(extend(target, source), source,
                     'falsy properties are properly copied');
    assert.end();
});

test('Target is not an object', function(assert) {
    var targets = [null, false, 0, undefined, (0/0)];
    var source = {a: 1};

    for (var i = 0; i < targets.length; i++) {
        assert.deepEqual(extend(targets[i]), {},
            'returns an empty object with no sources');
    }
    assert.end();
});

test('Source is not an object', function(assert) {
    var sources = [null, false, 0, undefined, (0/0)];
    var target = {a: 1};

    for (var i = 0; i < sources.length; i++) {
        assert.deepEqual(extend(target, sources[i]), {a: 1},
            'ignores a non-object source');
    }

    extend.apply(null, [target].concat(sources));
    assert.deepEqual(target, {a: 1}, 'ignores multiple non-object sources');

    extend.apply(null, [target].concat(sources).concat([{b: 2}]));
    assert.deepEqual(target, {a: 1, b: 2}, 'handles only object sources');

    assert.end();
});
