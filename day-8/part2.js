const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input2.txt', 'utf8')
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

    const curNodes = Object.keys(map).filter((_) => _.endsWith('A'))
    console.log('starting nodes', curNodes)
    const allSteps = []

    curNodes.forEach((node) => {
        let curInstructionIndex = 0
        let steps = 0
        let curNode = node

        while (!curNode.endsWith('Z')) {
            // console.log('curNodes', curNodes, 'instruction', instructions[curInstructionIndex])
            curNode = map[curNode][instructions[curInstructionIndex]]
            curInstructionIndex++
            steps++

            if (curInstructionIndex >= instructions.length) {
                curInstructionIndex = 0
            }
        }

        console.log('node', node, 'steps', steps)
        allSteps.push(steps)
    })

    console.log(lcm(allSteps))
}

// thanks, ChatGPT
function gcd(a, b) {
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

function lcmOfTwo(a, b) {
    return Math.abs(a * b) / gcd(a, b)
}

function lcm(array) {
    let currentLcm = array[0]
    for (let i = 1; i < array.length; i++) {
        currentLcm = lcmOfTwo(currentLcm, array[i])
    }
    return currentLcm
}
