import { Player } from './types'

class PlayerStore {
    players: Player[] = []

    addPlayers(players: Player[]) {
        this.players = JSON.parse(JSON.stringify(players))
    }

    getPlayerById(id: string) {
        return this.players.find(player => player.id === id)?.name
    }

    getPlayerByIndex(index: number) {
        return this.players[index].name
    }
}

const instance = new PlayerStore

export default instance
