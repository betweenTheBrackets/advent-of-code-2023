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
    let result = 0

    while (row < map.length) {
        let num
        let shouldCount = false

        while (col < map[row].length) {
            // console.log(map[row][col], shouldCount)
            if (!isNaN(map[row][col])) {
                // it's a number - process it
                if (!shouldCount) {
                    // once it's set to true, leave it like that
                    // until the number if finished processing
                    shouldCount = shouldCountPartNumber(map, row, col)
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
                    if (shouldCount) {
                        // console.log('shouldCount is true', num)
                        result += parseInt(num)
                        shouldCount = false
                    }

                    // reset number
                    num = undefined
                }
            }
            col++
            // console.log()
        }

        if (num && shouldCount) {
            // grab last item
            // console.log('shouldCount is true', num)
            result += parseInt(num)
        }

        col = 0
        row++
    }

    console.log('result', result)
}

function shouldCountPartNumber(map, row, col) {
    const isSpecialCharacter = () =>
        map[curRow] &&
        map[curRow][curCol] &&
        isNaN(map[curRow][curCol]) &&
        map[curRow][curCol] !== '.'

    // check clockwise starting with above
    let curRow = row,
        curCol = col

    curRow -= 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curCol += 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curRow += 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curRow += 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curCol -= 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curCol -= 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curRow -= 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    curRow -= 1

    // console.log('shouldCount', map[curRow] && map[curRow][curCol])

    if (isSpecialCharacter()) {
        return true
    }

    return false
}
