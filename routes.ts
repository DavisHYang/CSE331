import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { splitWords, toString } from './words';
import { PATTERNS } from "./patterns";
import { chatResponse } from "./chatbot";
import { MutableMap, makeSimpleMutableMap } from "./map";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

// Keep track of possible responses for when we run out of things to say.
const memory: string[][] = [];

const map : MutableMap = makeSimpleMutableMap();


/**
 * Handles request for /chat, with a message included as a query parameter,
 * by getting the next chat response.
 */
export const chat = (req: SafeRequest, res: SafeResponse): void => {
  const msg = first(req.query.message);
  if (msg === undefined) {
    res.status(400).send('required argument "message" was missing');
    return;
  }

  const words = splitWords(msg);
  const result = chatResponse(words, memory, PATTERNS);
  res.send({response: toString(result)});
}

/** Handles request for /save by storing the given transcript. */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.body.name);
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }

  const value = req.body.value;
  if (value === undefined) {
    res.status(400).send('required argument "value" was missing');
    return;
  }
  res.send({replaced: map.setValue(name, value) });  
}

/** Handles request for /load by returning the transcript requested. */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('required argument "name" was missing');
    return;
  }

  if(!map.containsKey(name)) {
    res.status(404).send('no associated transcript with provided name');
    return;
  }

  res.send({value: map.getValue(name)});
}

/** 
 * Used in tests to set the transcripts map back to empty. 
 * (exported ONLY for testing)
 */
export const resetTranscriptsForTesting = (): void => {
  map.clear();
};


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param) && param.length > 0) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}
