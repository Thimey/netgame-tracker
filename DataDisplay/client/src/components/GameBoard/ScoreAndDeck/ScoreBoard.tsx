import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

import { fascistColor, liberalColor } from '../../../constants'

const ROUNDS_TO_WIN_FOR_LIBERAL = 5
const ROUNDS_TO_WIN_FOR_FASCIST = 6

const useStyles = makeStyles({
    scoreContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    scoreCircle: {
        width: '14px',
        height: '14px',
        border: '1px solid black',
        borderRadius: '50%',
        backgroundColor: 'grey',
        margin: '1px',
    },
    fascistWin: {
        backgroundColor: fascistColor,
    },
    liberalWin: {
        backgroundColor: liberalColor,
    }
})

interface Props {
    count: number
    type: 'fascist' | 'liberal'
}

const ScoreBoard: React.FC<Props> = ({ count, type }) => {
    const classes = useStyles({})

    return (
        <div className={classes.scoreContainer}>
            {
                type === 'liberal'
                    ? (
                        Array(ROUNDS_TO_WIN_FOR_LIBERAL).fill(null).map((_, index) => {
                            if (index >= ROUNDS_TO_WIN_FOR_LIBERAL - count) {
                                return (
                                    <div className={classnames(classes.scoreCircle, classes.liberalWin)}/>
                                )
                            }

                            return (
                                <div className={classes.scoreCircle}/>
                            )
                        })
                    )
                    : (
                        Array(ROUNDS_TO_WIN_FOR_FASCIST).fill(null).map((_, index) => {
                            if (index < count) {
                                return (
                                    <div className={classnames(classes.scoreCircle, classes.fascistWin)}/>
                                )
                            }

                            return (
                                <div className={classes.scoreCircle}/>
                            )
                        })
                    )

            }
        </div>
    )
}

export default ScoreBoard
