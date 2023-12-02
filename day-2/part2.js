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

    for await (const line of rl) {
        const [, rest] = line.split(': ')
        const sets = rest.split('; ')
        const amounts = {
            red: 0,
            green: 0,
            blue: 0,
        }

        for (let i = 0; i < sets.length; i++) {
            const cubes = sets[i].split(', ')

            for (let j = 0; j < cubes.length; j++) {
                let [amount, color] = cubes[j].split(' ')
                amount = parseInt(amount)

                if (amount > amounts[color]) {
                    amounts[color] = amount
                }
            }
        }

        // don't allow 0 to be multiplied below
        amounts.red = Math.max(1, amounts.red)
        amounts.green = Math.max(1, amounts.green)
        amounts.blue = Math.max(1, amounts.blue)

        answer += amounts.red * amounts.green * amounts.blue
    }

    console.log(answer)
}
