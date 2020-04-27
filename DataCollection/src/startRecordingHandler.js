'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })

function saveGame(gameId, data) {
    const newEventPhase = getNewEventPhase(data.state.phase)

    const putParams = {
        TableName: 'hitsGames',
        Item: {
            gameId,
            timestamp: Date.now(),
        },
    }

    return documentClient.put(putParams).promise()
}

module.exports.startRecording