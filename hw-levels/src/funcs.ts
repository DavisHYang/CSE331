// Problem 4:


/**
 * 
 */
export const r = (p: {n: bigint, m: bigint}): bigint => {
  if(p.n === 0n) {
    return 1n;
  } else if(p.m === 0n) {
    return -1n;
  } else {
    return 0n;
  }
}

/**
 * 
 */
export const s = (p: boolean | [bigint, boolean]): bigint => {
  if(typeof(p) === "boolean") {
    return 0n;
  } else {
    const [n, b] = p;
    if(b) {
      return n;
    } else {
      return s([n+1n, true]);
    }
  }
}

/**
 * 
 */
export const t = (p : [boolean, {n: number, m: number}]) : number => {
  const [bool, nums] = p;
  if(bool) {
    return nums.n * nums.m;
  } else {
    return nums.n - 2*nums.m;
  }
}



// Problem 7:

/**
 * 
 */
export const fact = (n: bigint): bigint => {
  if(n === 0n) {
    return 1n;
  } else { 
    return n*fact(n-1n);
  }
}