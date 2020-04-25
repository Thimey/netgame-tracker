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
        '& > *': {
            marginBottom: '0.5rem',
        },
        '& > :first-child': {
            marginBottom: 0,
        },
    }
})

interface Props {
    round: EventState[]
}

const VoteRound: React.FC<Props> = ({ round }) => {
    const classes = useStyles({})

    const chancellors = round.reduce((chancellors, event) => {
        // the secondLastVoteWithChancellor contains the chancellor for the susequent failedVote
        // and the missionOutcome (a successful vote or flip) has its own chancellor
        if (event.phase !== 'failedVote') {
            return [...chancellors, event.chancellor as string]
        }

        return chancellors
    }, [] as string[])

    const votingRounds = round.filter(event => event.phase !== 'secondLastVoteWithChancellor')

    console.log('voteRound round d', round)

    return (
        <div className={classes.voteRoundContainer}>
            {votingRounds.map((vote, index) => (
                <Vote
                    key={`voteRound${index + 1}`}
                    vote={vote}
                    proposedChancellor={chancellors[index]}
                />
            ))}
        </div>
    )
}

export default VoteRound
