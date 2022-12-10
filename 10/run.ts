import { stat } from "fs";
import { read } from "../readFile";

const data: any = parse(read(10, "input.txt"));
console.log(calculateSum(getRegisterStates()));

function calculateSum(state: number[]) {
  console.log(state);
  let sum = 0;
  for (const n of [20, 60, 100, 140, 180, 220]) {
    sum += state[n - 1] * n;
  }
  return sum;
}

function getRegisterStates() {
  let state = [1];
  let x = 1;
  for (const instruction of data) {
    state.push(x);
    if (instruction.op === "addx") {
      x += instruction.value;
      state.push(x);
    }
  }
  return state;
}

function parse(lines: string[]) {
  const d = [];
  for (const line of lines) {
    const [op, value] = line.split(" ");
    d.push({ op, value: Number.parseInt(value) });
  }
  return d;
}
