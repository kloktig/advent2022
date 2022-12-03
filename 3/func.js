
export function getAllPri(lines) {
    let sum = 0
    for (const line of lines) {
        const len = line.length;
        const comp1 = line.substring(0, len / 2)
        const comp2 = line.substring(len / 2)
        const set1 = new Set(comp1.split(''))
        const set2 = new Set(comp2.split(''))
        const intersect = Array.from(new Set([...set1].filter(i => set2.has(i))))
        sum += getPri(intersect)
    }
    return sum;
}

export function getPriFromGroups(lines) {
    const sets = []
    for (const line of lines) {
        sets.push(new Set(line.split('')))
    }

    let current = sets.pop()
    let next = sets.pop()
    while (next != undefined) {
        current = new Set([...current].filter(i => next.has(i)))
        next = sets.pop()
    }
    return getPri(Array.from(current));
}

function getPri(intersect) {
    let v = intersect.toString().charCodeAt(0) - 96
    if (v < 0)
        v = v + 58
    return v
}