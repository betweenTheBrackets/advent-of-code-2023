const fs = require('node:fs')
const readline = require('node:readline')

main()

function main() {
    try {
        const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
        console.log(solvePartOne(input))
        console.log(solvePartTwo(input))
    } catch (error) {
        console.error('Error reading file:', error)
        return []
    }
}

function solvePartOne(input) {
    return input.split('\n').reduce((sum, line) => {
        const firstDigit = line.match(/\d/)[0]
        const lastDigit = line.match(/\d(?=[^\d]*$)/)[0]
        return sum + parseInt(firstDigit + lastDigit, 10)
    }, 0)
}

function solvePartTwo(input) {
    const numberWords = {
        nine: '9',
        eight: '8',
        seven: '7',
        six: '6',
        five: '5',
        four: '4',
        three: '3',
        two: '2',
        one: '1',
        zero: '0',
    }

    const convertLine = (line) => {
        let result = ''
        let i = 0
        while (i < line.length) {
            if (!isNaN(parseInt(line[i], 10))) {
                result += line[i]
                i++
                continue
            }

            let matched = false
            for (const [word, digit] of Object.entries(numberWords)) {
                if (line.startsWith(word, i)) {
                    result += digit
                    matched = true
                    break // To handle overlapping, don't skip characters after the word
                }
            }

            if (!matched) {
                result += line[i]
            }

            i++
        }

        const firstDigit = result.match(/\d/)
        const lastDigit = result.match(/\d(?=[^\d]*$)/)
        return firstDigit && lastDigit ? parseInt(firstDigit[0] + lastDigit[0], 10) : 0
    }

    return input.split('\n').reduce((sum, line) => sum + convertLine(line), 0)
}
