import { Player } from './types'

class PlayerStore {
    players: Player[] = []

    addPlayers(players: Player[]) {
        this.players = JSON.parse(JSON.stringify(players))
    }
}

const instance = new PlayerStore

export default instance
