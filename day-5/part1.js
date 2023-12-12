const fs = require('node:fs')

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const sections = input.split('\n\n')
    let seeds = undefined

    const maps = {
        seedsToSoil: {},
        soilToFertilizer: {},
        fertilizerToWater: {},
        waterToLight: {},
        lightToTemperature: {},
        temperatureToHumidity: {},
        humidityToLocation: {},
    }

    seeds = sections[0]
        .split(': ')[1]
        .split(' ')
        .map((seed) => parseInt(seed))

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

    const productionMaps = []

    seeds.forEach((seed) => {
        let curPos = seed
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
            productionMaps.push(productionMap)
        })
    })

    console.log('productionMap', productionMaps)

    console.log(
        'result',
        productionMaps.reduce((acc, cur) => Math.min(acc, cur.humidityToLocation), Infinity),
    )
}
