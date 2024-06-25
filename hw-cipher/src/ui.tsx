import React from 'react';
import { cipher_encode, cipher_decode, frog_latin_encode, frog_latin_decode, crazy_caps_encode, crazy_caps_decode } from './latin_ops';
import { explode, compact } from './char_list';


/** Returns UI that displays a form asking for encode/decode input. */
export const ShowForm = (_: {}): JSX.Element => {
    // TODO: Replace this with something fully functional.
    return (
        <form action="/" method="get">
        <label htmlFor="word">Word</label>
          <input type="text" id="word" name="word"></input>

        <label htmlFor="algo">operation</label><select id="algo" name="algo">
            {<option value ="cipher">cipher</option>}
            {<option value ="crazy-caps">crazy-caps</option>}
            {<option value ="frog-latin">frog-latin</option>}
          </select>

          {/* Hint: for these radio buttons to be associated with each other
              (when one is checked the other isn't) they need the same name */}
          <label>encode</label><input type="radio" id="op" name="op" value="encode" defaultChecked></input>
          <label>decode</label><input type="radio" id="op" name="op" value="decode"></input>

          <input type="submit" value="Submit"></input>
        </form>);
};


/** Properties expected for the ShowResult UI below. */
export type ShowResultProps = {
    readonly word: string;
    readonly algo: "cipher" | "crazy-caps" | "frog-latin";
    readonly op: "encode" | "decode";
};

/**
 * Returns UI that shows the result of applying the specified operation to the
 * given word.
 */
export const ShowResult = (props: ShowResultProps): JSX.Element => {

  if (props.algo === "cipher") {
      if(props.op === "encode") {
        return <p><code>{compact(cipher_encode(explode(props.word)))}</code></p>
      } else {
        return <p><code>{compact(cipher_decode(explode(props.word)))}</code></p>
      }
  } 
  else if(props.algo === "crazy-caps") {
    if(props.op === "encode") {
      return <p><code>{compact(crazy_caps_encode(explode(props.word)))}</code></p>
    } else {
      return <p><code>{compact(crazy_caps_decode(explode(props.word)))}</code></p>
    }
  }
  else if(props.algo === "frog-latin") {
    if(props.op === "encode") {
      return <p><code>{compact(frog_latin_encode(explode(props.word)))}</code></p>
    } else {
      return <p><code>{compact(frog_latin_decode(explode(props.word)))}</code></p>
    }
  }

  return <p><code>{props.word}</code></p>

};
