import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

const ROUNDS_TO_WIN = 5

const useStyles = makeStyles({
    scoreContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    scoreCircle: {
        width: '10px',
        height: '10px',
        border: '1px solid black',
        borderRadius: '50%',
        backgroundColor: 'grey',
        margin: '1px',
    },
    fascistWin: {
        backgroundColor: 'red',
    },
    liberalWin: {
        backgroundColor: 'blue',
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
                        Array(ROUNDS_TO_WIN).fill(null).map((_, index) => {
                            if (index >= ROUNDS_TO_WIN - count) {
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
                        Array(ROUNDS_TO_WIN).fill(null).map((_, index) => {
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
