import { read } from "../readFile";
const input = read(2, "input.txt");

let acc = 0;
for (const line of input) {
  const [first, second] = line.split(" ");

  if (second == "X") {
    acc += 1;
  } else if (second == "Y") {
    acc += 2;
  } else if (second == "Z") {
    acc += 3;
  }
  acc += won(first, second);
}

function won(first: string, second: string) {
  if (
    (first == "A" && second == "X") ||
    (first == "B" && second == "Y") ||
    (first == "C" && second == "Z")
  ) {
    return 3;
  } else if (
    (first == "A" && second == "Y") ||
    (first == "B" && second == "Z") ||
    (first == "C" && second == "X")
  ) {
    return 6;
  } else {
    return 0;
  }
}

console.log("1: " + acc);
