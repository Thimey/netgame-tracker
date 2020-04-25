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

    const getChancellorsAndPresidents = () => {
        let isNewVoteRound = true
        let chancellors: string[] = []
        let presidents: number[] = []

        round.forEach(event => {
            // the secondLastVoteWithChancellor contains the president and chancellor for the susequent failedVote
            // and the missionOutcome (a successful vote or flip) has its own chancellor
            if (event.phase === 'secondLastVoteWithChancellor' && isNewVoteRound) {
                chancellors.push(event.chancellor as string)
                presidents.push(event.president)
                isNewVoteRound = false
            } else if (event.phase === 'failedVote') {
                isNewVoteRound = true
            } else if (event.phase === 'missionOutcome') {
                chancellors.push(event.chancellor as string)
                presidents.push(event.president)
                isNewVoteRound = true
            }
        })

        return { presidents, chancellors }
    }

    const { presidents, chancellors } = getChancellorsAndPresidents()
    const votingRounds = round.filter(event => event.phase !== 'secondLastVoteWithChancellor')

    return (
        <div className={classes.voteRoundContainer}>
            {votingRounds.map((round, index) => (
                <Vote
                    key={`voteRound${index + 1}`}
                    votes={round.votes}
                    president={presidents[index]}
                    proposedChancellor={chancellors[index]}
                />
            ))}
        </div>
    )
}

export default VoteRound
