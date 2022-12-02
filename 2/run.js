import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").toString().split("\n");
const s = {};
let acc = 0;
for (const line of input) {
  const [first, second] = line.split(" ");
  console.log(acc);

  if (second == "X") {
    acc += 1;
  } else if (second == "Y") {
    acc += 2;
  } else if (second == "Z") {
    acc += 3;
  }
  console.log(acc);
  acc += won(first, second);
}

function won(first, second) {
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

console.log(acc);
