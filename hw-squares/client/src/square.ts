import { List } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/** 
 * Converts a string to a color (or throws an exception if not a color). 
 * @param s string to convert to color
 */
export const toColor = (s: string): Color => {
  switch (s) {
    case "white": case "red": case "orange": case "yellow":
    case "green": case "blue": case "purple":
      return s;

    default:
      throw new Error(`unknown color "${s}"`);
  }
};

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

/** 
 * Returns a solid square of the given color. 
 * @param color of square to return
 * @returns square of given color
 */
export const solid = (color: Color): Square => {
  return {kind: "solid", color: color};
};

/** 
 * Returns a square that splits into the four given parts. 
 * @param nw square in nw corner of returned square
 * @param ne square in ne corner of returned square
 * @param sw square in sw corner of returned square
 * @param se square in se corner of returned square
 * @returns new square composed of given squares
 */
export const split =
    (nw: Square, ne: Square, sw: Square, se: Square): Square => {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
};

export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;


/** 
 * Creats a JSON representation of given Square. 
 * @param sq to convert to JSON
 * @returns JSON describing the given square
 */
export const toJson = (sq: Square): unknown => {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
};

/** 
 * Converts a JSON description to the Square it describes. 
 * @param data in JSON form to try to parse as Square
 * @returns a Square parsed from given data
 */
export const fromJson = (data: unknown): Square => {
  if (typeof data === 'string') {
    return solid(toColor(data))
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}

/**
 * Returns the Square subtree found at the Path's 
 * location from the given Square
 * @param s the Square to traverse
 * @param p the Path describing how to get to the
 *          target Square subtree
 * @throws Error if the target Square subtree does not exist
 * @returns the Square retrieved from traversing 
 *          Square s with Path p
 */
export const find = (s: Square, p: Path): Square => {
  if(p.kind == "nil") { // reached end of Path 
    return s;
  }
  if(s.kind == "solid") { // no more Squares to traverse (non-nil Path)
    throw new Error();
  }

  // traverse Square using Path
  if(p.hd == "NW") {
    return find(s.nw, p.tl);
  }
  if(p.hd == "NE") {
    return find(s.ne, p.tl);
  }
  if(p.hd == "SW") {
    return find(s.sw, p.tl);
  }
  return find(s.se, p.tl);
}

/**
 * Returns the root of a new Square with the Square subtree 
 * found at Path's location replaced with rep
 * @param s the Square to traverse
 * @param p the Path describing how to get to the
 *          target Square subtree
 * @param rep the Square to replace the target Square subtree
 * @throws Error if the target Square subtree does not exist
 * @returns the root of a new tree whose structure matches
 *          s, but with the target Square subtree replace by rep
 */
export const replace = (s: Square, p: Path, rep: Square): Square => {
  if(p.kind == "nil") { // end of Path
    return rep;
  }
  if(s.kind == "solid") { // no more Squares to traverse (non-nil Path)
    throw new Error();
  }

  // traverse Square using Path
  if(p.hd == "NW") {
    return split(replace(s.nw, p.tl, rep), s.ne, s.sw, s.se);
  } else if(p.hd == "NE") {
    return split(s.nw, replace(s.ne, p.tl, rep), s.sw, s.se);
  } else if(p.hd == "SW") {
    return split(s.nw, s.ne, replace(s.sw, p.tl, rep), s.se);
  }
  return split(s.nw, s.ne, s.sw, replace(s.se, p.tl, rep));
}