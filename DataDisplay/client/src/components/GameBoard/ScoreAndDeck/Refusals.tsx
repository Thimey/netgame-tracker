import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles({

})

interface Props {
    count: number
}

const Refusals: React.FC<Props> = ({ count }) => {
    const classes = useStyles({})


    return (
        <Typography>
            {`Failed votes: ${count}`}
        </Typography>
    )
}

export default Refusals
