import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({

})

interface Props {
    count: number
}

const Refusals: React.FC<Props> = ({ count }) => {
    const classes = useStyles({})


    return (
        <div>
            {`Failed votes: ${count}`}
        </div>
    )
}

export default Refusals
