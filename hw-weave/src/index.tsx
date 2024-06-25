import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Color, toColor } from './color';
import { List, nil, cons } from './list';
import { Weave, WeaveForm } from './ui';


// Returns the list of weave colors requested or undefined if not requested.
const GetColors = (params: URLSearchParams): List<Color>|undefined => {
  let colorStr = params.get("colors");
  if (colorStr === null)
    return undefined;

  // Convert the color string into a list of Colors (via toColor on each char).
  let colors: List<Color> = nil;
  // Inv: colors = [colorStr[i], ..., colorStr[n-1]], where n = colorStr.length
  for (let i = colorStr.length - 1 ; i >= 0; i--) {
    colors = cons(toColor(colorStr.charAt(i)), colors);
  }
  return colors;
};

// Find the element in which to render the UI.
const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('Uh oh! Could not find the "main" element.')

// Parse the arguments to the page
const params: URLSearchParams = new URLSearchParams(window.location.search);
const colors: List<Color>|undefined = GetColors(params);

// If both parameters were provided (and valid), show the weave. Otherwise, show
// a form asking them for the parameters.
const root: Root = createRoot(main);
if (colors !== undefined) {
  root.render(
    <React.StrictMode><Weave colors={colors} rows={20n}/></React.StrictMode>);
} else {
  root.render(
    <React.StrictMode><WeaveForm/></React.StrictMode>);
}