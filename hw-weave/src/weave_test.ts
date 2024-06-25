import * as assert from 'assert';
import { List, nil, cons, explode_array } from './list';
import { Color } from './color';
import { warpFacedEvens, warpFacedOdds, weave } from './weave';


describe('weave', function() {

    it('warpFacedOdds - even length', function() {
    assert.deepEqual(warpFacedOdds(nil), nil);
    assert.deepEqual(warpFacedOdds(cons("red", cons("green", nil))),
        cons("red", nil));
    assert.deepEqual(warpFacedOdds(cons("blue", cons("green", nil))),
        cons("blue", nil));
    assert.deepEqual(
        warpFacedOdds(cons("red", cons("green", cons("blue", cons("yellow", nil))))),
        cons("red", cons("blue", nil)));
    assert.deepEqual(
        warpFacedOdds(cons("green", cons("red", cons("yellow", cons("blue", nil))))),
        cons("green", cons("yellow", nil)));
    });

    it('warpFacedEvens - even length', function() {
    assert.deepEqual(warpFacedEvens(nil), nil);
    assert.deepEqual(warpFacedEvens(cons("red", cons("green", nil))),
        cons("green", nil));
    assert.deepEqual(warpFacedEvens(cons("blue", cons("yellow", nil))),
        cons("yellow", nil));
    assert.deepEqual(
        warpFacedEvens(cons("red", cons("green", cons("blue", cons("yellow", nil))))),
        cons("green", cons("yellow", nil)));
    assert.deepEqual(
        warpFacedEvens(cons("green", cons("red", cons("yellow", cons("blue", nil))))),
        cons("red", cons("blue", nil)));
    });

    it('warpFacedOdds - odd length', function() {
    assert.deepEqual(warpFacedOdds(cons("red", nil)),
        cons("red", nil));
    assert.deepEqual(warpFacedOdds(cons("blue", nil)),
        cons("blue", nil));
    assert.deepEqual(
        warpFacedOdds(cons("blue", cons("green", cons("yellow", nil)))),
        cons("blue", cons("yellow", nil)));
    assert.deepEqual(
        warpFacedOdds(cons("red", cons("orange", cons("yellow", nil)))),
        cons("red", cons("yellow", nil)));
    assert.deepEqual(
        warpFacedOdds(cons("red", cons("green", cons("blue", cons("yellow", cons("purple", nil)))))),
        cons("red", cons("blue", cons("purple", nil))));
    assert.deepEqual(
        warpFacedOdds(cons("red", cons("orange", cons("yellow", cons("green", cons("blue", nil)))))),
        cons("red", cons("yellow", cons("blue", nil))));
    });

    it('warpFacedEvens - odd length', function() {
    assert.deepEqual(warpFacedEvens(cons("red", nil)), nil);
    assert.deepEqual(warpFacedEvens(cons("yellow", nil)), nil);
    assert.deepEqual(
        warpFacedEvens(cons("blue", cons("red", cons("yellow", nil)))),
        cons("red", nil));
    assert.deepEqual(
        warpFacedEvens(cons("yellow", cons("blue", cons("yellow", nil)))),
        cons("blue", nil));
    assert.deepEqual(
        warpFacedEvens(cons("red", cons("green", cons("blue", cons("yellow", cons("purple", nil)))))),
        cons("green", cons("yellow", nil)));
    assert.deepEqual(
        warpFacedEvens(cons("red", cons("green", cons("yellow", cons("green", cons("yellow", nil)))))),
        cons("green", cons("green", nil)));
    });
    
    it('weave', function() {
        const colors: List<Color> = cons("red", cons("orange", cons("yellow", nil)));
        const colors2: List<Color> = cons("purple", cons("blue", cons("green", cons("blue", nil))));
        assert.deepEqual(weave(0n, colors), nil);
        assert.deepEqual(weave(1n, colors), explode_array([
            cons("orange", nil),
          ]));
        assert.deepEqual(weave(1n, colors2), explode_array([
            cons("blue", cons("blue", nil)),
          ]));
        assert.deepEqual(weave(2n, colors), explode_array([
            cons("orange", nil),
            cons("red", cons("yellow", nil)),
          ]));
        assert.deepEqual(weave(2n, colors2), explode_array([
            cons("blue", cons("blue", nil)),
            cons("purple", cons("green", nil)),
          ]));
        assert.deepEqual(weave(3n, colors), explode_array([
            cons("orange", nil),
            cons("red", cons("yellow", nil)),
            cons("orange", nil),
          ]));
        assert.deepEqual(weave(3n, colors2), explode_array([
            cons("blue", cons("blue", nil)),
            cons("purple", cons("green", nil)),
            cons("blue", cons("blue", nil)),
          ]));
      });
    
});