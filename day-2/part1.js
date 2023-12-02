const fs = require('node:fs')
const readline = require('node:readline')

main()

async function main() {
    // const fileStream = fs.createReadStream(`${__dirname}/sample_input.txt`)
    const fileStream = fs.createReadStream(`${__dirname}/input.txt`)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    let answer = 0

    const maxes = {
        red: 12,
        green: 13,
        blue: 14,
    }

    for await (const line of rl) {
        const [gameIdPart, rest] = line.split(': ')
        const sets = rest.split('; ')
        const gameId = parseInt(gameIdPart.split(' ')[1])
        let isGameValid = true

        for (let i = 0; i < sets.length; i++) {
            const cubes = sets[i].split(', ')

            for (let j = 0; j < cubes.length; j++) {
                const [amount, color] = cubes[j].split(' ')

                if (amount > maxes[color]) {
                    isGameValid = false
                    break
                }
            }

            if (!isGameValid) {
                break
            }
        }

        if (isGameValid) {
            answer += gameId
        }
    }

    console.log(answer)
}
