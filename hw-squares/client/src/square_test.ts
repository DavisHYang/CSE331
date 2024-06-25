import * as assert from 'assert';
import { solid, split, toJson, fromJson, find, replace } from './square';
import { cons, nil } from './list';


describe('square', function() {

  it('toJson', function() {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepStrictEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

  it('find', function() {
    const s = split(solid("red"), solid("orange"), solid("yellow"), solid("green"));

    assert.deepStrictEqual(find(s, nil), s);
    assert.deepStrictEqual(find(s, cons("NW", nil)), solid("red"));
    assert.throws(() => find(s, cons("NW", cons("NE", nil))), Error);

    const s2 = split(s, s, s, s);

    assert.deepStrictEqual(find(s2, cons("NW", cons("SE", nil))), solid("green"));
    assert.deepStrictEqual(find(s2, cons("NW", cons("SW", nil))), solid("yellow"));
  });

  it('replace', function() {
    const s = split(solid("red"), solid("orange"), solid("yellow"), solid("green"));

    //replace nothing
    assert.deepStrictEqual(replace(s, nil, s), s);

    //replace NW with copy of s
    assert.deepStrictEqual(replace(s, cons("NW", nil), s), split(s, solid("orange"), solid("yellow"), solid("green")));

    //replace NW with copy of s twice
    assert.deepStrictEqual(replace(replace(s, cons("NW", nil), s), cons("NE", nil), s), split(s, s, solid("yellow"), solid("green")));

    //replace NW with copy of s twice
    assert.deepStrictEqual(replace(replace(s, cons("NW", nil), s), cons("NW", cons("NE", nil)), s), split(split(solid("red"), s, solid("yellow"), solid("green") ), solid("orange"), solid("yellow"), solid("green")));
  
    assert.throws(() => replace(s, cons("NW", cons("NE", nil)), s), Error);
  });

});
