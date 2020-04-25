import React from 'react'
import { makeStyles } from '@material-ui/styles'
import classnames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { EventState, Round } from '../../../types'
import { fascistColor, liberalColor } from '../../../constants'
import playerStore from '../../../playerStore'


import ScoreAndDeck from '../../GameBoard/ScoreAndDeck'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        flex: 1,
        '& > :first-child': {
            marginBottom: '1rem',
        }
    },
    libResult: {
        color: liberalColor,
    },
    facResult: {
        color: fascistColor,
    },
    voteDetails: {
        padding: '0.5rem',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        marginTop: 'auto',
    }

})

interface Props {
    round: Round
}

const RoundDetails: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    const getRoundDetails = () => {
        const lastEvent = round && round[round.length - 1]
        const hasOutcome = lastEvent && lastEvent.phase === 'missionOutcome'

        if (hasOutcome) {
            const {
                num_enacted,
                refusals,
                last_enacted,
                president: presidentIndex,
                chancellor: chancellorId,
                deck,
                removed,
            } = lastEvent

            const president = playerStore.getPlayerByIndex(presidentIndex)
            const proposedChancellor = chancellorId && playerStore.getPlayerById(chancellorId)

            return (
                <>
                    <ScoreAndDeck score={num_enacted} deck={deck} removed={removed} refusals={refusals} />

                    <Paper variant='outlined' className={classes.voteDetails}>
                        <Typography>{`President: ${president ? president.name : '-'}`}</Typography>
                        <Typography>{`Chancellor: ${proposedChancellor ? proposedChancellor.name : '-'}`}</Typography>
                        <Typography className={classnames({
                            [classes.libResult]: last_enacted,
                            [classes.facResult]: !last_enacted,
                        })}>{`Outcome: ${last_enacted ? 'Liberal' : 'Fascist'}`}</Typography>
                    </Paper>
                </>
            )
        }

        return (
            <Typography>
                Round incomplete...
            </Typography>
        )

    }

    const roundNumber = round[0].num_enacted.fascist + round[0].num_enacted.liberal + 1

    return (
        <div className={classes.container}>
            <Typography variant='h5'>{`Round ${roundNumber}`}</Typography>
            {getRoundDetails()}
        </div>
    )
}

export default RoundDetails
