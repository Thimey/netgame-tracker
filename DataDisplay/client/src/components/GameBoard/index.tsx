import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'


import { Player, EventState } from '../../types'

import PlayerBoard from './PlayerBoard'
import ScoreAndDeck from './ScoreAndDeck'

const useStyles = makeStyles({
    container: {
        padding: '1rem',
    }
})

interface Props {
    latestState: EventState
}

const GameBoard: React.FC<Props> = ({ latestState }) => {
    const classes = useStyles({})

    const [previousElectedPresident, setPreviousElectedPresident] = useState<number | null>(null)
    const [previousElectedChancellor, setPreviousElectedChancellor] = useState<string | null>(null)

    // if (latestState.phase === 'missionOutcome') {
    //     setPreviousElectedPresident(latestState.previous_president)
    //     setPreviousElectedChancellor(latestState.previous_chancellor)

    // }

    const president = latestState.president

    const { deck, removed, num_enacted, refusals} = latestState

    return (
        <Paper className={classes.container}>
            <ScoreAndDeck
                deck={deck}
                removed={removed}
                score={num_enacted}
                refusals={refusals}
            />
            <PlayerBoard
                president={president}
                previousElectedPresident={previousElectedPresident}
                previousElectedChancellor={previousElectedChancellor}
            />
        </Paper>
    )
}

export default GameBoard
