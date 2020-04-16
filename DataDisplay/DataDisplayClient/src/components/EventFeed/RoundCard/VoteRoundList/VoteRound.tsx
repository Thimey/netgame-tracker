import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flex: 1,
    }
})

interface Props {}

const VoteRound: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            VoteRound
        </div>
    )
}

export default VoteRound
