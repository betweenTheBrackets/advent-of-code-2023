const fs = require('node:fs')

main()

function main() {
    const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    // const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
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

    seeds = sections[0].split(': ')[1].split(' ')

    // const mapsKeys = Object.keys(maps)
    // for (let i = 1; i < mapsKeys.length; i++) {
    //     const [_, ...lines] = sections[i].split('\n')
    //     console.log('got lines for section', mapsKeys[i], lines)
    //     for (let j = 0; j < lines.length; j++) {
    //         const [destinationRangeStart, sourceRangeStart, rangeLength] = lines[j].split(' ')
    //         // console.log(lines[j])
    //         // console.log(destinationRangeStart, sourceRangeStart, rangeLength)
    //         Object.assign(
    //             maps[mapsKeys[i]],
    //             createMap(
    //                 parseInt(destinationRangeStart),
    //                 parseInt(sourceRangeStart),
    //                 parseInt(rangeLength),
    //             ),
    //         )
    //         console.log('finished map for section', mapsKeys[i], maps[mapsKeys[i]])
    //     }
    // }

    Object.keys(maps).forEach((key, index) => {
        maps[key] = sections[index + 1]
            .split('\n')
            .slice(1)
            .map((line) => {
                const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ')
                console.log('processing', key, destinationRangeStart, sourceRangeStart, rangeLength)
                return createMap(
                    parseInt(destinationRangeStart),
                    parseInt(sourceRangeStart),
                    parseInt(rangeLength),
                )
            })
            .reduce((acc, cur) => Object.assign(acc, cur), {})
    })

    console.log('created maps', maps)

    const productionMaps = seeds.map((seed) => createProductionMap(seed, maps))

    console.log('created production maps')

    console.log(
        productionMaps.reduce((acc, cur) => {
            acc = Math.min(acc, cur.humidityToLocation)
            return acc
        }, Infinity),
    )
}

function createMap(destinationRangeStart, sourceRangeStart, rangeLength) {
    const map = {}

    for (let i = 0; i < rangeLength; i++) {
        map[sourceRangeStart + i] = destinationRangeStart + i
    }

    return map
}

function createProductionMap(seed, maps) {
    let curPos = seed
    return Object.keys(maps).reduce((acc, cur) => {
        // console.log(curPos, cur, maps[cur][curPos] || curPos)
        curPos = maps[cur][curPos] || curPos
        acc[cur] = curPos
        return acc
    }, {})
}
