
export function getProbablityOfAtLeastOneLiberal(totalCards: number, liberalCards: number) {
    const probNoLiberals =
        ( (totalCards - liberalCards) / totalCards) *
        ((totalCards - liberalCards - 1) / (totalCards - 1)) *
        ((totalCards - liberalCards - 2) / (totalCards - 2))

    return Math.floor((1 - probNoLiberals) * 100)
}
