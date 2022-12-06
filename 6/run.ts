import { read } from "../readFile";

let input = read(6, "input.txt")[0];

function calculate(input: string, startNum: number) {
  const t0 = performance.now();

  let i;
  let ok = false;
  for (i = 0; i < input.length - startNum; i++) {
    const str = input.substring(i, i + startNum);
    const arr = Array.from(str);
    let letter = arr.pop();
    while (letter) {
      if (arr.indexOf(letter) != -1) {
        break;
      } else {
        ok = arr.length === 0;
        letter = arr.pop();
      }
    }
    if (ok) {
      break;
    }
  }
  if (ok) return { result: i + startNum, time: performance.now() - t0 };
  else throw new Error();
}
const s1 = calculate(input, 4);
console.log(`silver: ${s1.result} in ${s1.time.toFixed()} ms`);

const s2 = calculate(input, 14);
console.log(`gold: ${s2.result} in ${s2.time.toFixed()} ms`);
