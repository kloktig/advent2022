import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").toString().split("\n");
const s = {};
let acc = 0;
for (const line of input) {
  const [first, second] = line.split(" ");
  console.log(acc);

  if (second == "X") {
  } else if (second == "Y") {
    acc += 3;
  } else if (second == "Z") {
    acc += 6;
  }
  acc += won(first, second);
  console.log(acc);
}

function won(first, second) {
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

console.log(acc);

function getScore(value) {
  if (value == "A") {
    return 1;
  } else if (value == "B") {
    return 2;
  } else if (value == "C") {
    return 3;
  }
}
