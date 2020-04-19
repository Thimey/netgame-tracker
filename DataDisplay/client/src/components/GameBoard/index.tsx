import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import { Player, EventState, isCheckOutcomeEvent } from '../../types'

import PlayerBoard from './PlayerBoard'
import ScoreAndDeck from './ScoreAndDeck'

const useStyles = makeStyles({

})

interface Props {
    players: Player[]
    latestState: EventState
}

const GameBoard: React.FC<Props> = ({ players, latestState }) => {
    const classes = useStyles({})

    const [previousElectedPresident, setPreviousElectedPresident] = useState<number | null>(null)
    const [previousElectedChancellor, setPreviousElectedChancellor] = useState<string | null>(null)

    if (isCheckOutcomeEvent(latestState)) {
        setPreviousElectedPresident(latestState.previous_president)
        setPreviousElectedChancellor(latestState.previous_chancellor)

    }

    const president = latestState.president

    const { deck, removed, num_enacted, refusals} = latestState

    const deckCount = deck.length - removed

    return (
        <div>
            <ScoreAndDeck
                deckCount={deckCount}
                score={num_enacted}
                refusals={refusals}
            />
            <PlayerBoard
                players={players}
                president={president}
                previousElectedPresident={previousElectedPresident}
                previousElectedChancellor={previousElectedChancellor}
            />
        </div>
    )
}

export default GameBoard
