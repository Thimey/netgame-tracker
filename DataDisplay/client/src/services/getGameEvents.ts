
const getGameEventsUrl = 'https://5696x3hhg2.execute-api.ap-southeast-2.amazonaws.com/dev/hits-event'

export async function getGameEvents(gameId: string) {
    try {
        const resp = await fetch(`${getGameEventsUrl}?gameId=${gameId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })


        const { events } = await resp.json()

        return events.map((e: any) => e.data)

    } catch (e) {
        console.error(e)

        return []
    }
}
