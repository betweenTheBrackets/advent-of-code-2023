const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

    const histories = input.split('\n').map((_) => _.split(' ').map((_) => parseInt(_)))
    console.log(histories)

    const predictions = []

    for (let i = 0; i < histories.length; i++) {
        let curHistory = histories[i]
        const stepsFunnel = []
        let steps = []

        do {
            for (let j = 0; j < curHistory.length - 1; j++) {
                const diff = curHistory[j + 1] - curHistory[j]
                steps.push(diff)
            }

            curHistory = steps
            stepsFunnel.push(steps)
            steps = []
        } while (!curHistory.every((_) => _ === 0))

        console.log(stepsFunnel)

        let result = 0

        for (let j = stepsFunnel.length - 1; j >= 0; j--) {
            result += stepsFunnel[j][stepsFunnel[j].length - 1]
        }

        result = result + histories[i][histories[i].length - 1]

        predictions.push(result)
    }

    console.log(predictions)
    console.log(predictions.reduce((acc, cur) => acc + cur))
}
