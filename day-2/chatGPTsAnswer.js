const fs = require('node:fs')

main()

function main() {
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const games = parseGameInfo(input)
    console.log('Part One:', partOne(games, 12, 13, 14))
    console.log('Part Two:', partTwo(games))
}

function parseGameInfo(input) {
    return input.split('\n').map((line) => {
        const [gameId, data] = line.split(': ')
        const sets = data.split('; ').map((set) => {
            return set.split(', ').reduce((acc, curr) => {
                const [amount, color] = curr.split(' ')
                acc[color] = Math.max(acc[color] || 0, parseInt(amount))
                return acc
            }, {})
        })
        return { gameId: parseInt(gameId.match(/\d+/)[0]), sets }
    })
}

function partOne(games, red, green, blue) {
    let sumIds = 0
    games.forEach((game) => {
        const isPossible = game.sets.every((set) => {
            return (set.red || 0) <= red && (set.green || 0) <= green && (set.blue || 0) <= blue
        })
        if (isPossible) {
            sumIds += game.gameId
        }
    })
    return sumIds
}

function partTwo(games) {
    let sumPower = 0
    games.forEach((game) => {
        const minCubes = game.sets.reduce(
            (acc, set) => {
                acc.red = Math.max(acc.red, set.red || 0)
                acc.green = Math.max(acc.green, set.green || 0)
                acc.blue = Math.max(acc.blue, set.blue || 0)
                return acc
            },
            { red: 0, green: 0, blue: 0 },
        )
        sumPower += minCubes.red * minCubes.green * minCubes.blue
    })
    return sumPower
}
