
import { AssocList, contains_key, get_value } from "./assoc";
import { cons, nil } from "./list";

/** Represents a mutable Association List */
export interface MutableMap {
    /**
     * Determines if the given key exists in the map
     * @param key key to search for in the map
     * @returns a boolean indicating whether the key was found
     */
    readonly containsKey: (key: string) => boolean;

    /**
     * Retrieves the value associated with the first instance
     * of the key
     * @param key key to find corresponding value
     * @returns the value associated with the first instance
     * of the key
     * @throws Error if !containsKey(key)
     */
    readonly getValue: (key: string) => unknown;

    /**
     * Sets the value associated with the key to val
     * @param key key of the corresponding value to change
     * @param val the replacement value
     * @returns a boolean indicating if the value was replaced
     */
    readonly setValue: (key: string, val: unknown) => boolean;

    /**
     * Clears all pairs from the map
     */
    readonly clear: () => void;
}

/** Implementation of the MutableMap interface that stores an AssocList*/
class SimpleMutableMap implements MutableMap{
    // AF: obj = this.map
    map: AssocList<unknown>;

    // Creates an empty SimpleMutableMap
    constructor() {
        this.map = nil;
    }
    containsKey = (key: string): boolean => {
        return contains_key(key, this.map);
    }
    getValue = (key: string): unknown => {
        return get_value(key, this.map);
    }

     /**
     * Sets the value associated with the key to val
     * @param key key of the corresponding value to change
     * @param val the replacement value
     * @returns a boolean indicating if a value was replaced
     * @modifies obj
     * @effects obj contains the same pairs with key's value replace
     * with val
     */
    setValue = (key: string, val: unknown): boolean => {
        if(this.containsKey(key)) {
            this.map = cons([key, val], this.map);
            return true;
        } else {
            this.map = cons([key, val], this.map);
            return false;
        }
    }

    /**
     * Clears all pairs from the map
     * @modifies obj
     * @effects obj contains no pairs
     */
    clear = (): void => {
        this.map = nil;
    }
}

/**
 * Returns an instance of SimpleMutableMap
 * @returns an instance of SimpleMutableMap
 */
export const makeSimpleMutableMap = (): MutableMap => {
    return new SimpleMutableMap();
}