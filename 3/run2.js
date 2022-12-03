import { read } from "../readFile.js"
import { getPriFromGroups } from "./func.js"

const input = read("input.txt")

let group = []
let groups = []
let i = 0
for (const line of input) {
  group.push(line)
  if ((++i % 3) === 0) {
    groups.push(group)
    group = []
  }
}
if (group.length > 0)
  throw new Error()

let sum = 0
for (const gr of groups) {
  sum += getPriFromGroups(gr)
}

console.log(sum)

