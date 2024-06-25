import * as assert from 'assert';
import { Guest, guestsOfHost, newGuest, guestRange, setGuestPlusOne, toJson, fromJson, setGuestName, setGuestHost, setGuestFamily, setGuestDiet, setGuestGuestName, setGuestGuestDiet, guestFamily, parseGuests} from './guest';

describe('guest', function() {
    it('toJson', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(toJson(guest1), {name: "", host: "", family: false, 
            diet: "", plus_one: -1, guestName: "", guestDiet: ""});

        const guest2: Guest = newGuest("Davis", "Davis again", true);
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

        const data3 = toJson(newGuest());
        // Return Guest branch
        assert.deepStrictEqual(fromJson(data3), {name: "", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""});

        const data4 = toJson(newGuest("FAKER GOAT!", "FAKER GOAT!!", true, "eats world championships for breakfast"));
        // Return Guest branch
        assert.deepStrictEqual(fromJson(data4), {name: "FAKER GOAT!", host: "FAKER GOAT!!", family: true, 
        diet: "eats world championships for breakfast", plus_one: -1, guestName: "", guestDiet: ""});
    });

    it('newGuest', function() {
        // *** Escape Hatch ***
        // - treat each ternary operator as its own subdomain (2 per variable)
        // - one test per subdomain
        // (essentially just make sure each )

        // No input
        assert.deepStrictEqual(newGuest(), {name: "", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting name
        assert.deepStrictEqual(newGuest("Guma"), {name: "Guma", host: "", family: false, 
        diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting host
        assert.deepStrictEqual(newGuest(undefined, "Keria"), {name: "", host: "Keria", 
        family: false, diet: "", plus_one: -1, guestName: "", guestDiet: ""})
        
        // Test setting family
        assert.deepStrictEqual(newGuest(undefined, undefined, true), {name: "", host: "", 
        family: true, diet: "", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting diet
        assert.deepStrictEqual(newGuest(undefined, undefined, undefined, "LCS"), 
        {name: "", host: "", family: false, diet: "LCS", plus_one: -1, guestName: "", guestDiet: ""})

        // Test setting plus_one
        assert.deepStrictEqual(newGuest(undefined, undefined, undefined, undefined, 1), 
        {name: "", host: "", family: false, diet: "", plus_one: 1, guestName: "", guestDiet: ""})

        // Test setting guestName
        assert.deepStrictEqual(newGuest(undefined, undefined, undefined, undefined, undefined, "Zeus"), 
        {name: "", host: "", family: false, diet: "", plus_one: -1, guestName: "Zeus", guestDiet: ""})

        // Test setting guestDiet
        assert.deepStrictEqual(newGuest(undefined, undefined, undefined, undefined, undefined, undefined, "Food probably"), 
        {name: "", host: "", family: false, diet: "", plus_one: -1, guestName: "", guestDiet: "Food probably"})
    });

    it('setGuestName', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestName(guest1, "League of Legends"), newGuest("League of Legends"));
    
        const guest2: Guest = newGuest("Azir");
        // Straight-line
        assert.deepStrictEqual(setGuestName(guest2, "FAKER WHAT WAS THAT"), newGuest("FAKER WHAT WAS THAT"));
    });

    it('setGuestHost', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestHost(guest1, "Wow"), newGuest("", "Wow"));

        const guest2: Guest = newGuest("", "AGGHHHHH");
        // Straight-line
        assert.deepStrictEqual(setGuestHost(guest2, "I am calm"), newGuest("", "I am calm"));
    });

    it('setGuestFamily', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestFamily(guest1, true), newGuest("","", true));

        const guest2: Guest = newGuest("", "", true);
        // Straight-line
        assert.deepStrictEqual(setGuestFamily(guest2, false), newGuest("","", false));
    });

    it('setGuestDiet', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestDiet(guest1, "FOOD"), newGuest("","", false, "FOOD"));

        const guest2: Guest = newGuest("", "", false, "insert text");
        // Straight-line
        assert.deepStrictEqual(setGuestDiet(guest2, "Poro Snax"), newGuest("","", false, "Poro Snax"));
    });

    it('setGuestPlusOne', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestPlusOne(guest1, 0), newGuest("", "", false, "", 0));

        const guest2: Guest = newGuest("", "", false, "", 1000000);
        // Straight-line
        assert.deepStrictEqual(setGuestPlusOne(guest2, 1), newGuest("", "", false, "", 1));
    });

    it('setGuestGuestName', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestGuestName(guest1, "A"), newGuest("", "", false, "", -1, "A"));

        const guest2: Guest = newGuest("", "", false, "", -1, "C");
        // Straight-line
        assert.deepStrictEqual(setGuestGuestName(guest2, "B"), newGuest("", "", false, "", -1, "B"));
    });

    it('setGuestGuestDiet', function() {
        const guest1: Guest = newGuest();
        // Straight-line
        assert.deepStrictEqual(setGuestGuestDiet(guest1, "Burrito"), 
            newGuest("", "", false, "", -1, "", "Burrito"));

        const guest2: Guest = newGuest("", "", false, "", -1, "", "Not Burrito");
        // Straight-line
        assert.deepStrictEqual(setGuestGuestDiet(guest2, "Burrito again"), 
            newGuest("", "", false, "", -1, "", "Burrito again"));
    });

    it('guestFamily', function() {
        // 0-1-many heuristic base case
        assert.deepStrictEqual(guestFamily([], 0), 0);

        // 0-1-many heuristic base case
        assert.deepStrictEqual(guestFamily([newGuest()], 1), 0);
        
        // 0-1-many heuristic 1 recursive call first branch
        assert.deepStrictEqual(guestFamily([newGuest("", "", true)], 0), 1);
        
        // 0-1-many heuristic 1 recursive call first branch
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest("", "", true)], 1), 1);

        // 0-1-many heuristic 1 recursive call second branch
        assert.deepStrictEqual(guestFamily([newGuest()], 0), 0);

        // 0-1-many heuristic 1 recursive call second branch
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest()], 1), 0);

        // 0-1-many heuristic 2+ recursive calls (first-second)
        assert.deepStrictEqual(guestFamily([newGuest("", "", true), newGuest()], 0), 1);

        // 0-1-many heuristic 2+ recursive calls (first-second)
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest("", "", true), newGuest()], 1), 1);

        // 0-1-many heuristic 2+ recursive calls (first-first)
        assert.deepStrictEqual(guestFamily([newGuest("", "", true), newGuest("", "", true)], 0), 2);

        // 0-1-many heuristic 2+ recursive calls (first-first)
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest("", "", true), 
            newGuest("", "", true)], 1), 2);

        // 0-1-many heuristic 2+ recursive calls (second-first)
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest("", "", true)], 0), 1);

        // 0-1-many heuristic 2+ recursive calls (second-first)
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest(), newGuest("", "", true)], 1), 1);

        // 0-1-many heuristic 2+ recursive calls (second-second)
        assert.deepStrictEqual(guestFamily([newGuest(), newGuest()], 0), 0);

        // 0-1-many heuristic 2+ recursive calls (second-second)
        assert.deepStrictEqual(guestFamily([newGuest("", "", true), newGuest(), newGuest()], 1), 0);
    });

    it('guestsOfHost', function() {
        // loop: 0-1-many 0 iterations
        assert.deepStrictEqual(guestsOfHost([], "Molly"), []);

        // loop: 0-1-many 0 iterations
        assert.deepStrictEqual(guestsOfHost([], "James"), []);

        // loop: 0-1-many 1 iteration (first branch)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "Molly")], "Molly"), [newGuest("", "Molly")]);

        // loop: 0-1-many 1 iteration (first branch)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James")], "James"), [newGuest("", "James")]);

        // loop: 0-1-many 1 iteration (second branch)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James")], "Molly"), []);

        // loop: 0-1-many 1 iteration (second branch)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "Molly")], "James"), []);

        // loop: 0-1-many 2+ iteration (first-first)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "Molly"), newGuest("", "Molly")], "Molly"), 
            [newGuest("", "Molly"), newGuest("", "Molly")]);

        // loop: 0-1-many 2+ iteration (first-first)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James"), newGuest("", "James")], "James"), 
        [newGuest("", "James"), newGuest("", "James")]);

        // loop: 0-1-many 2+ iteration (first-second)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James"), newGuest("", "Molly")], "James"), 
        [newGuest("", "James")]);

        // loop: 0-1-many 2+ iteration (first-second)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "Molly"), newGuest("", "host_name")], "Molly"), 
        [newGuest("", "Molly")]);

        // loop: 0-1-many 2+ iteration (second-first)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "Molly"), newGuest("", "James")], "James"), 
        [newGuest("", "James")]);

        // loop: 0-1-many 2+ iteration (second-first)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James"), newGuest("", "Molly")], "Molly"), 
        [newGuest("", "Molly")]);

        // loop: 0-1-many 2+ iteration (second-second)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James"), newGuest("", "James")], "Molly"), 
        []);

        // loop: 0-1-many 2+ iteration (second-second)
        assert.deepStrictEqual(guestsOfHost([newGuest("", "James"), newGuest("", "James")], "unknown host"), 
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
        assert.deepStrictEqual(guestRange([newGuest("", "", false, "", 1)]), {min: 2, max: 2});

        // 0-1-many heuristic 1 recursive call (first branch)
        assert.deepStrictEqual(guestRange([newGuest("", "different", false, "", 1)]), {min: 2, max: 2});

        // 0-1-many heuristic 1 recursive call (second branch)
        assert.deepStrictEqual(guestRange([newGuest("", "", false, "", 0)]), {min: 1, max: 1});

        // 0-1-many heuristic 1 recursive call (second branch)
        assert.deepStrictEqual(guestRange([newGuest("", "", true, "", 0)]), {min: 1, max: 1});

        // 0-1-many heuristic 1 recursive call (third branch)
        assert.deepStrictEqual(guestRange([newGuest("", "", false, "", -1)]), {min: 1, max: 2});

        // 0-1-many heuristic 1 recursive call (third branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", -1)]), {min: 1, max: 2});

        // 0-1-many heuristic 2+ recursive calls (first branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", 1), newGuest()]), 
            {min: 3, max: 4});

        // 0-1-many heuristic 2+ recursive calls (first branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", 1), newGuest("a", "", false, "c", 1)]), 
            {min: 4, max: 4});

        // 0-1-many heuristic 2+ recursive calls (second branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", 0), newGuest("a", "", false, "c", 1)]), 
            {min: 3, max: 3});

        // 0-1-many heuristic 2+ recursive calls (second branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", 0), newGuest("a", "", false, "c", -1)]), 
            {min: 2, max: 3});

        // 0-1-many heuristic 2+ recursive calls (third branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", -1), newGuest("a", "", false, "c", -1)]), 
            {min: 2, max: 4});

        // 0-1-many heuristic 2+ recursive calls (third branch)
        assert.deepStrictEqual(guestRange([newGuest("a", "", false, "c", -1), newGuest("a", "", false, "c", 0)]), 
        {min: 2, max: 3});
    });
});