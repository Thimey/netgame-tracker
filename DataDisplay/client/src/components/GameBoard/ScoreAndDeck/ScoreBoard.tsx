import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({

})

interface Props {
    count: number
    type: string
}

const ScoreBoard: React.FC<Props> = ({ count, type }) => {
    const classes = useStyles({})


    return (
        <div>
            <span>{`${type}: ${count}`}</span>
        </div>
    )
}

export default ScoreBoard
