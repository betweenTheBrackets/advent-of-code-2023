const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

    const result = input
        .split('\n')
        .map((card) => {
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

            return yourNumbers.filter((yourNumber) => winningNumbers.includes(yourNumber))
        })
        .map((matches) => {
            return matches.reduce((acc) => (acc === 0 ? 1 : acc * 2), 0)
        })
        .reduce((acc, cur) => acc + cur, 0)

    console.log(result)
}
