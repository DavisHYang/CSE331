import * as assert from 'assert';
import { nil } from './list';
import { explode, compact } from './char_list';
import { prefix, suffix } from './list_ops';
import { frog_latin_encode, frog_latin_decode, next_latin_char, prev_latin_char, count_consonants, cipher_encode, cipher_decode, crazy_caps_encode, crazy_caps_decode} from './latin_ops';


describe('latin_ops', function() {

  // For the following 2 functions, there are a finite number of cases
  // but the number exceeds our reasonable case limit of 20, so just some
  // were selected.
  it('next_latin_char', function() {
    assert.equal(next_latin_char("a".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(next_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(next_latin_char("i".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(next_latin_char("o".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(next_latin_char("u".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(next_latin_char("j".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(next_latin_char("g".charCodeAt(0)), "j".charCodeAt(0));
    assert.equal(next_latin_char("d".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(next_latin_char("t".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(next_latin_char("c".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(next_latin_char("k".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(next_latin_char("f".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(next_latin_char("v".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(next_latin_char("w".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(next_latin_char("h".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(next_latin_char("l".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(next_latin_char("r".charCodeAt(0)), "l".charCodeAt(0));
    assert.equal(next_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(next_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(next_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('prev_latin_char', function() {
    assert.equal(prev_latin_char("a".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(prev_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(prev_latin_char("i".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(prev_latin_char("u".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(prev_latin_char("y".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(prev_latin_char("b".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(prev_latin_char("p".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(prev_latin_char("j".charCodeAt(0)), "g".charCodeAt(0));
    assert.equal(prev_latin_char("g".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(prev_latin_char("k".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(prev_latin_char("s".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(prev_latin_char("z".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(prev_latin_char("f".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(prev_latin_char("v".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(prev_latin_char("w".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(prev_latin_char("l".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(prev_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(prev_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(prev_latin_char("q".charCodeAt(0)), "x".charCodeAt(0));
    assert.equal(prev_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('cipher_encode', function() {
    // 0-1-many heuristic base case
    assert.deepStrictEqual(cipher_encode(nil), nil);

    // 0-1-many heuristic 1 recursive call
    assert.deepStrictEqual(cipher_encode(explode("a")), explode("i"));
    
    // 0-1-many heuristic 1 recursive call
    assert.deepStrictEqual(cipher_encode(explode("b")), explode("t"));
    
    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(cipher_encode(explode("hi")), explode("ru"));
    
    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(cipher_encode(explode("hiworld")), explode("ruvalhb"));
  });

  it('cipher_decode', function() {
    // 0-1-many heuristic base case
    assert.deepStrictEqual(cipher_decode(nil), nil);

    // 0-1-many heuristic 1 recursive call
    assert.deepStrictEqual(cipher_decode(explode("q")), explode("x"));
    
    // 0-1-many heuristic 1 recursive call
    assert.deepStrictEqual(cipher_decode(explode("v")), explode("w"));
    
    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(cipher_decode(explode("hi")), explode("la"));
    
    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(cipher_decode(explode("hiworld")), explode("lafuhrj"));
  });

  it('crazy_caps_encode', function() {
    // 0-1-many heuristic base case (first condition)
    assert.deepStrictEqual(crazy_caps_encode(nil), nil);

    // 0-1-many heuristic base case (second condition)
    assert.deepStrictEqual(crazy_caps_encode(explode("a")), explode("a"));

    // 0-1-many heuristic base case (second condition)
    assert.deepStrictEqual(crazy_caps_encode(explode("q")), explode("q"));

    // 0-1-many heuristic 1 recursive case (first base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("pi")), explode("pI"));

    // 0-1-many heuristic 1 recursive case (first base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("ch")), explode("cH"));

    // 0-1-many heuristic 1 recursive case (second base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("abc")), explode("aBc"));

    // 0-1-many heuristic 1 recursive case (second base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("lea")), explode("lEa"));

    // 0-1-many heuristic 2+ recursive cases (first base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("chat")), explode("cHaT"));

    // 0-1-many heuristic 2+ recursive cases (first base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("davisy")), explode("dAvIsY"));

    // 0-1-many heuristic 2+ recursive cases (second base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("hjkvx")), explode("hJkVx"));

    // 0-1-many heuristic 2+ recursive cases (second base case)
    assert.deepStrictEqual(crazy_caps_encode(explode("helloworlds")), explode("hElLoWoRlDs"));
  });

  it('crazy_caps_decode', function() {
    // 0-1-many heuristic base case (first condition)
    assert.deepStrictEqual(crazy_caps_decode(nil), nil);

    // 0-1-many heuristic base case (second condition)
    assert.deepStrictEqual(crazy_caps_decode(explode("z")), explode("z"));

    // 0-1-many heuristic base case (second condition)
    assert.deepStrictEqual(crazy_caps_decode(explode("f")), explode("f"));

    // 0-1-many heuristic 1 recursive call (first base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("oO")), explode("oo"));

    // 0-1-many heuristic 1 recursive call (first base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("mB")), explode("mb"));

    // 0-1-many heuristic 1 recursive call (second base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("kEv")), explode("kev"));

    // 0-1-many heuristic 1 recursive call (second base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("iNz")), explode("inz"));

    // 0-1-many heuristic 2+ recursive calls (first base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("yCxI")), explode("ycxi"));

    // 0-1-many heuristic 2+ recursive calls (first base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("hJkCvWtT")), explode("hjkcvwtt"));

    // 0-1-many heuristic 2+ recursive calls (second base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("jAmEs")), explode("james"));

    // 0-1-many heuristic 2+ recursive calls (second base case)
    assert.deepStrictEqual(crazy_caps_decode(explode("wIlCoXkEvIn")), explode("wilcoxkevin"));
  });

  it('count_consonants', function() {
    // base case: nil
    assert.strictEqual(count_consonants(nil), -1n);
    // base case: 1st char is vowel, no recursive calls
    assert.strictEqual(count_consonants(explode("e")), 0n);
    assert.strictEqual(count_consonants(explode("astray")), 0n);
    // base case: no vowels or cosonants
    assert.strictEqual(count_consonants(explode("")), -1n);
    assert.strictEqual(count_consonants(explode("_")), -1n);

    // 1 recursive call:
    assert.strictEqual(count_consonants(explode("say")), 1n);
    assert.strictEqual(count_consonants(explode("l_")), -1n);

    // multiple recursive calls:
    assert.strictEqual(count_consonants(explode("stingray")), 2n);
    assert.strictEqual(count_consonants(explode("stray")), 3n);
    assert.strictEqual(count_consonants(explode("str")), -1n);
    assert.strictEqual(count_consonants(explode("st_a")), -1n);
  });

  it('prefix', function() {
    // 0-1-many heuristic base case
    assert.deepStrictEqual(prefix(0n, nil), nil);

    // 0-1-many heuristic base case
    assert.deepStrictEqual(prefix(0n, explode("HelloWorld")), nil);

    // 0-1-many heuristic error case
    assert.throws( () => prefix(1n, nil), Error);

    // 0-1-many heuristic error case
    assert.throws( () => prefix(192837n, nil), Error);

    // 0-1-many heuristic 1 recursive call (base case)
    assert.deepStrictEqual(prefix(1n, explode("h")), explode("h"));

    // 0-1-many heuristic 1 recursive call (base case)
    assert.deepStrictEqual(prefix(1n, explode("LeagueofLegends")), explode("L"));

    // 0-1-many heuristic 1 recursive call (error case)
    assert.throws( () => prefix(2n, explode("y")), Error);

    // 0-1-many heuristic 1 recursive call (error case)
    assert.throws( () => prefix(1337n, explode("g")), Error);

    // 0-1-many heuristic 2+ recursive calls (base case)
    assert.deepStrictEqual(prefix(2n, explode("hehe")), explode("he"));

    // 0-1-many heuristic 2+ recursive calls (base case)
    assert.deepStrictEqual(prefix(5n, explode("FakerGOAT")), explode("Faker"));

    // 0-1-many heuristic 2+ recursive calls (error case)
    assert.throws( () => prefix(3n, explode("gg")), Error);

    // 0-1-many heuristic 2+ recursive calls (error case)
    assert.throws( () => prefix(100n, explode("ChovyNotGOAT")), Error);
  });

  it('suffix', function(){
    // 0-1-many heuristic base case
    assert.deepStrictEqual(suffix(0n, nil), nil);

    // 0-1-many heuristic base case
    assert.deepStrictEqual(suffix(0n, explode("xkcdxyz")), explode("xkcdxyz"));

    // 0-1-many heuristic error case
    assert.throws( () => suffix(1n, nil), Error);

    // 0-1-many heuristic error case
    assert.throws( () => suffix(662991n, nil), Error);

    // 0-1-many heuristic 1 recursive call (base case)
    assert.deepStrictEqual(suffix(1n, explode("a")), nil);

    // 0-1-many heuristic 1 recursive call (base case)
    assert.deepStrictEqual(suffix(1n, explode("thequickbrownfoxjumpsoverthelazydog")), explode("hequickbrownfoxjumpsoverthelazydog"));

    // 0-1-many heuristic 1 recursive call (error case)
    assert.throws( () => suffix(2n, explode("i")), Error);

    // 0-1-many heuristic 1 recursive call (error case)
    assert.throws( () => suffix(999n, explode("d")), Error);

    // 0-1-many heuristic 2+ recursive calls (base case)
    assert.deepStrictEqual(suffix(2n, explode("jkpanda")), explode("panda"));

    // 0-1-many heuristic 2+ recursive calls (base case)
    assert.deepStrictEqual(suffix(7n, explode("abcdefgchallenger")), explode("challenger"));

    // 0-1-many heuristic 2+ recursive calls (error case)
    assert.throws( () => suffix(3n, explode("ig")), Error);

    // 0-1-many heuristic 2+ recursive calls (error case)
    assert.throws( () => suffix(11n, explode("dyvarus")), Error);
  });

  // TODO: uncomment the following tests when you are ready to test your
  // Frog Latin functions. You'll need to import these functions.

  // Note: these are just a subset of tests to get you started. We will have
  // additional staff tests, some of which will be hidden. Please add tests/
  // reason through your code carefully to be confident it's correct! Though
  // we will not be grading these things.

  it('frog_latin_encode', function() {
    assert.strictEqual(compact(frog_latin_encode(explode(""))), "");
    assert.strictEqual(compact(frog_latin_encode(explode("cd"))), "cd");
    assert.strictEqual(compact(frog_latin_encode(explode("elf"))), "felfrog");
    assert.strictEqual(compact(frog_latin_encode(explode("kevin"))), "evinkrog");
    assert.strictEqual(compact(frog_latin_encode(explode("ten"))), "entrog");
    // additional (optional) tests

    assert.strictEqual(compact(frog_latin_encode(explode("faker"))), "akerfrog");
    assert.strictEqual(compact(frog_latin_encode(explode("AAAAAANVNBZMVBCNMVC"))), "fAAAAAANVNBZMVBCNMVCrog");
    assert.strictEqual(frog_latin_encode(nil), nil);
    assert.strictEqual(compact(frog_latin_encode(explode("bnmvcxzbmnvxcbznmvbczxnmvcxvcxvcxvcxvc"))), "bnmvcxzbmnvxcbznmvbczxnmvcxvcxvcxvcxvc");
  });

  it('frog_latin_decode', function() {
    assert.strictEqual(frog_latin_decode(nil), nil);
    assert.strictEqual(compact(frog_latin_decode(explode(""))), "");
    assert.strictEqual(compact(frog_latin_decode(explode("james"))), "james");
    assert.strictEqual(compact(frog_latin_decode(explode("forangerog"))), "orange");
    assert.strictEqual(compact(frog_latin_decode(explode("featrog"))), "eat");
    assert.strictEqual(compact(frog_latin_decode(explode("ameshrog"))), "shame");
    assert.strictEqual(compact(frog_latin_decode(explode("entrog"))), "nte");
    assert.strictEqual(compact(frog_latin_decode(explode("dsaewqdsadsadsaewqeqw"))), "dsaewqdsadsadsaewqeqw");
    assert.strictEqual(compact(frog_latin_decode(explode("farog"))), "a");
    assert.strictEqual(compact(frog_latin_decode(explode("acrog"))), "ca");
    assert.strictEqual(compact(frog_latin_decode(explode("crog"))), "crog");
  });

});
