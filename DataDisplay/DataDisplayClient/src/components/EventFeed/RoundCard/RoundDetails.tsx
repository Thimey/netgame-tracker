import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Round } from '../../../types'

import ScoreAndDeck from '../../GameBoard/ScoreAndDeck'

const useStyles = makeStyles({
    container: {

    },

})

interface Props {
    round: Round
}

const RoundDetails: React.FC<Props> = ({
    round: {
        board,
        voteRound,
        deck,
        score,
        outcome,
    }
}) => {
    const classes = useStyles({})

    const roundNumber = score.fascistCount + score.liberalCount + 1
    const refusalCount = voteRound.votes.reduce((count, vote) => vote.ya <= vote.nein ? count + 1 : count, 0)

    return (
        <div className={classes.container}>
            <h2>{`Round ${roundNumber}`}</h2>
            <ScoreAndDeck score={score} deck={deck} refusalCount={refusalCount} />
            <span>{`President: ${board.president}`}</span>
            <span>{`Chancellor: ${board.proposedChancellor}`}</span>
            <span>{`Outcome: ${outcome}`}</span>
        </div>
    )
}

export default RoundDetails
