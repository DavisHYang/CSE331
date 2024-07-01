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
            return newGuest({name: data.name, host: data.host, family: data.family, diet: data.diet,
                    plus_one: data.plus_one, guestName: data.guestName, guestDiet: data.guestDiet});
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
export const newGuest = (desc: {name?: string, host?: string, family?: boolean, diet?: string,
        plus_one?: number, guestName?: string, guestDiet?: string}): Guest => {
            const nameRes = desc.name === undefined ? "" : desc.name;
            const hostRes = desc.host === undefined ? "" : desc.host;
            const familyRes = desc.family === undefined ? false : desc.family;
            const dietRes = desc.diet === undefined ? "" : desc.diet;
            const plus_oneRes = desc.plus_one === undefined ? -1 : desc.plus_one;
            const guestNameRes = desc.guestName === undefined ? "" : desc.guestName;
            const guestDietRes = desc.guestDiet === undefined ? "" : desc.guestDiet;

    return {name: nameRes, host: hostRes, family: familyRes, diet: dietRes,
            plus_one: plus_oneRes, guestName: guestNameRes, guestDiet: guestDietRes};
}

/**
 * Returns a new Guest with new params
 * or guest's params by default
 * @param guest guest to set params
 * @param desc params to change to
 * @returns a new Guest with given params
 *          or guest's params by default
 */
export const setGuest = (guest: Guest, desc: {name?: string, host?: string, family?: boolean, diet?: string,
    plus_one?: number, guestName?: string, guestDiet?: string}): Guest => {
        const nameRes = desc.name === undefined ? guest.name : desc.name;
        const hostRes = desc.host === undefined ? guest.host : desc.host;
        const familyRes = desc.family === undefined ? guest.family : desc.family;
        const dietRes = desc.diet === undefined ? guest.diet : desc.diet;
        const plus_oneRes = desc.plus_one === undefined ? guest.plus_one : desc.plus_one;
        const guestNameRes = desc.guestName === undefined ? guest.guestName : desc.guestName;
        const guestDietRes = desc.guestDiet === undefined ? guest.guestDiet : desc.guestDiet;

return {name: nameRes, host: hostRes, family: familyRes, diet: dietRes,
        plus_one: plus_oneRes, guestName: guestNameRes, guestDiet: guestDietRes};
}


/**
 * Returns the number of guests who are family
 * @param guests the guest[] to process
 * @returns the number of guests who are family
 */
export const guestFamily = (guests: Array<Guest>): number => {
    return guestFamilyHelper(guests, 0);
}

const guestFamilyHelper = (guests: Array<Guest>, index : number): number => {
    if(index === guests.length) {
        return 0;
    }
    if(guests[index].family) {
        return 1 + guestFamilyHelper(guests, index+1);
    }
    return guestFamilyHelper(guests, index+1);
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
            guests.push(newGuest({name: guest.name, host: guest.host, family: guest.family, diet: guest.diet, 
                    plus_one: guest.plus_one, guestName: guest.guestName, guestDiet: guest.guestDiet}));
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
    
    if(guests[index].plus_one === 1) { // bringing a plus one
        return guestRangeHelper(guests, index+1, min+2, max+2);
    } else if(guests[index].plus_one === 0) { // not bringing a plus one
        return guestRangeHelper(guests, index+1, min+1, max+1);
    } else { // undecided
        return guestRangeHelper(guests, index+1, min+1, max+2);
    }
}
