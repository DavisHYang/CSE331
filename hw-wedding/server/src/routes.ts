import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { MutableMap, makeTSMutableMap } from "./map";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

const map: MutableMap = makeTSMutableMap();


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/**
 * Saves the "guest" of a given Guest under "name" 
 * if both provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const add = (req: SafeRequest, res: SafeResponse): void => {
  const guest = req.body.guest;
  const name = first(req.body.name);

  if(guest === undefined) {
    res.status(400).send('missing "guest" parameter');
    return;
  }
  if(name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }
  
  map.setValue(name, guest);
  res.send({saved: true});
};

/**
 * Returns the "guest" associated with Guest "name" 
 * if "name" is in query params and has associated "guest"
 * @param req request to respond to
 * @param res object to send response with
 */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if(name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  if(!map.containsKey(name)) {
    res.status(404).send('no associated guest with provided "name"');
    return;
  }

  res.send({guest: map.getValue(name), name: name});
};

/**
 * Returns the names of all currently saved files
 * @param res object to send response with
 */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  const guests = [];
  for(const key of map.getKeys()) {
    guests.push(map.getValue(key));
  }
  res.send({names: map.getKeys(), guests: guests});
};

/**
 * Reset map for testing purposes
 */
export const resetForTesting = (): void => {
  map.clear();
}