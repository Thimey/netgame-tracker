import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles({
    deck: {
        backgroundColor: 'white',
        border: '1px solid',
        color: 'black',
        padding: '2px',
        marginLeft: '8px',
        marginRight: '8px',
    }
})

interface Props {
    count: number
}

const Deck: React.FC<Props> = ({ count }) => {
    const classes = useStyles({})


    return (
        <Typography className={classes.deck} >
            {count}
        </Typography>
    )
}

export default Deck
