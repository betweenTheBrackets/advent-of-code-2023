const fs = require('node:fs')
const readline = require('node:readline')

main()

/**
 * example input:
 * 1abc2 -> 12
 * pqr3stu8vwx -> 38
 * a1b2c3d4e5f -> 15
 * treb7uchet -> 77
 */
async function main() {
    const fileStream = fs.createReadStream('input.txt')

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const numbers = []

    for await (const line of rl) {
        // digits are chars so we can concatenate them easily
        let digit1, digit2

        for (const char of line) {
            if (isNaN(char) === false) {
                if (!digit1 && !digit2) {
                    digit1 = digit2 = char
                } else {
                    digit2 = char
                }
            }
        }

        // concatenate digits into a double digit and convert it to a number
        numbers.push(Number(digit1 + digit2))
    }

    console.log(numbers.reduce((acc, cur) => acc + cur, 0))
}
