import { isRecord } from './record';

// Stores information about Guest
export type Guest = {
    // Name of guest
    name: string;

    // Host name
    host: string;

    // Dietary restrictions of primary Guest
    diet: string;
    
    // true if has plus one
    plus_one: number;
    
    // true if family
    family: boolean;

    // Name of secondary Guest
    guestName: string;

    // Dietary restrictions of secondary Guest
    guestDiet: string;
}
/** 
 * Creats a JSON representation of given Guest. 
 * @param sq to convert to JSON
 * @returns JSON describing the given Guest
 */
export const toJson = (guest: Guest): unknown => {
    return guest;
};

/** 
 * Converts a JSON description to the Guest it describes. 
 * @param data in JSON form to try to parse as Guest
 * @returns a Guest parsed from given data
 */
export const fromJson = (data: unknown): Guest => {
    if(isRecord(data)) {
        if(typeof data.diet === 'string' && typeof data.plus_one === 'number'
        && typeof data.name === 'string' && typeof data.host === 'string'
            && typeof data.guestName === 'string' && typeof data.guestDiet === 'string'
            && typeof data.family === 'boolean') {
            return newGuest(data.name, data.host, data.family, data.diet,
                    data.plus_one, data.guestName, data.guestDiet);
        }
    }
    throw new Error("Something went wrong");
}


/**
 * Returns a new Guest with given params
 * or default ("", false) if not provided
 * @param name of Guest
 * @param host of Guest
 * @param family of Guest
 * @param diet of Guest
 * @param plus_one of Guest
 * @param guestName of Guest
 * @param guestDiet of Guest
 * @returns a new Guest with given params
 *          or default ("", false) if not provided
 */
export const newGuest = (name?: string, host?: string, family?: boolean, diet?: string,
        plus_one?: number, guestName?: string, guestDiet?: string): Guest => {
            const nameRes = name === undefined ? "" : name;
            const hostRes = host === undefined ? "" : host;
            const familyRes = family === undefined ? false : family;
            const dietRes = diet === undefined ? "" : diet;
            const plus_oneRes = plus_one === undefined ? -1 : plus_one;
            const guestNameRes = guestName === undefined ? "" : guestName;
            const guestDietRes = guestDiet === undefined ? "" : guestDiet;

    return {name: nameRes, host: hostRes, family: familyRes, diet: dietRes,
            plus_one: plus_oneRes, guestName: guestNameRes, guestDiet: guestDietRes};
}

/**
 * Returns a Guest with given name
 * @param guest Guest in question
 * @param name new name
 */
export const setGuestName = (guest: Guest, name: string): Guest => {
    return {name: name, host: guest.host, family: guest.family, diet: guest.diet,
            plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given host
 * @param guest Guest in question
 * @param host new host
 */
export const setGuestHost = (guest: Guest, host: string): Guest => {
    return {name: guest.name, host: host, family: guest.family, diet: guest.diet,
            plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given family
 * @param guest Guest in question
 * @param family new family
 */
export const setGuestFamily = (guest: Guest, family: boolean): Guest => {
    return {name: guest.name, host: guest.host, family: family, diet: guest.diet,
            plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given diet
 * @param guest Guest in question
 * @param diet new diet
 */
export const setGuestDiet = (guest: Guest, diet: string): Guest => {
    return {name: guest.name, host: guest.host, family: guest.family, diet: diet,
            plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given plus_one
 * @param guest Guest in question
 * @param plus_one new plus_one
 */
export const setGuestPlusOne = (guest: Guest, plus_one: number): Guest => {
    return {name: guest.name, host: guest.host, family: guest.family, diet: guest.diet,
            plus_one: plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given guestName
 * @param guest Guest in question
 * @param guestName new guestName
 */
export const setGuestGuestName = (guest: Guest, guestName: string): Guest => {
    return {name: guest.name, host: guest.host, family: guest.family, diet: guest.diet,
            plus_one: guest.plus_one, guestName: guestName, guestDiet: guest.guestDiet};
}

/**
 * Returns a Guest with given guestDiet
 * @param guest Guest in question
 * @param guestDiet new guestDiet
 */
export const setGuestGuestDiet = (guest: Guest, guestDiet: string): Guest => {
    return {name: guest.name, host: guest.host, family: guest.family, diet: guest.diet,
            plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guestDiet};
}

/**
 * Returns the number of guests who are family
 * @param guests the guest[] to process
 * @returns the number of guests who are family
 */
export const guestFamily = (guests: Array<Guest>, index: number): number => {
    if(index === guests.length) {
        return 0;
    }
    if(guests[index].family) {
        return 1 + guestFamily(guests, index+1);
    }
    return guestFamily(guests, index+1);
}

/**
 * Returns the subset of guest's Guests who 
 * are guests of the given host
 * @param guests the Guests to process
 * @param host the name of the host
 * @returns an array containing the subset of guest's
 *          Guests who are guests of host
 */
export const guestsOfHost = (guests: Array<Guest>, host: string): Guest[] => {
    const result: Guest[] = [];
    for(const guest of guests) {
        if(guest.host === host) {
            result.push(guest);
        }
    }
    return result;
}

/**
 * Parses unknown data into an array of Guests. Will log an error and return
 * undefined if it is not an array of Guests.
 * @param val unknown data to parse into an array of Guests
 * @return Guest[] if val is an array of Guests and undefined otherwise
 */
export const parseGuests = (val: unknown): undefined | Guest[] => {
    if(!Array.isArray(val)) {
        console.error("not an array", val);
        return undefined;
    }

    const guests: Guest[] = [];
    for(const guest of val) {
        if (!isRecord(guest)) {
            console.error("guest is not a record", guest);
            return undefined;
          } else if (typeof guest.name !== 'string') {
            console.error("guest.name is missing or invalid", guest.name);
            return undefined;
          } else if (typeof guest.family !== 'boolean') {
            console.error("guest.family is missing or invalid", guest.family);
            return undefined;
          } else if (typeof guest.host !== 'string') {
            console.error("guest.host is missing or invalid", guest.host);
            return undefined;
          } else if (typeof guest.guestName !== 'string') {
            console.error("guest.guestName is missing or invalid", guest.guestName);
            return undefined;
          } else if (typeof guest.guestDiet !== 'string') {
            console.error("guest.guestDiet is missing or invalid", guest.guestDiet);
            return undefined;
          } else if (typeof guest.plus_one !== 'number') {
            console.error("guest.plus_one is missing or invalid", guest.plus_one);
            return undefined;
          } else if (typeof guest.diet !== 'string') {
            console.error("guest.diet is missing or invalid", guest.diet);
            return undefined;
          } else {
            guests.push(newGuest(guest.name, guest.host, guest.family, guest.diet, 
                    guest.plus_one, guest.guestName, guest.guestDiet));
          }
    }
    return guests;
}

/**
 * Returns the range of the number of guests
 * @param guests the guests to process
 * @returns a record containing the min and max number
 *          of guests given the Guest[]
 */
export const guestRange = (guests: Array<Guest>): {min: number, max: number} => {
    return guestRangeHelper(guests,0, 0, 0);
}

const guestRangeHelper = (guests: Array<Guest>, index: number, 
        min: number, max: number): {min: number, max: number} => {

    if(index === guests.length) {
        return {min: min, max: max};
    }
    
    if(guests[index].plus_one === 1) {
        return guestRangeHelper(guests, index+1, min+2, max+2);
    } else if(guests[index].plus_one === 0) {
        return guestRangeHelper(guests, index+1, min+1, max+1);
    } else {
        return guestRangeHelper(guests, index+1, min+1, max+2);
    }
}