import { read } from "../readFile";

const lines = read(4, "input.txt");
let acc = 0;
for (const line of lines) {
  const [first, second] = line.split(",");
  const [min1, max1] = first.split("-").map((n) => Number.parseInt(n));
  const [min2, max2] = second.split("-").map((n) => Number.parseInt(n));

  const d1 = min2 - max1;
  const d2 = min1 - max2;

  const sign1 = Math.sign(d1);
  const sign2 = Math.sign(d2);

  if (d1 === 0 || d2 === 0) {
    acc++;
  } else if (sign1 === sign2) {
    acc++;
  }
}
console.log(`Run 2: ${acc}`);
