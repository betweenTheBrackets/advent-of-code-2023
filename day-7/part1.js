const fs = require('node:fs')

const handTypes = {
    highCard: 'highCard',
    pair: 'pair',
    twoPairs: 'twoPairs',
    threeOfAKind: 'threeOfAKind',
    fullHouse: 'fullHouse',
    fourOfAKind: 'fourOfAKind',
    fiveOfAKind: 'fiveOfAKind',
}

const handTypePower = {
    highCard: 0,
    pair: 1,
    twoPairs: 2,
    threeOfAKind: 3,
    fullHouse: 4,
    fourOfAKind: 5,
    fiveOfAKind: 6,
}

const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
}

const analyzeHand = (hand) => {
    let counts = {}
    for (let card of hand) {
        counts[card] = (counts[card] || 0) + 1
    }

    let pairs = 0
    let threeOfAKind = false
    let fourOfAKind = false
    let fiveOfAKind = false

    for (let card in counts) {
        if (counts[card] === 2) pairs++
        if (counts[card] === 3) threeOfAKind = true
        if (counts[card] === 4) fourOfAKind = true
        if (counts[card] === 5) fiveOfAKind = true
    }

    if (fiveOfAKind) return handTypes.fiveOfAKind
    if (fourOfAKind) return handTypes.fourOfAKind
    if (threeOfAKind && pairs === 1) return handTypes.fullHouse
    if (threeOfAKind) return handTypes.threeOfAKind
    if (pairs === 2) return handTypes.twoPairs
    if (pairs === 1) return handTypes.pair
    return handTypes.highCard
}

const sortByHand = (a, b) => {
    if (handTypePower[a.handType] < handTypePower[b.handType]) {
        return -1
    } else if (handTypePower[a.handType] > handTypePower[b.handType]) {
        return 1
    } else {
        // check which one is higher based on items
        for (let i = 0; i < 5; i++) {
            if (cardValues[a.hand[i]] < cardValues[b.hand[i]]) {
                return -1
            } else if (cardValues[a.hand[i]] > cardValues[b.hand[i]]) {
                return 1
            }
        }
    }

    return 0
}

main()

function main() {
    // const input = fs.readFileSync(__dirname + '/sample_input.txt', 'utf8')
    const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')
    const items = input.split('\n').map((_) => {
        const [hand, bid] = _.split(' ')
        return { hand, bid: parseInt(bid) }
    })

    for (let item of items) {
        const handType = analyzeHand(item.hand)
        item.handType = handType
    }

    items.sort(sortByHand)
    const totalWinnings = items.reduce((acc, cur, index) => acc + cur.bid * (index + 1), 0)
    console.log('totalWinnings', totalWinnings)
}
