import * as assert from 'assert';
import { nil, cons } from './list';
import { ColorList, makeSimpleColorList } from './color_list';


describe('color_list', function() {

  // TODO: create an instance of ColorList with makeSimpleColorList to use below for 1e
  const test_color_list: ColorList = makeSimpleColorList();

  it('findNameSet', function() {
    assert.deepEqual(test_color_list.findNameSet("doesnotexist"), nil);
    assert.deepEqual(test_color_list.findNameSet("notacolor"), nil);
    assert.deepEqual(test_color_list.findNameSet("indigo"), cons("indigo", nil));
    assert.deepEqual(test_color_list.findNameSet("azure"), cons("azure", nil));
    assert.deepEqual(test_color_list.findNameSet("lavender"),
        cons("lavender", cons("lavenderblush", nil)));
    assert.deepEqual(test_color_list.findNameSet("pink"),
        cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
  });

  it('getColorCss', function() {
    assert.deepEqual(test_color_list.getColorCss("lavender"), ['#E6E6FA', '#101010']);
    assert.deepEqual(test_color_list.getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
  });
});