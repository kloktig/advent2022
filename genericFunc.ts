export function stringAsSet(str: string) {
  return new Set(str.split(""));
}

export function getIntersect<T>(sets: Set<T>[]): T[] {
  let current = sets.pop();
  if (current == undefined) throw new Error();
  let next = sets.pop();
  while (next != undefined) {
    current = new Set([...current].filter((i) => next!!.has(i)));
    next = sets.pop();
  }
  return Array.from(current);
}

export function groupArray<T>(array: T[], n: number) {
  let group = [];
  let groups = [];
  let i = 0;
  for (const element of array) {
    group.push(element);
    if (++i % n === 0) {
      groups.push(group);
      group = [];
    }
  }
  if (group.length > 0) throw new Error();

  return groups;
}
