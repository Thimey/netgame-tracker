/*
    Collect each vote and the state of the board

    gameState {
        boardState: {
            fascistCount: number
            liberalCount: number
            refusalsCount: number
            deckState: (liberal | fascist)[]
        }
        
        timestamp: number
    }
    
    
    {
        type: Vote
        outcome: success | failure
        president: {
            id: string
            name: string
        }
        proposedChancellor: {
            id: string
            name: string
        }
        previousPresident: {
            id: string
            name: string
        } | null
        previousChancellor: {
            id: string
            name: string
        } | null
        votes: {
            for: {
                id: string
                name: string
            }[]
            against: {
                id: string
                name: string
            }[]
        }
    }

    {
        type: PresidentAct
        sees: (liberal | fascist, liberal | fascist, liberal | fascist)
        discards: index
    }

    {
        type: ChancellorEnacts
        sees: (liberal | fascist, liberal | fascist, liberal | fascist)
        enacts: index
    }

    Events
    Investigate,
    look at top 3,
    choose next president,
    kill


    Game meta data
    {
        gameId: 
        players: {}[] (seat order)

    }

*/