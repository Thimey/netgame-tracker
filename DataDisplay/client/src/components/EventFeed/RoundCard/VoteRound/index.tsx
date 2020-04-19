import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { BaseEventState } from '../../../../types'
import Vote from './Vote'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    }
})

interface Props {
    votes: BaseEventState[]
}

const VoteRound: React.FC<Props> = ({ votes }) => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            {votes.map(vote => (
                <Vote vote={vote} />
            ))}
        </div>
    )
}

export default VoteRound
