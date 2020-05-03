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

export interface InvestigationState extends EventState {
    to_investigate: string
}

export interface ExecutionState extends EventState {
    to_execute: string
}

export interface SpecialElection extends EventState {
    next_president: number
}

export interface isPolicyPeekEvent extends EventState {}

export function isInvestigationEvent(event: EventState): event is InvestigationState {
    return event.phase === 'investigation_result' && !!(event as InvestigationState).to_investigate
}

export function isExecutionEvent(event: EventState): event is ExecutionState {
    return event.phase === 'execution_result' && !!(event as ExecutionState).to_execute
}

export function isSpecialElectionEvent(event: EventState): event is SpecialElection {
    return !!(event as SpecialElection).next_president
}

export function isPolicyPeekEvent(event: EventState): event is isPolicyPeekEvent {
    return event.phase === 'policy_peek'
}

export interface Player {
    id: string
    name: string
}

export interface Game {
    id: number
    startTime: string
    endTime: string
    events: Round[]
}

export type Round = EventState[]

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
