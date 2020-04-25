import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'

import { Round} from '../../../types'

import RoundDetails from './RoundDetails'
import VoteRound from './VoteRound'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        padding: '1rem',
    },
})

interface Props {
    round: Round
}

const RoundCard: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    return (
        <Paper elevation={3} className={classes.container}>
            <VoteRound round={round} />
            <RoundDetails round={round} />
        </Paper>
    )
}

export default RoundCard
