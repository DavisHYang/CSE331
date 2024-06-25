import * as assert from 'assert';
import { buildBst, search, makeColorTree } from './color_tree';
import { cons, explode_array, nil } from './list';
import { empty, node } from './color_node';
import { ColorList } from './color_list';

describe('color_tree', function() {

    // TODO: Uncomment given examples and add more test cases in 3

    it('buildBst', function() {
        // 0-1-many heuristic base case (only one possible)
        assert.deepStrictEqual(buildBst(nil), empty);

        // 0-1-many heuristic 1 recursive call
        assert.deepStrictEqual(buildBst(explode_array(
            [['blue', '#0000FF', true]])),
            node(['blue', '#0000FF', true], empty, empty));

        // 0-1-many heuristic 1 recursive call
        assert.deepStrictEqual(buildBst(explode_array(
            [['aliceblue', '#F0F8FF', false],['antiquewhite', '#FAEBD7', false]])),
            node(['antiquewhite', '#FAEBD7', false], node(['aliceblue', '#F0F8FF', false], empty, empty), empty));

        // 0-1-many heuristic 2+ recursive calls
        assert.deepStrictEqual(buildBst(explode_array(
            [['azure', '#F0FFFF', false],['cyan', '#00FFFF', false],['violet', '#EE82EE', true]])),
            node(['cyan', '#00FFFF', false], node(['azure', '#F0FFFF', false], empty, empty), node(['violet', '#EE82EE', true], empty, empty)));

        // 0-1-many heuristic 2+ recursive calls
        assert.deepStrictEqual(buildBst(explode_array(
            [   ['teal', '#008080', true],
                ['thistle', '#D8BFD8', false],
                ['tomato', '#FF6347', true],
                ['turquoise', '#40E0D0', false],
                ['violet', '#EE82EE', true],
                ['wheat', '#F5DEB3', false]])),

                node(['turquoise', '#40E0D0', false],
                node(['thistle', '#D8BFD8', false], node(['teal', '#008080', true], empty, empty), node(['tomato', '#FF6347', true], empty, empty)),
                node(['wheat', '#F5DEB3', false], node(['violet', '#EE82EE', true], empty, empty), empty)
            )
        );
    });

    it('search', function() {
        // 0-1-many heuristic base case (undefined)
        assert.deepStrictEqual(search('yellow', empty), undefined);

        // 0-1-many heuristic base case (undefined)
        assert.deepStrictEqual(search('tan', empty), undefined);

        // 0-1-many heuristic base case (color in tree)
        assert.deepStrictEqual(search('Yellow', node(['Yellow', '#FFFF00', false], empty, empty)), ['Yellow', '#FFFF00', false]);

        // 0-1-many heuristic base case (color in tree)
        assert.deepStrictEqual(search('limegreen', buildBst(explode_array([
            ['lightsteelblue', '#B0C4DE', false],
            ['lightyellow', '#FFFFE0', false],
            ['lime', '#00FF00', false],
            ['limegreen', '#32CD32', false],
            ['linen', '#FAF0E6', false],
            ['magenta', '#FF00FF', true],
            ['maroon', '#800000', true]]))), ['limegreen', '#32CD32', false]);

        // 0-1-many heuristic 1 recursive call (undefined)
        assert.deepStrictEqual(search('white', node(['ghostwhite', '#F8F8FF', false], empty, empty)), undefined);

        // 0-1-many heuristic 1 recursive call (undefined)
        assert.deepStrictEqual(search('white', buildBst(explode_array([
            ['lightyellow', '#FFFFE0', false],
            ['lime', '#00FF00', false]]))), undefined);

        // 0-1-many heuristic 1 recursive call (color in tree)
        assert.deepStrictEqual(search('linen', buildBst(explode_array([
            ['linen', '#FAF0E6', false],
            ['magenta', '#FF00FF', true],
            ['maroon', '#800000', true]]))), ['linen', '#FAF0E6', false]);

        // 0-1-many heuristic 1 recursive call (color in tree)
        assert.deepStrictEqual(search('plum', buildBst(explode_array([
            ['papayawhip', '#FFEFD5', false],
            ['peachpuff', '#FFDAB9', false],
            ['peru', '#CD853F', true],
            ['pink', '#FFC0CB', false],
            ['plum', '#DDA0DD', false],
        ]))), ['plum', '#DDA0DD', false]);
        
        // 0-1-many heursitic 2+ recursive calls (undefined)
        assert.deepStrictEqual(search('blue', buildBst(explode_array([
            ['papayawhip', '#FFEFD5', false],
            ['peachpuff', '#FFDAB9', false],
            ['peru', '#CD853F', true],
            ['pink', '#FFC0CB', false],
            ['plum', '#DDA0DD', false]]))), undefined);
        });

        // 0-1-many heuristic 2+ recursive calls (undefined)
        assert.deepStrictEqual(search('notacolor', buildBst(explode_array([
            ['grey', '#808080', true],
            ['honeydew', '#F0FFF0', false],
            ['hotpink', '#FF69B4', true],
            ['indigo', '#4B0082', true],
            ['ivory', '#FFFFF0', false],
            ['khaki', '#F0E68C', false],
            ['lavender', '#E6E6FA', false],
            ['lavenderblush', '#FFF0F5', false],
            ['lawngreen', '#7CFC00', false],
            ['lemonchiffon', '#FFFACD', false],
            ['lightblue', '#ADD8E6', false],
            ['lightcoral', '#F08080', true],
            ['lightcyan', '#E0FFFF', false]]))), undefined);

        // 0-1-many heuristic 2+ recursive calls (color in tree)
        assert.deepStrictEqual(search('orangered',buildBst(explode_array([
            ['navajowhite', '#FFDEAD', false],
            ['navy', '#000080', true],
            ['oldlace', '#FDF5E6', false],
            ['olive', '#808000', true],
            ['olivedrab', '#6B8E23', true],
            ['orange', '#FFA500', false],
            ['orangered', '#FF4500', true]]))),['orangered', '#FF4500', true]);

        // 0-1-many heuristic 2+ recursive calls (color in tree)
        assert.deepStrictEqual(search('mediumvioletred',buildBst(explode_array([
            ['mediumvioletred', '#C71585', true],
            ['midnightblue', '#191970', true],
            ['mintcream', '#F5FFFA', false],
            ['mistyrose', '#FFE4E1', false],
            ['moccasin', '#FFE4B5', false],
            ['powderblue', '#B0E0E6', false],
            ['purple', '#800080', true],
            ['red', '#FF0000', true],
            ['teal', '#008080', true],
            ['thistle', '#D8BFD8', false],
            ['tomato', '#FF6347', true]]))), ['mediumvioletred', '#C71585', true]);

    // TODO: copy some tests over here in 3g

  const test_color_tree: ColorList = makeColorTree();
  
  it('findNameSet', function() {
    assert.deepEqual(test_color_tree.findNameSet("doesnotexist"), nil);
    assert.deepEqual(test_color_tree.findNameSet("notacolor"), nil);
    assert.deepEqual(test_color_tree.findNameSet("indigo"), cons("indigo", nil));
    assert.deepEqual(test_color_tree.findNameSet("azure"), cons("azure", nil));
    assert.deepEqual(test_color_tree.findNameSet("lavender"),
        cons("lavender", cons("lavenderblush", nil)));
    assert.deepEqual(test_color_tree.findNameSet("pink"),
        cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
  });

  it('getColorCss', function() {
    assert.deepEqual(test_color_tree.getColorCss("lavender"), ['#E6E6FA', '#101010']);
    assert.deepEqual(test_color_tree.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
  });
});