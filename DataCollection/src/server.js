const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const port = 3000
const gameStateExamplesDir = path.join(__dirname, '../gameStateExamples/')

const gamePhases = [
    // When everyone is entering game, before starting
    'huddle',
    // Instructions and ratio good vs evil displayed. Note, state sent for each "Ok" clicked by player
    'intro',
    // When players are shown their identity, Note, state sent for each "Ok" clicked by player
    'identify',
    // When president deciding on chancellor and picks a player
    'propose',
    // This is when the president confirms their selection. Note, this state persists until everyone has voted
    'vote',
    // When president is deciding on what card to discard
    'president',
    // When chancellor is deciding on what card to choose
    'chancellor',
    // When result is flipped to all players
    'check_outcome',
    // ...
    'propose',

]

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => {
    const { gameEventName, data } = req.body

    fs.writeFileSync(
        `${gameStateExamplesDir}${data.id}_${gameEventName}_${Date.now()}.json`,
        JSON.stringify(data, null, 4),
    )

    res.send('Shanks')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

