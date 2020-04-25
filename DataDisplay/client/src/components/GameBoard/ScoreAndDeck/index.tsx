import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

import { Score as ScoreType } from '../../../types'

import Deck from './Deck'
import Score from './ScoreBoard'
import Refusals from './Refusals'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            marginBottom: '0.5rem',
        },
        '& > :last-child': {
            marginTop: '0.5rem',
        },
    },
    score: {
        display: 'flex',
    },
})

interface Props {
    score: ScoreType
    deck: boolean[]
    removed: number
    refusals: number
}

const ScoreAndDeck: React.FC<Props> = ({ score, deck, removed, refusals }) => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <div className={classes.score}>
                <Score count={score.fascist} type='fascist' />
                <Deck count={deck.length - removed}/>
                <Score count={score.liberal} type='liberal' />
            </div>
            <Refusals count={refusals}/>
        </div>
    )
}

export default ScoreAndDeck
