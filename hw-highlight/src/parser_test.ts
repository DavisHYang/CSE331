import * as assert from 'assert';
import { explode } from './char_list';
import { cons, explode_array, nil } from './list';
import { parseNextHighlight, parseLines, parseHighlights, parseText } from './parser';


describe('parser', function() {

  it('parseLines', function() {
    assert.deepEqual(parseLines(""), explode_array([]));
    assert.deepEqual(
      parseLines("Red hi there"),
      explode_array([
        {color: 'red', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text\nBlue really? more?"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
        {color: 'blue', text: 'really? more?'},
      ]));
  });

  it('parseNextHighlight', function() {
    // first branch
    assert.strictEqual(parseNextHighlight(explode("")), undefined);

    // second branch
    assert.strictEqual(parseNextHighlight(explode("ab")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc")), undefined);

    // third branch
    assert.strictEqual(parseNextHighlight(explode("ab[red")), undefined);
    assert.strictEqual(parseNextHighlight(explode("[red")), undefined);

    // fourth branch
    assert.strictEqual(parseNextHighlight(explode("abc[red|")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc[red|def")), undefined);

    // fifth branch
    assert.deepStrictEqual(parseNextHighlight(explode("my [red|ball] is great")),
        ["my ", {color: "red", text: "ball"}, explode(" is great")]);
    assert.deepStrictEqual(parseNextHighlight(explode("grass is [green|itchy]")),
        ["grass is ", {color: "green", text: "itchy"}, explode("")]);
  });

  it('parseHighlights', function() {
    // (nil branch) and (non-nil branch) describe which base case is reached

    // 0-1-many heuristic base case (nil branch) (only one possible)
    assert.deepStrictEqual(parseHighlights(nil), nil);
    
    // 0-1-many heuristic base case (non-nil branch)
    assert.deepStrictEqual(parseHighlights(explode("abcd")), cons({color: 'white', text: "abcd"}, nil));

    // 0-1-many heuristic base case (non-nil branch)
    assert.deepStrictEqual(parseHighlights(explode("hello world xD")), cons({color: 'white', text: "hello world xD"}, nil));

    // (before) specifies the recursive call where there is text before the highlighted text
    // (no text before) specifies the recursive call where there is no text before the highlighted text
    
    // 0-1-many heuristic 1 recursive call (nil branch, before)
    assert.deepStrictEqual(parseHighlights(explode("[yellow|one recursive call]")), cons({color: 'yellow', text: "one recursive call"}, nil));

    // 0-1-many heuristic 1 recursive call (nil branch, before)
    assert.deepStrictEqual(parseHighlights(explode("faker [red|hide on bush]")), cons({color: 'white', text: "faker " }, cons({color: 'red', text: "hide on bush"}, nil)));
    
    // 0-1-many heuristic 1 recursive call (nil branch, no text before)
    assert.deepStrictEqual(parseHighlights(explode("[aliceblue|aliceblue]")), cons({color: 'aliceblue', text: "aliceblue"}, nil));

    // 0-1-many heuristic 1 recursive call (nil branch, no text before)
    assert.deepStrictEqual(parseHighlights(explode("[tan|tan]")), cons({color: 'tan', text: "tan"}, nil));

    // 0-1-many heuristic 1 recursive call (non-nil branch, before)
    assert.deepStrictEqual(parseHighlights(explode("green[green|green]green")), cons({color: 'white', text: 'green'}, cons({color: 'green', text: "green"}, cons({color: 'white', text: 'green'}, nil))));
    
    // 0-1-many heuristic 1 recursive call (non-nil branch, before)
    assert.deepStrictEqual(parseHighlights(explode("b[lime|lime]a")), cons({color: 'white', text: 'b'}, cons({color: 'lime', text: "lime"}, cons({color: 'white', text: 'a'}, nil))));
    
    // 0-1-many heuristic 1 recursive call (non-nil branch, no text before)
    assert.deepStrictEqual(parseHighlights(explode("[magenta|magenta]aft")), cons({color: 'magenta', text: "magenta"}, cons({color: 'white', text: 'aft'}, nil)));
    
    // 0-1-many heuristic 1 recursive call (non-nil branch, no text before)
    assert.deepStrictEqual(parseHighlights(explode("[magenta|magenta]aft")), cons({color: 'magenta', text: "magenta"}, cons({color: 'white', text: 'aft'}, nil)));
    
    // Definitions of (before) and (no text before) carry over from before

    // 0-1-many heuristic 2+ recursive calls (before-before)
    assert.deepStrictEqual(parseHighlights(explode("c[linen|l]b[yellow|a]d")), cons({color: 'white', text: 'c'}, cons({color: 'linen', text: 'l'},
                                                                              cons({color: 'white', text: 'b'}, cons({color: 'yellow', text: 'a'}, 
                                                                              cons({color: 'white', text: 'd'}, nil
                                                                              ))))));
    
    // 0-1-many heuristic 2+ recursive calls (before-before)
    assert.deepStrictEqual(parseHighlights(explode("z[brown|z]t[snow|t]")), cons({color: 'white', text: 'z'}, cons({color: 'brown', text: 'z'},
                                                                              cons({color: 'white', text: 't'}, cons({color: 'snow', text: 't'}, nil)))));
    
    // 0-1-many heuristic 2+ recursive calls (no text before-before)
    assert.deepStrictEqual(parseHighlights(explode("[plum|a]b[red|cd]")), cons({color: 'plum', text: 'a'},
                                                                          cons({color: 'white', text: 'b'}, cons({color: 'red', text: 'cd'}, nil))));
    
    // 0-1-many heuristic 2+ recursive calls (no text before-before)
    assert.deepStrictEqual(parseHighlights(explode("[red|aa]bc[blue|cd]ee")), cons({color: 'red', text: 'aa'},
                                                                          cons({color: 'white', text: 'bc'}, cons({color: 'blue', text: 'cd'}, 
                                                                          cons({color: 'white', text: 'ee'}, nil)
                                                                          ))));
    
    // 0-1-many heuristic 2+ recursive calls (before-no text before)
    assert.deepStrictEqual(parseHighlights(explode("x[pink|w][peru|y]")), cons({color: 'white', text: 'x'},
                                                                          cons({color: 'pink', text: 'w'}, 
                                                                          cons({color: 'peru', text: 'y'}, nil
                                                                          ))));
   
    // 0-1-many heuristic 2+ recursive calls (before-no text before)
    assert.deepStrictEqual(parseHighlights(explode("f[yellow|a][yellow|z]e")), cons({color: 'white', text: 'f'},
                                                                          cons({color: 'yellow', text: 'a'}, 
                                                                          cons({color: 'yellow', text: 'z'}, 
                                                                          cons({color: 'white', text: 'e'},nil
                                                                          )))));
    
    // 0-1-many heuristic 2+ recursive calls (no text before-no text before)
    assert.deepStrictEqual(parseHighlights(explode("[yellow|egg][red|bacon]")), cons({color: 'yellow', text: 'egg'},
                                                                          cons({color: 'red', text: 'bacon'},nil
                                                                          )));
    
    // 0-1-many heuristic 2+ recursive calls (no text before-no text before)
    assert.deepStrictEqual(parseHighlights(explode("[red|T1][red|Faker]GOAT")), cons({color: 'red', text: 'T1'},
                                                                          cons({color: 'red', text: 'Faker'},
                                                                          cons({color: 'white', text: 'GOAT'}, nil
                                                                          ))));
    
  });
  
 it('parseText', function() {
   assert.deepEqual(parseText(""), explode_array([]));
   assert.deepEqual(
     parseText("my [red|favorite] book"),
     explode_array([
       {color: 'white', text: 'my '},
       {color: 'red', text: 'favorite'},
       {color: 'white', text: ' book'},
     ]));
 });

});
