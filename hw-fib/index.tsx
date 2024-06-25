import React from 'react';
import { createRoot } from 'react-dom/client';
import { nextFib } from './fib';
import { isPrime, isHighlyComposite } from './prime';

const prime = (n : bigint) : string => {
  if(n === 0n) {
    return "";
  }
  return isPrime(n) ? " Your age is also prime!" : "";
}

const highlyComposite = (n : bigint) : string => {
  if(n === 0n) {
    return "";
  }
  return isHighlyComposite(n) ? " Your age is also highly composite!" : "";
}

const main: HTMLElement | null = document.getElementById('main');
if (main === null) {
  console.log('Uh oh! no "main" element!');
} else {
  const root = createRoot(main);
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const name: string | null = params.get("firstName");
  const age: string | null = params.get("age");
  if(name === null || age === null || name === "" || age === "") {
    if(name === null && age === null || name === "" && age === "") { //display form if both params are empty/null
      root.render(
      <form action="/">
      <p>Hi there! Please enter the following information:</p>
      <p>Your first name: <input type="text" name="firstName"></input></p>
      <p>Your age: <input type="number" name="age" min="0"></input></p>
      <input type="submit" value="Submit"></input>
      </form>
      );
    } else if(name === null || name === "" ) {
      root.render(<p>Name cannot be empty!</p>);
    } else if(age === null|| age === "") {
      root.render(<p>Age must be a non-negative integer!</p>);
    }
  } else {
    // TODO: replace this when you get to problem 5
    const ageVal : number = parseInt(age);
    // const conditions = {
    //   x : isPrime(BigInt(ageVal)) ? "Your age is also prime!" : "", 
    //   y : isHighlyComposite(BigInt(ageVal)) ? "Your age is also highly composite!" : ""
    // };
    if(ageVal < 0) {
      root.render(<p>Age must be a non-negative integer!</p>);
    } else {
      const resultString : string = `Hi ${name}! Your age (${ageVal})`;
      const fibDiff : bigint = nextFib(BigInt(ageVal)) - BigInt(ageVal);
      if(fibDiff === 0n) {
        root.render(
          <div>
          <p>{resultString + " is a Fibonacci number!" + prime(BigInt(ageVal)) + highlyComposite(BigInt(ageVal))}</p>
          <a href="/">Start Over</a>
          </div>
        );
      } else {
        root.render(
        <div>
        <p>{resultString + ` will be a Fibonacci number in ${fibDiff} years.` + prime(BigInt(ageVal)) + highlyComposite(BigInt(ageVal))}</p>
        <a href="/">Start Over</a>
        </div>
        );
      }
    }
  }
}

