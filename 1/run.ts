import fs from "fs";
import { read } from "../readFile";

const input = read(1, "input.txt");

const all = [];
let acc = 0;
for (const line of input) {
  const num = Number.parseInt(line);
  if (isNaN(num)) {
    all.push(acc);
    acc = 0;
  } else {
    acc += num;
  }
}
const n = 3;
const sorted = all.sort((a, b) => b - a);

console.log("1: " + sorted.slice(0, n).reduce((a, n) => a + n, 0));
