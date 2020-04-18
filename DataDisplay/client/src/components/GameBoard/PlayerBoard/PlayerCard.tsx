import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        flex: 1,
    }
})

interface Props {}

const PlayerCard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            Player name
        </div>
    )
}

export default PlayerCard
