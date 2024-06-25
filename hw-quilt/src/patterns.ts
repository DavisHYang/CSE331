import { Quilt, qnil, Square, rnil, qcons, rcons, Color} from './quilt';


/** Returns a quilt in pattern "A". */
export const PatternA = (rows : bigint, c? : Color): Quilt => {
  if(rows < 0) {
    throw new Error("Invalid number of rows");
  }
  if(rows === 0n) {
    return qnil;
  }
  const col : Color = typeof(c) === 'undefined' ? "GREEN" : c;
  const sc : Square = {shape: "ROUND", color: col, corner: "NE"};
  return qcons(rcons(sc,rcons(sc, rnil)), PatternA(rows-1n, c));
}
/** Returns a quilt in pattern "B". */
export const PatternB = (rows : bigint, c? : Color): Quilt => {
  if(rows < 0) {
    throw new Error("Invalid number of rows");
  }
  if(rows === 0n) {
    return qnil;
  }
  const col : Color = typeof(c) === 'undefined' ? "GREEN" : c;
  const sc : Square = {shape: "STRAIGHT", color: col, corner: "NE"};
  const tc : Square = {shape: "STRAIGHT", color: col, corner: "SW"};
  return qcons(rcons(sc, rcons(tc, rnil)), PatternB(rows-1n, c));
}

/** Returns a quilt in pattern "C". */
export const PatternC = (rows : bigint, c? : Color): Quilt => {
  if(rows < 0 || rows % 2n !== 0n) {
    throw new Error("Invalid number of rows");
  }
  if(rows === 0n) {
    return qnil;
  }
  const col : Color = typeof(c) === 'undefined' ? "GREEN" : c;
  const sc : Square = {shape: "ROUND", color: col, corner: "SE"};
  const tc : Square = {shape: "ROUND", color: col, corner: "SW"};
  const uc : Square = {shape: "ROUND", color: col, corner: "NE"};
  const vc : Square = {shape: "ROUND", color: col, corner: "NW"};
  return qcons(rcons(sc, rcons(tc, rnil)), 
                qcons(rcons(uc, rcons(vc,rnil)),
                PatternC(rows-2n,c)));
}

/** Returns a quilt in pattern "D". */
export const PatternD = (rows : bigint, c? : Color): Quilt => {
  if(rows < 0 || rows % 2n !== 0n) {
    throw new Error("Invalid number of rows");
  }
  if(rows === 0n) {
    return qnil;
  }
  const col : Color = typeof(c) === 'undefined' ? "GREEN" : c;
  const sc : Square = {shape: "ROUND", color: col, corner: "NW"};
  const tc : Square = {shape: "ROUND", color: col, corner: "NE"};
  const uc : Square = {shape: "ROUND", color: col, corner: "SW"};
  const vc : Square = {shape: "ROUND", color: col, corner: "SE"};
  return qcons(rcons(sc, rcons(tc, rnil)), 
                qcons(rcons(uc, rcons(vc, rnil)),
                PatternD(rows-2n,c)));
}

/** Returns a quilt in pattern "E". */
export const PatternE = (rows : bigint, c? : Color): Quilt => {
  if(rows < 0) {
    throw new Error("Invalid number of rows");
  }
  if(rows === 0n) {
    return qnil;
  }
  const col : Color = typeof(c) === 'undefined' ? "GREEN" : c;
  const sc : Square = {shape: "STRAIGHT", color: col, corner: "NE"};
  const tc : Square = {shape: "STRAIGHT", color: col, corner: "SW"};
  const uc : Square = {shape: "STRAIGHT", color: col, corner: "SE"};
  const vc : Square = {shape: "STRAIGHT", color: col, corner: "NW"};
  if(rows === 1n) {
    return qcons(rcons(sc, rcons(tc, rnil)), qnil);
  }
  return qcons(rcons(sc, rcons(tc, rnil)), 
                qcons(rcons(uc, rcons(vc, rnil)),
                PatternE(rows-2n,c)));
}