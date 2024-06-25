import { List, nil, equal ,cons, rev, len } from './list';
import { Color } from './color';


/**
 * Returns the list of colors shown in the each of the odd rows (first,
 * third, fifth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return keep(colors), i.e., every other color starting from the first
 */
export const warpFacedOdds = (colors: List<Color>): List<Color> => {
  if(len(colors)%2n == 1n && colors.kind != "nil") {
    return cons(colors.hd, warpFacedEvens(colors.tl));
  }
  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: colors = concat(rev(R), S) and T = warpFacedOdds(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    T = cons(R.tl.hd, T);
    S = cons(R.tl.hd, cons(R.hd, S));
    R = R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = keep(S) = keep(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return drop(colors), i.e., every other color starting from the second
 */
export const warpFacedEvens = (colors: List<Color>): List<Color> => {
  if(len(colors)%2n == 1n && colors.kind != "nil") {
    return warpFacedOdds(colors.tl);
  }
  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: colors = concat(rev(R), S) and T = warpFacedEvens(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    T = cons(R.hd, T);
    S = cons(R.tl.hd, cons(R.hd, S));
    R = R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = drop(S) = drop(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};


/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the weft colors in each row
 * @returns list of the given length where the odd values are the colors of
 *      warpFacedOdds and the even values are the colors of
 *      warpFacedEvens.
 * @returns the function defined recursively (on rows) by
 *   - weave(0, colors) = nil
 *   - weave(1, colors) = cons(warpFacedEvens(colors), nil)
 *   - weave(n+2, colors) =
 *         cons(warpFacedEvens(colors),
 *             cons(warpFacedOdds(colors), weave(n, colors)))
 */
export const weave =
    (_rows: bigint, colors: List<Color>): List<List<Color>> => {
      const odds: List<Color> = warpFacedOdds(colors);
      const evens: List<Color> = warpFacedEvens(colors);
      let i: bigint = _rows%2n == 0n ? 0n : 1n;
      let s: List<List<Color>> = i === 0n ? nil : cons(evens, nil);

      // Inv: s = weave(i, colors)
      while(i !== _rows) {
        i = i + 2n;
        s = cons(evens, cons(odds, s));
      }
      return s // = weave(n, colors); since i === _rows & s = weave(i, colors);
};
