export interface GameState {
    events: GameEvent[]
}

export interface GameEvent {
    id: string
    game_id: string
    players: Player[]
    clock: {
        server: number
        [key: string]: number
    }
    state: EventState
    last_modified: number
    client_timestamp: number
    server_timestamp: number
    created: number
}

export type EventState = BaseEventState | CheckOutcomeEventState

export interface BaseEventState {
    phase: GamePhase
    previous_phase: GamePhase
    num_enacted: Score
    deck: boolean[]
    removed: number
    president: number
    refusals: number
    hitler: string
    allegiance: {
        [key: string]: boolean
    }
    executed: {
        [key: string]: boolean
    }
    chancellor: string
    votes: {
        [key: string]: boolean
    }
    ready: boolean
}

export interface CheckOutcomeEventState extends BaseEventState {
    previous_president: number
    previous_chancellor: string
    last_enacted: boolean
    to_enact: number
}

export const isCheckOutcomeState = (state: BaseEventState | CheckOutcomeEventState): state is CheckOutcomeEventState => {
    if (!state) {
        return false
    }

    return (
        !!(state as CheckOutcomeEventState).to_enact
    )
}

export type GamePhase =  'missionOutcome' | 'failedVote'


export interface Player {
    id: string
    name: string
}

export interface Game {
    id: number
    startTime: string
    endTime: string
    events: (Round | SpecialEvent)[]
}

export interface Round {
    votes: BaseEventState[]
    outcome: CheckOutcomeEventState
}

enum RoundState {
    Voting = 'VOTING',
    ResolvingMission = 'RESOLVING_MISSION',
    Complete = 'COMPLETE',
}

export interface Board {
    id: number
    president: Player
    proposedChancellor: Player
    previousPresident: Player
    previousChancellor: Player
    executed: Player[]
}

export type Card = 'liberal' | 'fascist'

export interface Score {
    liberal: number
    fascist: number
}

export interface VoteRound {
    votes: [Vote, Vote, Vote]
}

export interface Vote {
    president: Player | null
    proposedChancellor: Player | null
    ya: Player[]
    nein: Player[]
}

export interface SpecialEvent {
    event: ExecutionEvent | InvestigateEvent | SpecialElection | LookAtNextThreeCards
}

export interface ExecutionEvent {
    president: Player
    executed: Player
}

export interface InvestigateEvent {
    president: Player
    investigated: Player
}

export interface SpecialElection {
    president: Player
    specialPresident: Player
}

export interface LookAtNextThreeCards {
    president: Player
}
