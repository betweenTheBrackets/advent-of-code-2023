const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const sections = input.split('\n\n')
    let seeds = [],
        seedsInput = undefined

    const maps = {
        seedsToSoil: {},
        soilToFertilizer: {},
        fertilizerToWater: {},
        waterToLight: {},
        lightToTemperature: {},
        temperatureToHumidity: {},
        humidityToLocation: {},
    }

    seedsInput = sections[0]
        .split(': ')[1]
        .split(' ')
        .map((seed) => parseInt(seed))

    // pairs of seeds are now ranges
    for (let i = 0; i < seedsInput.length; i += 2) {
        const start = seedsInput[i]
        const range = seedsInput[i + 1]
        seeds.push([start, range])
    }

    console.log('seeds', seeds)

    Object.keys(maps).forEach((key, index) => {
        maps[key] = sections[index + 1]
            .split('\n')
            .slice(1)
            .map((line) => {
                const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ')
                console.log('processing', key, destinationRangeStart, sourceRangeStart, rangeLength)
                return {
                    from: parseInt(sourceRangeStart),
                    to: parseInt(sourceRangeStart) + parseInt(rangeLength) - 1,
                    valueStart: parseInt(destinationRangeStart),
                }
            })
    })

    // console.log('created maps', maps)

    let result = Infinity

    seeds.forEach(([start, range]) => {
        // console.log('start', start, 'range', range)
        for (let i = start; i < start + range; i++) {
            // console.log('processing seed', i)
            let curPos = i
            const productionMap = {}

            Object.keys(maps).forEach((key) => {
                const found = maps[key].find((map) => map.from <= curPos && curPos <= map.to)
                // console.log('found', found)

                if (!found) {
                    productionMap[key] = curPos
                } else {
                    productionMap[key] = curPos - found.from + found.valueStart
                }

                curPos = productionMap[key]
            })

            result = Math.min(result, productionMap.humidityToLocation)
        }
    })

    console.log('result', result)
}
