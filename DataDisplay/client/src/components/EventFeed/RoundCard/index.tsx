import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Round} from '../../../types'

import RoundDetails from './RoundDetails'
import VoteRound from './VoteRound'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        width: '100%',
        border: '1px solid black',
        marginBottom: '10px',
    },
})

interface Props {
    round: Round
}

const RoundCard: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    return (
        <div className={classes.container}>
            <VoteRound round={round} />
            <RoundDetails round={round} />
        </div>
    )
}

export default RoundCard
