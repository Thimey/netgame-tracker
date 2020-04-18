import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    container: {
        border: '1px solid black',
        marginBottom: '10px',
    }
})

interface Props {}

const SpecialEventCard: React.FC<Props> = () => {
    const classes = useStyles({})


    return (
        <div className={classes.container}>
            SpecialEventCard
        </div>
    )
}

export default SpecialEventCard
