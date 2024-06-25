import { explode, compact } from './char_list';
import { List, cons, concat, len, rev } from './list';
import { suffix, prefix } from './list_ops';

/** Determines whether the given character is a vowel. */
const is_latin_vowel = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "aeiouy".indexOf(ch) >= 0;
};

/** Determines whether the given character is a Latin consonant. */
const is_latin_consonant = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "bcdfghjklmnpqrstvwxz".indexOf(ch) >= 0;
};

/** Changes most Latin alphabetic characters to different ones. */
export const next_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "i".charCodeAt(0);
        case "e": return "y".charCodeAt(0);
        case "i": return "u".charCodeAt(0);
        case "o": return "a".charCodeAt(0);
        case "u": return "o".charCodeAt(0);
        case "y": return "e".charCodeAt(0);

        case "b": return "t".charCodeAt(0);
        case "p": return "g".charCodeAt(0); 
        case "j": return "d".charCodeAt(0); 
        case "g": return "j".charCodeAt(0); 
        case "d": return "b".charCodeAt(0); 
        case "t": return "p".charCodeAt(0); 

        case "c": return "z".charCodeAt(0);
        case "k": return "c".charCodeAt(0);
        case "s": return "k".charCodeAt(0);
        case "z": return "s".charCodeAt(0);

        case "f": return "w".charCodeAt(0);
        case "v": return "f".charCodeAt(0);
        case "w": return "v".charCodeAt(0);

        case "h": return "r".charCodeAt(0);
        case "l": return "h".charCodeAt(0);
        case "r": return "l".charCodeAt(0);

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};

/** Inverse of next_char. */
export const prev_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "o".charCodeAt(0); 
        case "e": return "y".charCodeAt(0); 
        case "i": return "a".charCodeAt(0); 
        case "o": return "u".charCodeAt(0); 
        case "u": return "i".charCodeAt(0); 
        case "y": return "e".charCodeAt(0);

        case "b": return "d".charCodeAt(0);
        case "p": return "t".charCodeAt(0);
        case "j": return "g".charCodeAt(0);
        case "g": return "p".charCodeAt(0);
        case "d": return "j".charCodeAt(0);
        case "t": return "b".charCodeAt(0);

        case "c": return "k".charCodeAt(0);
        case "k": return "s".charCodeAt(0);
        case "s": return "z".charCodeAt(0);
        case "z": return "c".charCodeAt(0);

        case "f": return "v".charCodeAt(0);
        case "v": return "w".charCodeAt(0);
        case "w": return "f".charCodeAt(0); 

        case "h": return "l".charCodeAt(0);
        case "l": return "r".charCodeAt(0); 
        case "r": return "h".charCodeAt(0); 

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};


/** x
 * Returns the number of consonants at the start of the given string
 * before the first vowel, or -1 if there are no vowels
 */
export const count_consonants = (L: List<number>): bigint => {
    if (L.kind === "nil") {
        return -1n;
    } else if (is_latin_vowel(L.hd)) {
        return 0n;
    } else if (is_latin_consonant(L.hd)) {
        const n = count_consonants(L.tl);
        if (n === -1n) {
            return -1n;
        } else {
            return n + 1n;
        }
    } else {
        // not a vowel or a consonant
        return -1n;
    }
};


// TODO: add your function declarations in this file for: 
// cipher_encode, cipher_decode crazy_caps_encode, crazy_caps_decode,
// pig_latin_encode, pig_latin_decode

// * Remember to add /** jsdoc */ comments above each function! The contents
//   won't be graded, but a brief description is appropriate (see the above
//   functions for an example)

/** Returns the encoded version of a string */
export const cipher_encode = (L: List<number>): List<number> => {
    if(L.kind === "nil") {
        return L;
    }
    return cons(next_latin_char(L.hd), cipher_encode(L.tl));
};

/** Returns the decoded version of a string */
export const cipher_decode = (L: List<number>): List<number> => {
    if(L.kind === "nil") {
        return L;
    }
    return cons(prev_latin_char(L.hd), cipher_decode(L.tl));
};

/** Returns a string with every other character uppercase-d */
export const crazy_caps_encode = (L: List<number>): List<number> => {
    if(L.kind === "nil") {
        return L;
    }
    if(L.tl.kind === "nil") {
        return L;
    }
    return cons(L.hd, cons(String.fromCharCode(L.tl.hd).toUpperCase().charCodeAt(0), crazy_caps_encode(L.tl.tl)));
};

/** Returns a decoded crazy caps string if valid */
export const crazy_caps_decode = (L: List<number>): List<number> => {
    if(L.kind === "nil") {
        return L;
    }
    if(L.tl.kind === "nil") {
        return L;
    }
    return cons(L.hd, cons(String.fromCharCode(L.tl.hd).toLowerCase().charCodeAt(0), crazy_caps_decode(L.tl.tl)));
};

/** Returns a string using frog latin encoding */
export const frog_latin_encode = (L: List<number>): List<number> => {
    const cc: bigint = count_consonants(L);
    if(cc < 0) {
        return L;
    }
    if(cc === 0n) {
        return concat(explode("f"), concat(L, explode("rog")));
    }
    return concat(suffix(cc, L), concat(prefix(cc, L), explode("rog")));
};

/** Returns a decoded frog lating string if valid */
export const frog_latin_decode = (L: List<number>): List<number> => {
    const length: bigint = len(L);
    if(length <= 3 || L.kind === "nil") {
        return L;
    }
    //ends in "rog"
    if(compact(suffix(length-3n, L)) === "rog") {
        //starts with "f"
        //second char is a vowel
        if(L.hd === "f".charCodeAt(0) && count_consonants(suffix(1n, L)) === 0n) {
            return prefix((length-1n)-3n, suffix(1n, L));
        }
        //ends with consonant + "rog" 
        //starts with a vowel
        if(count_consonants(suffix(length-4n, L)) !== 0n && count_consonants(L) === 0n) {
            //store the consecutive consonants before the "rog" ending
            const lastCons: List<number> = rev(prefix(count_consonants(suffix(3n, rev(L))), suffix(3n, rev(L))));
            return concat(lastCons, prefix((length-3n)-len(lastCons), L));
        }
    }
    return L;
}