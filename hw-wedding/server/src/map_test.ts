import * as assert from 'assert';
import { makeTSMutableMap } from './map';

describe('map', function() {

    const test_map = makeTSMutableMap();

    it('containsKey', function() {
        // Testing straight-line code
        assert.deepStrictEqual(test_map.containsKey("test_string"), false);

        test_map.setValue("hello", 2);
        test_map.setValue("world", 1);

        // Testing straight-line code
        assert.deepStrictEqual(test_map.containsKey("hello"), true);

        test_map.clear();
    });

    it('getValue', function() {
        // Testing straight-line code
        assert.throws(() => test_map.getValue("FakerIsTheGOAT"), Error);

        test_map.setValue("T1", "win MSI");
        test_map.setValue("Win", "ayo");
        test_map.setValue("MSI", "League of Legends");

        // Testing straight-line code
        assert.deepStrictEqual(test_map.getValue("T1"), "win MSI");

        test_map.clear();
    });

    it('setValue', function() {
        // If-else subdomain !containsKey(key) branch/else branch
        assert.deepStrictEqual(test_map.setValue("FAKERmyGOAT", "GOATGOATGOAT"), false);

        // If-else subdomain !containsKey(key) branch/else branch
        assert.deepStrictEqual(test_map.setValue("THEGOAT!!!!", "f4ker"), false);

        // If-else subdomain containsKey(key) branch
        assert.deepStrictEqual(test_map.setValue("FAKERmyGOAT", 3), true);

        // If-else subdomain containsKey(key) branch
        assert.deepStrictEqual(test_map.setValue("THEGOAT!!!!", 3.14), true);

        test_map.clear();
    });

    it('clear', function() {
        test_map.setValue("하나... 둘... 셋... T1 화이팅!", "one... two... three... T1 fighting!");
        test_map.setValue("G2 FRAUDS", 2);
        test_map.clear();

        // Testing straight-line code
        assert.deepStrictEqual(test_map.containsKey("하나... 둘... 셋... T1 화이팅"), false);

        // Testing straight-line code
        assert.deepStrictEqual(test_map.containsKey("G2 FRAUDS"), false);
        
        test_map.clear();
    });

    it('getKeys', function() {
        test_map.setValue("sadly T1 did not win MSI", "but there is hope for another world championship win");
        // Testing straight-line code
        assert.deepStrictEqual(test_map.getKeys(), new Array<string>("sadly T1 did not win MSI"));

        test_map.setValue("hello", 2);
        test_map.setValue("hey", 2);
        test_map.setValue("FAKER", 2);
        test_map.setValue("FAKERGOAT", 2);

        // Testing straight-line code
        assert.deepStrictEqual(test_map.getKeys(), 
            new Array<string>("sadly T1 did not win MSI", "hello", "hey", "FAKER", "FAKERGOAT"));

        test_map.clear();
    });

});