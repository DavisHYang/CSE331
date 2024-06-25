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
 * Saves the "content" of a given file under "name" 
 * if both provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const content = req.body.content;
  const name = first(req.body.name);

  if(content === undefined) {
    res.status(400).send('missing "content" parameter');
    return;
  }
  if(name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  map.setValue(name, content);
  res.send({saved: true});
};

/**
 * Returns the "content" associated with "name" 
 * if "name" is in query params and has associated "content"
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
    res.status(404).send('no associated content with provided "name"');
    return;
  }

  res.send({content: map.getValue(name), name: name});
};

/**
 * Returns the names of all currently saved files
 * @param res object to send response with
 */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({names: map.getKeys()});
};

/**
 * Reset map for testing purposes
 */
export const resetForTesting = (): void => {
  map.clear();
}
