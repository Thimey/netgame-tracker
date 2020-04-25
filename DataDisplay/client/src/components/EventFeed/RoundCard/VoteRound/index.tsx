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

    const getChancellors = () => {
        let isNewVoteRound = true
        let chancellors: string[] = []

        round.forEach(event => {
            // the secondLastVoteWithChancellor contains the chancellor for the susequent failedVote
            // and the missionOutcome (a successful vote or flip) has its own chancellor
            if (event.phase === 'secondLastVoteWithChancellor' && isNewVoteRound) {
                chancellors.push(event.chancellor as string)
                isNewVoteRound = false
            } else if (event.phase === 'missionOutcome') {
                chancellors.push(event.chancellor as string)
                isNewVoteRound = true
            }
        })

        return chancellors
    }

    const chancellors = getChancellors()
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
