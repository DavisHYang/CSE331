import { ColorDetails, COLORS } from './colors';
import { List, cons, nil } from './list';

/** Represents a seachable list of colors */
export interface ColorList {
  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) where bg is the CSS background color and fg is foreground
   */
  readonly findNameSet: (text: string) => List<string>;
  
  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) where bg is the CSS background color and fg is foreground
   */
  readonly getColorCss: (name: string) => readonly [string, string];
}

/** Implementation of the ColorList interface that stores a list of ColorDetails */
class SimpleColorList implements ColorList {
  // AF: obj = this.colorDetails
  readonly colorDetails: List<ColorDetails>;

  // Creates a ColorList with the given lost of ColorDetails
  constructor(cd: List<ColorDetails>) {
    this.colorDetails = cd;
  }

  readonly findNameSet = (text: string): List<string> => {
    return findNameSetIn(text, this.colorDetails);
  };

  readonly getColorCss = (name: string): readonly[string, string] => {
    return getColorCssIn(name, this.colorDetails)
  };
}

const singletonColorList: ColorList = new SimpleColorList(COLORS);

/** Returns an instance of SimpleColorList */ 
export const makeSimpleColorList = (): ColorList => {
  return singletonColorList;
}

/** 
 * Returns a new list containing just the names of those colors that include the given text.
 * @param text The text in question
 * @param colors The full list of colors
 * @returns The sublist of colors containing those colors whose names contain the given text.
 */ 
export const findNameSetIn =
    (text: string, colors: List<ColorDetails>): List<string> => {
  if (colors.kind === "nil") {
    return nil;
  } else {
    // Note: the _ keeps the typechecker from complaining about our not using
    // these variables (but we must define them to avoid tuple indexing)
    const [color, _css, _foreground] = colors.hd;
    if (color.includes(text)) {
      return cons(color, findNameSetIn(text, colors.tl));
    } else {
      return findNameSetIn(text, colors.tl);
    }
  }
};

// Returns the colors from the (first) list entry with this color name. Throws
// an Error none is found (i.e., we hit the end of the list).
// @param name The name in question.
// @param colors The full list of colors.
// @throws Error if no item in colors has the given name.
// @return The first item in colors whose name matches the given name.
const getColorCssIn =
    (name: string, colors: List<ColorDetails>): readonly [string, string] => {
  if (colors.kind === "nil") {
    throw new Error(`no color called "${name}"`);
  } else {
    const [color, css, foreground] = colors.hd;
    if (color === name) {
      return [css, foreground ? '#F0F0F0' : '#101010'];
    } else {
      return getColorCssIn(name, colors.tl);
    }
  }
};
