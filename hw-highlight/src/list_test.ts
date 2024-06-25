import * as assert from 'assert';
import { nil, cons, len, split, compact_list, explode_array, split_at } from './list';
import { explode } from './char_list';


describe('list', function() {

  it('len', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepEqual(len(nil), 0n);

    // 0-1-many: 1 recursive call
    assert.deepEqual(len(cons(1n, nil)), 1n);
    assert.deepEqual(len(cons(2n, nil)), 1n);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(len(cons(1n, cons(2n, nil))), 2n);
    assert.deepEqual(len(cons(3n, cons(2n, cons(1n, cons(0n, nil))))), 4n);
  });

  it('split', function() {
    // 0-1-many: base case
    assert.deepEqual(split(0n, explode("")), [nil, nil]);
    assert.deepEqual(split(0n, explode("a")), [nil, explode("a")]);

    // 0-1-many: 1 recursive call
    assert.deepEqual(split(1n, explode("a")), [explode("a"), nil]);
    assert.deepEqual(split(1n, explode("as")), [explode("a"), explode("s")]);
    assert.deepEqual(split(1n, explode("stray")), [explode("s"), explode("tray")]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(split(2n, explode("as")), [explode("as"), nil]);
    assert.deepEqual(split(2n, explode("stray")), [explode("st"), explode("ray")]);
    assert.deepEqual(split(3n, explode("stray")), [explode("str"), explode("ay")]);
    assert.deepEqual(split(4n, explode("stray")), [explode("stra"), explode("y")]);
    assert.deepEqual(split(5n, explode("stray")), [explode("stray"), explode("")]);
  });
  
  it('split_at', function() {
    // 0-1-many heuristic base case (target not in list)
    assert.deepStrictEqual(split_at(nil, 0), [nil, nil]);

    // 0-1-many heuristic base case (target not in list)
    assert.deepStrictEqual(split_at(nil, 859043), [nil, nil]);

    // 0-1-many heuristic base case (target in list)
    assert.deepStrictEqual(split_at(explode_array([1]), 1), [nil, cons(1, nil)]);

    // 0-1-many heuristic base case (target in list)
    assert.deepStrictEqual(split_at(explode_array([10,9,8,7,6,5,4,3,2,1]), 10), [nil, explode_array([10,9,8,7,6,5,4,3,2,1])]);
  
    // 0-1-many heuristic 1 recursive call (target not in list)
    assert.deepStrictEqual(split_at(explode_array([5]), 1), [cons(5, nil), nil]);

    // 0-1-many heuristic 1 recursive call (target not in list)
    assert.deepStrictEqual(split_at(explode_array([9839]), 999), [cons(9839, nil), nil]);

    // 0-1-many heuristic 1 recursive call (target in list)
    assert.deepStrictEqual(split_at(explode_array([123, 456]), 456), [cons(123, nil), cons(456, nil)]);

    // 0-1-many heuristic 1 recursive call (target in list)
    assert.deepStrictEqual(split_at(explode_array([7, 6, 9, 1, 2, 2]), 6), [cons(7, nil), explode_array([6,9,1,2,2])]);

    // 0-1-many heuristic 2+ recursive calls (target not in list)
    assert.deepStrictEqual(split_at(explode_array([111, 222]), 333), [explode_array([111, 222]), nil]);
  
    // 0-1-many heuristic 2+ recursive calls (target not in list)
    assert.deepStrictEqual(split_at(explode_array([7, 32, 37, 37, 37, 37, 9]), 10000000), [explode_array([7, 32, 37, 37, 37, 37, 9]), nil]);
  
    // 0-1-many heuristic 2+ recursive calls (target in list)
    assert.deepStrictEqual(split_at(explode_array([55,37, 89]), 89), [explode_array([55, 37]), cons(89, nil)]);

    // 0-1-many heuristic 2+ recursive calls (target in list)
    assert.deepStrictEqual(split_at(explode_array([1, 10, 100, 1000, 10000, 100000]), 100000), [explode_array([1, 10, 100, 1000, 10000]), cons(100000, nil)]);
  
    // 0-1-many heuristic 2+ recursive calls (target in list)
    // test using strings
    assert.deepStrictEqual(split_at(explode("Hello World"), "Hello World".charCodeAt(5)), [explode("Hello"), explode(" World")]);
  });

  it('compact_list', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(compact_list(nil), []);

    // 0-1-many: 1 recursive call
    assert.deepEqual(compact_list(cons(1n, nil)), [1n]);
    assert.deepEqual(compact_list(cons(8n, nil)), [8n]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(compact_list(cons(1n, cons(2n, nil))), [1n, 2n]);
    assert.deepEqual(compact_list(cons(3n, cons(2n, cons(1n, nil)))), [3n, 2n, 1n]);
  });

  it('explode_array', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(explode_array([]), nil);

    // 0-1-many: 1 recursive call
    assert.deepEqual(explode_array([1n]), cons(1n, nil));
    assert.deepEqual(explode_array([8n]), cons(8n, nil));

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(explode_array([1n, 2n]), cons(1n, cons(2n, nil)));
    assert.deepEqual(explode_array([1n, 2n, 3n]), cons(1n, cons(2n, cons(3n, nil))));
  });
});