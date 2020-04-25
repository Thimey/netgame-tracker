import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { EventState } from '../../../../types'
import Vote from './Vote'

const useStyles = makeStyles({
    voteRoundContainer: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-end',
        width: '60%',
    }
})

interface Props {
    round: EventState[]
}

const VoteRound: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    console.log('voteRound round d', round)

    return (
        <div className={classes.voteRoundContainer}>
            {round.map(vote => (
                <Vote vote={vote} />
            ))}
        </div>
    )
}

export default VoteRound
