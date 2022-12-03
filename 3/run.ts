import { read } from "../readFile";
import { getAllPri } from "./func";

const lines = read(3, "input.txt");
console.log("Run 1: " + getAllPri(lines));
