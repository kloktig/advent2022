import {sum} from "../genericFunc";
import {read} from "../readFile";
import {calculate, parse} from "./func";

const tree: any = parse(read(7, "input.txt"));

const [size, solution1] = solve1(tree);
const solution2 = solve2(tree, size, 70000000, 30000000);

console.log(`silver: ${solution1}`);
console.log(`gold: ${solution2}`);

function solve1(tree: any) {
  const arr: number[] = [];
  const size = calculate(tree, arr, (s) => s <= 100000);
  return [size, sum(arr)];
}

function solve2(tree: any, size: number, disk: number, update: number) {
  const tres = size - (disk - update);
  const arr: number[] = [];
  calculate(tree, arr, (s) => s >= tres);
  return Math.min(...arr);
}
