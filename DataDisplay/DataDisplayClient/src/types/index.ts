
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
    id: number
    roundState: RoundState
    board: Board
    deck: Deck
    score: Score
    voteRound: VoteRound
    outcome: Card
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

export interface Deck {
    id: number
    cards: Card[]
}

export interface Score {
    id: number
    fascistCount: number
    liberalCount: number
    refusalCount: number
}

export interface VoteRound {
    id: number
    votes: [Vote, Vote, Vote]
}

export interface Vote {
    id: number
    president: Player | null
    proposedChancellor: Player | null
    ya: Player[]
    nein: Player[]
}

export interface SpecialEvent {
    id: number
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
