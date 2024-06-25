
//  d) Implement a factory function that creates a new instance of the class

/** Represents a mutable Map */
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
     * @throws Error if !containsKey(key)
     * @returns the value associated with the first instance
     * of the key
     */
    readonly getValue: (key: string) => unknown;

     /**
     * Sets the value associated with the key to val
     * @param key key of the corresponding value to change
     * @param val the replacement value
     * @returns a boolean indicating if a value was replaced
     * @modifies obj
     * @effects obj contains the same pairs with key's value replace
     * with val
     */
    readonly setValue: (key: string, val: unknown) => boolean;

    /**
     * Clears all pairs from the map
     * @modifies obj
     * @effects obj contains no pairs
     */
    readonly clear: () => void;
    
    /**
     * Returns all keys in the map
     * @returns an Array<string> containing all the keys 
     *          in the map
     */
    readonly getKeys: () => Array<string>;
}

/** Implementation of the MutableMap interface that stores a TS Map */
class TSMutableMap implements MutableMap {
    // AF: obj = this.map
    map: Map<string, unknown>;

    /**
     * Creates an empty SimpleMutableMap
     * @modifies obj
     * @effects obj = nil
     */
    constructor() {
        this.map = new Map();
    }

    containsKey = (key: string): boolean => {
        return this.map.has(key);
    }

    getValue = (key: string): unknown => {
        if(!this.containsKey(key)) {
            throw new Error();
        }
        return this.map.get(key);
    }

    setValue = (key: string, val: unknown): boolean => {
        const res = this.containsKey(key);
        this.map.set(key, val);
        return res;
    }

    clear = (): void => {
        this.map = new Map();
    }

    getKeys = (): Array<string> => {
        return Array.from(this.map.keys());
    }
}

/**
 * Returns an instance of SimpleMutableMap
 * @returns an instance of SimpleMutableMap
 */
export const makeTSMutableMap = (): MutableMap => {
    return new TSMutableMap();
}