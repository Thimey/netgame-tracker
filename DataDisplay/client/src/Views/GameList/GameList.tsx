import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import LaunchIcon from '@material-ui/icons/Launch'

import { getGames, Game } from '../../services/getGames'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function GameList() {
  const classes = useStyles()
  const [games, setGames] = React.useState<Game[]>([])

  React.useEffect(() => {
    const fetchGames = async () => {
        const fetchedGames = await getGames()
        setGames(fetchedGames)
    }

    fetchGames()
  }, [])

  if (!games.length) {
      return null
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Game Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.gameId}>
              <TableCell component="th" scope="row">
                {game.gameId}
              </TableCell>
              <TableCell>{new Date(game.timestamp).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link to={`/${game.gameId}`}>
                    <LaunchIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}