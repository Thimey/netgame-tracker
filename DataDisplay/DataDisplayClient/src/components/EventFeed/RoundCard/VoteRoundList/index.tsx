import React from 'react'
import { makeStyles } from '@material-ui/styles'

import VoteRound from './VoteRound'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    }
})

interface Props {

}

const VoteRoundList: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            <VoteRound />
            <VoteRound />
            <VoteRound />
        </div>
    )
}

export default VoteRoundList
