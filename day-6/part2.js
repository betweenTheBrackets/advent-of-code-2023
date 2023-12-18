const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const lines = input.split('\n')
    const time = parseInt(lines[0].split(':')[1].replaceAll(' ', ''))
    const distance = parseInt(lines[1].split(':')[1].replaceAll(' ', ''))
    console.log(time, distance)

    let waysToBeatRecord = 0

    for (let i = 0; i < time; i++) {
        const buttonHold = i
        const timeLeft = time - buttonHold
        const result = buttonHold * timeLeft
        const distanceToBeat = distance
        if (result > distanceToBeat) {
            waysToBeatRecord++
        }
    }

    console.log(waysToBeatRecord)
}
