import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").toString().split("\n");

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
console.log(sorted.slice(0, n).reduce((a, n) => a + n, 0));
