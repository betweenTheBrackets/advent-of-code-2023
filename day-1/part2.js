const fs = require('node:fs')
const readline = require('node:readline')

main()

/**
 * example input:
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 */
async function main() {
    const fileStream = fs.createReadStream('input.txt')

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/gm

    const numbersMap = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
    }

    const numbersToSum = []

    for await (const line of rl) {
        // digits are chars so we can concatenate them easily
        let digit1, digit2

        const matches = line.matchAll(regex)

        for (const match of matches) {
            if (!digit1 && !digit2) {
                digit1 = digit2 = numbersMap[match[1]]
            } else {
                digit2 = numbersMap[match[1]]
            }
        }

        // console.log(digit1 + digit2, line)

        // concatenate digits into a double digit and convert it to a number
        numbersToSum.push(Number(digit1 + digit2))
    }

    console.log(numbersToSum.reduce((acc, cur) => acc + cur, 0))
}
