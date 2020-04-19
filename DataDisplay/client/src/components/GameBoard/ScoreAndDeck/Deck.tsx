import React from 'react'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({

})

interface Props {
    count: number
}

const Deck: React.FC<Props> = ({ count }) => {
    const classes = useStyles({})


    return (
        <div>
            {`Deck count: ${count}`}
        </div>
    )
}

export default Deck
