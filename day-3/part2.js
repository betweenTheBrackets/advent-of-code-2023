const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

    const map = []
    const lines = input.split('\n')

    let row = 0
    for (const line of lines) {
        map.push([])
        map[row].push(...line.split(''))
        row++
    }

    row = 0
    let col = 0
    let gears = {}

    while (row < map.length) {
        let num
        let shouldCountPart = { shouldCount: false }

        while (col < map[row].length) {
            if (!isNaN(map[row][col])) {
                // it's a number - process it
                if (!shouldCountPart.shouldCount) {
                    // once it's set to true, leave it like that
                    // until the number if finished processing
                    shouldCountPart = shouldCountPartNumber(map, row, col)
                }

                if (num !== undefined) {
                    // concatenate existing number we're building up
                    num += map[row][col]
                } else {
                    // start new number
                    num = map[row][col]
                }
            } else {
                if (num !== undefined) {
                    // number complete
                    if (shouldCountPart.shouldCount) {
                        const gearId = `row${shouldCountPart.gearPosition.row}_col${shouldCountPart.gearPosition.col}`
                        if (!gears[gearId]) {
                            gears[gearId] = []
                        }
                        gears[gearId].push(parseInt(num))
                        shouldCountPart = { shouldCount: false }
                    }

                    // reset number
                    num = undefined
                }
            }
            col++
        }

        if (num && shouldCountPart.shouldCount) {
            // grab last item
            const gearId = `row${shouldCountPart.gearPosition.row}_col${shouldCountPart.gearPosition.col}`
            if (!gears[gearId]) {
                gears[gearId] = []
            }
            gears[gearId].push(parseInt(num))
        }

        col = 0
        row++
    }

    const result = Object.keys(gears)
        .filter((key) => gears[key].length === 2)
        .reduce((acc, cur) => acc + gears[cur][0] * gears[cur][1], 0)

    console.log('result', result)
}

function shouldCountPartNumber(map, row, col) {
    const isSpecialCharacter = () =>
        map[curRow] &&
        map[curRow][curCol] &&
        isNaN(map[curRow][curCol]) &&
        map[curRow][curCol] === '*'

    // check clockwise starting with above
    let curRow = row,
        curCol = col

    curRow -= 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curCol += 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curRow += 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curRow += 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curCol -= 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curCol -= 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curRow -= 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    curRow -= 1

    if (isSpecialCharacter()) {
        return { shouldCount: true, gearPosition: { row: curRow, col: curCol } }
    }

    return { shouldCount: false }
}
