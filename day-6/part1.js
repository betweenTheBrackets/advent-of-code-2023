const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const lines = input.split('\n')
    const times = [...lines[0].matchAll(/\d+/g)].map((time) => parseInt(time[0]))
    const distances = [...lines[1].matchAll(/\d+/g)].map((distance) => parseInt(distance[0]))
    console.log(times, distances)

    const records = []

    times.forEach((time, timeIndex) => {
        let waysToBeatRecord = 0

        for (let i = 0; i < time; i++) {
            const buttonHold = i
            const timeLeft = time - buttonHold
            const result = buttonHold * timeLeft
            const distanceToBeat = distances[timeIndex]
            if (result > distanceToBeat) {
                waysToBeatRecord++
            }
        }

        if (waysToBeatRecord > 0) {
            records.push(waysToBeatRecord)
        }
    })

    console.log(records)

    let result = 0
    if (records.length) {
        result = records.reduce((acc, cur) => acc * cur, 1)
    }
    console.log(result)
}
