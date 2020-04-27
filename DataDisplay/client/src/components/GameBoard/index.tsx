import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'

import playerStore from '../../playerStore'

import { Player, EventState } from '../../types'

import HarryOracle from './HarryOracle'
import PlayerBoard from './PlayerBoard'
import ScoreAndDeck from './ScoreAndDeck'

const useStyles = makeStyles({
    container: {
        padding: '1rem',
        '& > *': {
            marginBottom: '1rem',
        }
    }
})

interface Props {
    latestState: EventState
}

const GameBoard: React.FC<Props> = ({ latestState }) => {
    const classes = useStyles({})

    if (latestState.phase === 'missionOutcome') {
        playerStore.setPreviousPresident(latestState.previous_president)
        playerStore.setPreviousChancellor(latestState.previous_chancellor)
    }

    const { deck, removed, num_enacted, refusals} = latestState

    return (
        <Paper className={classes.container}>
            <HarryOracle deckCount={deck.length - removed}/>
            <ScoreAndDeck
                deck={deck}
                removed={removed}
                score={num_enacted}
                refusals={refusals}
            />
            <PlayerBoard
                president={playerStore.currentPresident}
                previousElectedPresident={playerStore.previousPresident}
                previousElectedChancellor={playerStore.previousChancellor}
            />
        </Paper>
    )
}

export default GameBoard
