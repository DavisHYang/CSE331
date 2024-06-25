import * as assert from 'assert';
import { NW, NE, SE, SW, GREEN, RED, ROUND, STRAIGHT, Square, rcons, Row, qcons, rnil, qnil} from './quilt';
import { PatternA, PatternB, PatternC, PatternD , PatternE} from './patterns';


describe('patterns', function() {

  // Feel free to use these in your tests (though it's not required)
  // and create any other consts you find useful:
  //
  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  it('PatternA', function() {
    // TODO: Uncomment these example tests and add more tests in problem 1g

    // assert.throw() checks that an error occurs when the first argument 
    //     (a function) is called.

    // Error conditional branch (boundary)
    assert.throws(() => PatternA(-1n, GREEN), Error);

    // Error conditional branch
    assert.throws(() => PatternA(-57n, RED), Error);

    // 0-1-many heuristic base case (only one possible)
    assert.deepStrictEqual(PatternA(0n), qnil);

    const gr_rnd_row: Row = rcons(ne_rnd_grn, rcons(ne_rnd_grn, rnil));
    const rd_rnd_row: Row = rcons(ne_rnd_red, rcons(ne_rnd_red, rnil));
    // 0-1-many heuristic 1 recursive call (only one possible)
    assert.deepStrictEqual(PatternA(1n, GREEN), 
        qcons(gr_rnd_row, qnil));
  
    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternA(2n, RED),
        qcons(rd_rnd_row, qcons(rd_rnd_row, qnil)));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternA(4n),
        qcons(gr_rnd_row, qcons(gr_rnd_row, qcons(gr_rnd_row, qcons(gr_rnd_row, qnil)))));

    //*** escape hatch (vary colors & shapes within tests)
  });

  it('PatternB', function() {
    // TODO: Add tests in problem 1g

    // Error condtiional branch (boundary)
    assert.throws(() => PatternB(-1n, GREEN), Error);

    // Error conditional branch
    assert.throws(() => PatternB(-1092n, RED), Error);

    // 0-1-many heuristic base case (only one possible)
    assert.deepStrictEqual(PatternB(0n), qnil);

    const gr_strt_row: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const rd_strt_row: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));

    // 0-1-many heuristic 1 recursive call (only one possible);
    assert.deepStrictEqual(PatternB(1n, GREEN), 
        qcons(gr_strt_row, qnil));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternB(2n, RED), 
        qcons(rd_strt_row, qcons(rd_strt_row, qnil)));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternB(5n),
        qcons(gr_strt_row, qcons(gr_strt_row, qcons(gr_strt_row, qcons(gr_strt_row, qcons(gr_strt_row, qnil))))));


    //*** escape hatch (vary colors & shapes within tests)
  });

  it('PatternC', function() {
    // TODO: Add tests in problem 1g

    // Error conditional branch (< 0)
    assert.throws(() => PatternC(-2n, GREEN), Error);

    // Error conditional branch (< 0)
    assert.throws(() => PatternC(-236n, RED), Error);

    // Error conditional branch (odd & boundary)
    assert.throws(() => PatternC(1n), Error);

    // Error conditional branch (odd)
    assert.throws(() => PatternC(97321n, GREEN), Error);

    // 0-1-many heuristic base case (only one possible)
    assert.deepStrictEqual(PatternC(0n, RED), qnil);

    const gr_rnd_row: Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
    const gr_rnd_row_bot: Row = rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil));

    const rd_rnd_row: Row = rcons(se_rnd_red, rcons(sw_rnd_red, rnil));
    const rd_rnd_row_bot: Row = rcons(ne_rnd_red, rcons(nw_rnd_red, rnil));
    // 0-1-many heuristic 1 recursive call (only one possible)
    assert.deepStrictEqual(PatternC(2n), 
        qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qnil)));
    
    // 0-1-many heuristic 2+ recurisve calls
    assert.deepStrictEqual(PatternC(4n, GREEN),
        qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qnil)))));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternC(6n, RED),  
        qcons(rd_rnd_row, qcons(rd_rnd_row_bot, qcons(rd_rnd_row, qcons(rd_rnd_row_bot,  qcons(rd_rnd_row, qcons(rd_rnd_row_bot, qnil)))))));
  
  });

  it('PatternD', function() {
    // TODO: Add tests in problem 1g

    // Error conditional branch (< 0)
    assert.throws(() => PatternD(-2n), Error);

    // Error conditional branch (< 0)
    assert.throws(() => PatternD(-678n, GREEN), Error);

    // Error conditional branch (odd & boundary)
    assert.throws(() => PatternD(1n, RED), Error);

    // Error conditional branch (odd)
    assert.throws(() => PatternD(97121n), Error);

    // 0-1-many heuristic base case (only one possible)
    assert.deepStrictEqual(PatternD(0n, GREEN), qnil);

    const gr_rnd_row: Row = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
    const gr_rnd_row_bot: Row = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));

    const rd_rnd_row: Row = rcons(nw_rnd_red, rcons(ne_rnd_red, rnil));
    const rd_rnd_row_bot: Row = rcons(sw_rnd_red, rcons(se_rnd_red, rnil));

    // 0-1-many heuristic 1 recursive call (only one possible)
    assert.deepStrictEqual(PatternD(2n, RED),
        qcons(rd_rnd_row, qcons(rd_rnd_row_bot, qnil)));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternD(4n),
        qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qnil)))));

    // 0-1-many heuristic 2+ recursive calls
    assert.deepStrictEqual(PatternD(6n, GREEN),
        qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qcons(gr_rnd_row, qcons(gr_rnd_row_bot,  qcons(gr_rnd_row, qcons(gr_rnd_row_bot, qnil)))))));
  
  });

  it('PatternE', function() {
    // TODO: Add tests in problem 1g

    // Error conditional branch (boundary)
    assert.throws(() => PatternE(-1n, RED), Error);

    // Error conditional branch
    assert.throws(() => PatternE(-8673n), Error);

    // 0-1-many heuristic base case
    assert.deepStrictEqual(PatternE(0n, GREEN), qnil);

    const gr_strt_row: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const gr_strt_row_bot: Row = rcons(se_strt_grn, rcons(nw_strt_grn, rnil));
    
    const rd_strt_row: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));
    const rd_strt_row_bot: Row = rcons(se_strt_red, rcons(nw_strt_red, rnil));
    // 0-1-many heuristic base case
    assert.deepStrictEqual(PatternE(1n, RED),
        qcons(rd_strt_row, qnil));

    // 0-1-many heuristic 1 recursive case
    assert.deepStrictEqual(PatternE(2n),
        qcons(gr_strt_row, qcons(gr_strt_row_bot, qnil)));

    // 0-1-many heuristic 1 recursive case
    assert.deepStrictEqual(PatternE(3n, GREEN),
        qcons(gr_strt_row, qcons(gr_strt_row_bot,  qcons(gr_strt_row, qnil))));

    // 0-1-many heuristic 2+ recursive cases (even base case)
    assert.deepStrictEqual(PatternE(4n, RED),
        qcons(rd_strt_row, qcons(rd_strt_row_bot, qcons(rd_strt_row, qcons(rd_strt_row_bot, qnil)))));

    // 0-1-many heuristic 2+ recursive cases (even base case)
    assert.deepStrictEqual(PatternE(6n),
        qcons(gr_strt_row, qcons(gr_strt_row_bot, qcons(gr_strt_row, qcons(gr_strt_row_bot, qcons(gr_strt_row, qcons(gr_strt_row_bot, qnil)))))));
    
    // 0-1-many heuristic 2+ recursive cases (odd base case)
    assert.deepStrictEqual(PatternE(5n, GREEN),
        qcons(gr_strt_row, qcons(gr_strt_row_bot,  qcons(gr_strt_row, qcons(gr_strt_row_bot, qcons(gr_strt_row, qnil))))));
      
    // 0-1-many heuristic 2+ recursive cases (odd base case)
    assert.deepStrictEqual(PatternE(7n, RED),
        qcons(rd_strt_row, qcons(rd_strt_row_bot, qcons(rd_strt_row, qcons(rd_strt_row_bot, qcons(rd_strt_row, qcons(rd_strt_row_bot, qcons(rd_strt_row, qnil))))))));
  
  });
});
