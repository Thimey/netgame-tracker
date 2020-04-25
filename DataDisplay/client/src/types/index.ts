export interface GameState {
    events: GameEvent[]
}

export interface GameEvent {
    id: string
    created: number
    game_id: string
    players: Player[]
    clock: {
        server: number
        [key: string]: number
    }
    state: EventState
    last_modified: number
}

export interface EventState {
    phase: string
    previous_president: number
    previous_chancellor: string
    last_enacted: boolean
    deck: boolean[]
    refusals: number
    previous_phase: string
    allegiance: {
        [key: string]: boolean
    }
    executed: {
        [key: string]: boolean
    }
    vote_pass: boolean
    hitler: string
    chancellor: string | null
    removed: number
    ready: boolean
    num_enacted: Score
    president: number
    votes: {
        [key: string]: boolean
    }
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
    votes: EventState[]
    outcome: EventState
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
