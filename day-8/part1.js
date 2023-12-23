const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

    const [instructions, mapInput] = input.split('\n\n')

    const map = mapInput.split('\n').reduce((acc, cur) => {
        const [node, leftRight] = cur.split(' = ')
        const left = leftRight.substring(1, 4)
        const right = leftRight.substring(6, 9)
        acc[node] = {}
        acc[node]['L'] = left
        acc[node]['R'] = right

        return acc
    }, {})
    console.log(map)

    let curNode = 'AAA'
    let curInstructionIndex = 0
    let steps = 0
    while (curNode !== 'ZZZ') {
        curNode = map[curNode][instructions[curInstructionIndex]]
        curInstructionIndex++
        steps++

        if (curInstructionIndex >= instructions.length) {
            curInstructionIndex = 0
        }
    }

    console.log(steps)
}
