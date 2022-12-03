import { read } from "../readFile";
import { getPriFromGroups } from "./func";
import { groupArray } from "../genericFunc";

const input = read(3, "input.txt");
const groups = groupArray(input, 3);

let sum = 0;
for (const gr of groups) {
  sum += getPriFromGroups(gr);
}

console.log("Run 2: " + sum);
