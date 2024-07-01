import * as assert from 'assert';
import { Guest, guestsOfHost, newGuest, setGuest, guestRange, toJson, fromJson, guestFamily, parseGuests} from './guest';

describe('guest', function() {
    it('toJson', function() {
        const guest1: Guest = newGuest({});
        // Straight-line
        assert.deepStrictEqual(toJson(guest1), {name: "", host: "", family: false, 
            diet: "", plus_one: -1, guestName: "", guestDiet: ""});

        const guest2: Guest = newGuest({name: "Davis", host: "Davis again", family: true});
        // Straight-line
        assert.deepStrictEqual(toJson(guest2), {name: "Davis", host: "Davis again", family: true, 
            diet: "", plus_one: -1, guestName: "", guestDiet: ""});
    });

    it('fromJson', function() {
        const data: bigint = 5n;
        // Error branch
        assert.throws(() => fromJson(data), Error);

        const data2 = {diet: false};
        // Error branch
        assert.throws(() => fromJson(data2), Error);

        const data3 = toJson(newGuest({}));
        // Return Guest branch
        assert.deepStrictEqual(fromJson(data3), {name: "", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""});

        const data4 = toJson(newGuest({name: "FAKER GOAT!", host: "FAKER GOAT!!", 
            family: true, diet: "eats world championships for breakfast"}));
        // Return Guest branch
        assert.deepStrictEqual(fromJson(data4), {name: "FAKER GOAT!", host: "FAKER GOAT!!", family: true, 
        diet: "eats world championships for breakfast", plus_one: -1, guestName: "", guestDiet: ""});
    });

    it('setGuest', function() {
        // *** Escape Hatch *** 
        // - one test per guest attribute
        const guest: Guest = newGuest({});

        // test name
        assert.deepStrictEqual(setGuest(guest, {name: "hello"}), newGuest({name: "hello"}));

        // test host
        assert.deepStrictEqual(setGuest(guest, {host: "Davis"}), newGuest({host: "Davis"}));

        // test family
        assert.deepStrictEqual(setGuest(guest, {family: true}), newGuest({family: true}));

        // test diet
        assert.deepStrictEqual(setGuest(guest, {diet: "food"}), newGuest({diet: "food"}));

        // test plus_one
        assert.deepStrictEqual(setGuest(guest, {plus_one: 1}), newGuest({plus_one: 1}));

        // test guestName
        assert.deepStrictEqual(setGuest(guest, {guestName: "guest name here"}), newGuest({guestName: "guest name here"}));

        // test guestDiet
        assert.deepStrictEqual(setGuest(guest, {guestDiet: "guest food"}), newGuest({guestDiet: "guest food"}));
    });

    it('newGuest', function() {
        // *** Escape Hatch ***
        // - treat each ternary operator as its own subdomain (2 per variable)
        // - one test per subdomain
        // (essentially just make sure each )

        // No input
        assert.deepStrictEqual(newGuest({}), {name: "", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting name
        assert.deepStrictEqual(newGuest({name: "Guma"}), {name: "Guma", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting host
        assert.deepStrictEqual(newGuest({host: "Keria"}), {name: "", host: "Keria", 
        family: false, diet: "", plus_one: -1, guestName: "", guestDiet: ""})
        
        // Test setting family
        assert.deepStrictEqual(newGuest({family: true}), {name: "", host: "", 
        family: true, diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting diet
        assert.deepStrictEqual(newGuest({diet: "LCS"}), 
        {name: "", host: "", family: false, diet: "LCS", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting plus_one
        assert.deepStrictEqual(newGuest({plus_one: 1}), 
        {name: "", host: "", family: false, diet: "", plus_one: 1, guestName: "", guestDiet: ""})

        // Test setting guestName
        assert.deepStrictEqual(newGuest({guestName: "Zeus"}), 
        {name: "", host: "", family: false, diet: "", plus_one: -1, guestName: "Zeus", guestDiet: ""})

        // Test setting guestDiet
        assert.deepStrictEqual(newGuest({guestDiet: "Food probably"}), 
        {name: "", host: "", family: false, diet: "", plus_one: -1, guestName: "", guestDiet: "Food probably"})
    });


    it('guestFamily', function() {
        // 0-1-many heuristic base case
        assert.deepStrictEqual(guestFamily([]), 0);

        // 0-1-many heuristic base case
        assert.deepStrictEqual(guestFamily([newGuest({})]), 0);
        
        // 0-1-many heuristic 1 recursive call first branch
        assert.deepStrictEqual(guestFamily([newGuest({family: true})]), 1);
        
        // 0-1-many heuristic 1 recursive call first branch
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({family: true})]), 1);

        // 0-1-many heuristic 1 recursive call second branch
        assert.deepStrictEqual(guestFamily([newGuest({})]), 0);

        // 0-1-many heuristic 1 recursive call second branch
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({})]), 0);

        // 0-1-many heuristic 2+ recursive calls (first-second)
        assert.deepStrictEqual(guestFamily([newGuest({family: true}), newGuest({})]), 1);

        // 0-1-many heuristic 2+ recursive calls (first-second)
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({family : true}), newGuest({})]), 1);

        // 0-1-many heuristic 2+ recursive calls (first-first)
        assert.deepStrictEqual(guestFamily([newGuest({family : true}), newGuest({family: true})]), 2);

        // 0-1-many heuristic 2+ recursive calls (first-first)
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({family: true}), 
            newGuest({family: true})]), 2);

        // 0-1-many heuristic 2+ recursive calls (second-first)
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({family: true})]), 1);

        // 0-1-many heuristic 2+ recursive calls (second-first)
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({}), newGuest({family: true})]), 1);

        // 0-1-many heuristic 2+ recursive calls (second-second)
        assert.deepStrictEqual(guestFamily([newGuest({}), newGuest({})]), 0);

        // 0-1-many heuristic 2+ recursive calls (second-second)
        assert.deepStrictEqual(guestFamily([newGuest({family: true}), newGuest({}), newGuest({})]), 1);
    });

    it('guestsOfHost', function() {
        // loop: 0-1-many 0 iterations
        assert.deepStrictEqual(guestsOfHost([], "Molly"), []);

        // loop: 0-1-many 0 iterations
        assert.deepStrictEqual(guestsOfHost([], "James"), []);

        // loop: 0-1-many 1 iteration (first branch)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "Molly"})], "Molly"), [newGuest({host: "Molly"})]);

        // loop: 0-1-many 1 iteration (first branch)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"})], "James"), [newGuest({host: "James"})]);

        // loop: 0-1-many 1 iteration (second branch)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"})], "Molly"), []);

        // loop: 0-1-many 1 iteration (second branch)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "Molly"})], "James"), []);

        // loop: 0-1-many 2+ iteration (first-first)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "Molly"}), newGuest({host: "Molly"})], "Molly"), 
            [newGuest({host: "Molly"}), newGuest({host: "Molly"})]);

        // loop: 0-1-many 2+ iteration (first-first)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"}), newGuest({host: "James"})], "James"), 
        [newGuest({host: "James"}), newGuest({host: "James"})]);

        // loop: 0-1-many 2+ iteration (first-second)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"}), newGuest({host: "Molly"})], "James"), 
        [newGuest({host: "James"})]);

        // loop: 0-1-many 2+ iteration (first-second)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "Molly"}), newGuest({host: "host_name"})], "Molly"), 
        [newGuest({host: "Molly"})]);

        // loop: 0-1-many 2+ iteration (second-first)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "Molly"}), newGuest({host: "James"})], "James"), 
        [newGuest({host: "James"})]);

        // loop: 0-1-many 2+ iteration (second-first)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"}), newGuest({host: "Molly"})], "Molly"), 
        [newGuest({host:"Molly"})]);

        // loop: 0-1-many 2+ iteration (second-second)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"}), newGuest({host: "James"})], "Molly"), 
        []);

        // loop: 0-1-many 2+ iteration (second-second)
        assert.deepStrictEqual(guestsOfHost([newGuest({host: "James"}), newGuest({host: "James"})], "unknown host"), 
        []);
    });

    it('parseGuests', function() {
        // *** Escape Hatch ***
        // - only consider outermost loop iteration
        // - only one test per subdomain
        // - only one test 0-1 iterations for my sanity please

        // Not an array
        assert.deepStrictEqual(parseGuests(1n), undefined);

        // Not an array
        assert.deepStrictEqual(parseGuests("this is not an array"), undefined);

        // loop: 0-1-many heuristic 0 iterations (only one possible)
        assert.deepStrictEqual(parseGuests([]), []);

        // loop: 0-1-many heuristic 1 iteration (first branch)
        assert.deepStrictEqual(parseGuests(["not a record"]), undefined);

        // loop: 0-1-many heuristic 1 iteration (second branch)
        assert.deepStrictEqual(parseGuests([{name: "hello"}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (third branch)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (fourth branch)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true, host: "help"}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (fifth branch)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true, 
            host: "help", guestName: "me"}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (sixth branch)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true, 
        host: "help", guestName: "me", guestDiet: "please"}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (seventh branch)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true, 
        host: "help", guestName: "me", guestDiet: "please", plus_one: -1}]), undefined);

        // loop: 0-1-many heuristic 1 iteration (last branch - valid input)
        assert.deepStrictEqual(parseGuests([{name: "hello", family: true, 
        host: "help", guestName: "me", guestDiet: "please", plus_one: -1, diet: "help"}]), [{name: "hello", family: true, 
        host: "help", guestName: "me", guestDiet: "please", plus_one: -1, diet: "help"}]);
    });

    it('guestRange', function() {
        //*** Escape Hatch ***
        // - only consider outermost recurisve call

        // 0-1-many heuristic base case - only one possible via guestRange (not helper)
        assert.deepStrictEqual(guestRange([]), {min: 0, max:0});

        // 0-1-many heuristic 1 recursive call (first branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: 1})]), {min: 2, max: 2});

        // 0-1-many heuristic 1 recursive call (first branch)
        assert.deepStrictEqual(guestRange([newGuest({host: "Molly", plus_one: 1})]), {min: 2, max: 2});

        // 0-1-many heuristic 1 recursive call (second branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: 0})]), {min: 1, max: 1});

        // 0-1-many heuristic 1 recursive call (second branch)
        assert.deepStrictEqual(guestRange([newGuest({guestDiet: "Food", plus_one: 0})]), {min: 1, max: 1});

        // 0-1-many heuristic 1 recursive call (third branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: -1})]), {min: 1, max: 2});

        // 0-1-many heuristic 1 recursive call (third branch)
        assert.deepStrictEqual(guestRange([newGuest({name: "A", family: true, plus_one: -1})]), {min: 1, max: 2});

        // 0-1-many heuristic 2+ recursive calls (first branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: 1}), newGuest({})]), 
            {min: 3, max: 4});

        // 0-1-many heuristic 2+ recursive calls (first branch)
        assert.deepStrictEqual(guestRange([newGuest({guestName: "ok", plus_one: 1}), newGuest({family: true, guestDiet: "diet", plus_one: 1})]), 
            {min: 4, max: 4});

        // 0-1-many heuristic 2+ recursive calls (second branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: 0}), newGuest({plus_one: 1})]), 
            {min: 3, max: 3});

        // 0-1-many heuristic 2+ recursive calls (second branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: 0}), newGuest({plus_one: -1})]), 
            {min: 2, max: 3});

        // 0-1-many heuristic 2+ recursive calls (third branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: -1}), newGuest({plus_one: 1})]), 
            {min: 3, max: 4});

        // 0-1-many heuristic 2+ recursive calls (third branch)
        assert.deepStrictEqual(guestRange([newGuest({plus_one: -1}), newGuest({plus_one: 0})]), 
        {min: 2, max: 3});
    });
});