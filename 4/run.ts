import { read } from "../readFile";

const lines = read(4, "input.txt");
let acc = 0;
for (const line of lines) {
  const [first, second] = line.split(",");
  const [min1, max1] = first.split("-").map((n) => Number.parseInt(n));
  const [min2, max2] = second.split("-").map((n) => Number.parseInt(n));

  const sign1 = Math.sign(min2 - min1);
  const sign2 = Math.sign(max2 - max1);

  if (sign1 != sign2 || (sign1 === 0 && sign2 === 0)) acc++;
}
console.log(`Run 1: ${acc}`);
