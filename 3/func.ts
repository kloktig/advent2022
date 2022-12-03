import { stringAsSet, getIntersect } from "../genericFunc";

export function getAllPri(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    const len = line.length;
    const comp1 = line.substring(0, len / 2);
    const comp2 = line.substring(len / 2);
    sum += getPri(getIntersect([stringAsSet(comp1), stringAsSet(comp2)]));
  }
  return sum;
}

export function getPriFromGroups(lines: string[]) {
  const sets = [];
  for (const line of lines) {
    sets.push(stringAsSet(line));
  }
  return getPri(getIntersect(sets));
}

function getPri(intersect: string[]) {
  let v = intersect.toString().charCodeAt(0) - 96;
  if (v < 0) v = v + 58;
  return v;
}
