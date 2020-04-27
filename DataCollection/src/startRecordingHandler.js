'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })

function saveGame(gameId, data) {
    const putParams = {
        TableName: 'hitsGames',
        Item: {
            gameId,
            timestamp: Date.now(),
            data,
        },
    }

    return documentClient.put(putParams).promise()
}

module.exports.startRecordingHandler = async (event, context, callback) => {
    console.info(JSON.stringify(event))
    try {
        const hitsEvent = JSON.parse(event.body)
        const gameId = hitsEvent.id

        if (!gameId) {
            throw new Error('No game id found')
        }

        await saveGame(gameId, hitsEvent)

        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://netgames.io',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                saved: true
            }),
        };

        callback(null, response);
    } catch (e) {
        console.error(e)
    }
}
