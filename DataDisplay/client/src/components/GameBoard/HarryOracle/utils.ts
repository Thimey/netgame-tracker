
export function getProbablityOfAtLeastOneLiberal(totalCards: number, liberalCards: number) {
    const probNoLiberals =
        ( (totalCards - liberalCards) / totalCards) *
        ((totalCards - liberalCards - 1) / (totalCards - 1)) *
        ((totalCards - liberalCards - 2) / (totalCards - 2))

    return Math.floor((1 - probNoLiberals) * 100)
}

export const harryQuotes = [
    '"Ella, tell me the liberal count"',
    '"For the Horde!"',
    '"My blade thirsts... for probabilities"',
    '"I’m hungry! For more stats...',
    '"1 :1 tutoring, starting from $70/hr"'
]
