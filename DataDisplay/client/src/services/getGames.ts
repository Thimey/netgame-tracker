
import { api } from './api'

const getGamesUrl = `${api}/hits-games`

export interface Game {
    gameId: string
    timestamp: number
}

export async function getGames(): Promise<Game[]> {
    try {
        const resp = await fetch(getGamesUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })

        const { events } = await resp.json()

        return events

    } catch (e) {
        console.error(e)

        return []
    }
}
