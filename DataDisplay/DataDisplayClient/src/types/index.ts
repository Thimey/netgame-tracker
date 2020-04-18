
export interface Player {
    id: number
    name: string
}

export interface Game {
    events: (Round | SpecialEvent)[]
}

export interface Round {
    id: number
    board: Board
    deck: Deck
    score: Score
    voteRound: VoteRound
    outcome: Card
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
    president: Player
    proposedChancellor: Player
    for: Player[]
    against: Player[]
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
