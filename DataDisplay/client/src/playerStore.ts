import { Player } from './types'

class PlayerStore {
    players: Player[] = []

    currentPresident: Player | null = null

    previousPresident: Player | null = null

    previousChancellor: Player | null = null


    addPlayers(players: Player[]) {
        this.players = JSON.parse(JSON.stringify(players))
    }

    getPlayerById(id: string) {
        return this.players.find(player => player.id === id)
    }

    getPlayerByIndex(index: number) {
        return this.players[index]
    }

    setCurrentPresident(index: number) {
        const player = this.getPlayerByIndex(index)
        this.currentPresident = player
    }

    setPreviousPresident(index: number) {
        const player = this.getPlayerByIndex(index)
        this.previousPresident = player
    }

    setPreviousChancellor(id: string) {
        const player = this.getPlayerById(id)
        this.previousChancellor = player || null
    }
}

const instance = new PlayerStore

export default instance
