import { read } from "../readFile";

const input = read(2, "input.txt");
const s = {};
let acc = 0;
for (const line of input) {
  const [first, second] = line.split(" ");

  if (second == "X") {
  } else if (second == "Y") {
    acc += 3;
  } else if (second == "Z") {
    acc += 6;
  }
  acc += won(first, second);
}

function won(first: string, second: string) {
  if (
    (first == "A" && second == "Y") ||
    (first == "B" && second == "X") ||
    (first == "C" && second == "Z")
  ) {
    return 1;
  } else if (
    (first == "A" && second == "Z") ||
    (first == "B" && second == "Y") ||
    (first == "C" && second == "X")
  ) {
    return 2;
  } else {
    return 3;
  }
}

console.log("2: " + acc);
