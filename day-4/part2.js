const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

    const scratchCards = []

    const result = input.split('\n').forEach((card, index) => {
        if (!scratchCards[index]) {
            scratchCards[index] = 1
        } else {
            scratchCards[index]++
        }

        const [, rest] = card.split(': ')
        const [winningNumbersText, yourNumbersText] = rest.split(' | ')
        const winningNumbers = winningNumbersText
            .split(' ')
            .map((_) => _.trim())
            .filter((_) => _ !== '')

        const yourNumbers = yourNumbersText
            .split(' ')
            .map((_) => _.trim())
            .filter((_) => _ !== '')

        const matches = yourNumbers.filter((yourNumber) => winningNumbers.includes(yourNumber))

        for (let i = 1; i <= matches.length; i++) {
            if (!scratchCards[index + i]) {
                scratchCards[index + i] = scratchCards[index]
            } else {
                scratchCards[index + i] += scratchCards[index]
            }
        }
    })

    console.log(scratchCards.reduce((acc, cur) => acc + cur))
}
