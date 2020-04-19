import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Score as ScoreType } from '../../../types'

import Deck from './Deck'
import Score from './ScoreBoard'
import Refusals from './Refusals'

const useStyles = makeStyles({
    container: {
        display: 'flex',
    },
    deckAndRefusals: {
        display: 'flex',
        flexDirection: 'column',
    }
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
            <Score count={score.fascist} type='fascist' />
            <div>
                <Deck count={deck.length - removed}/>
                <Refusals count={refusals}/>
            </div>
            <Score count={score.liberal} type='liberal' />
        </div>
    )
}

export default ScoreAndDeck
