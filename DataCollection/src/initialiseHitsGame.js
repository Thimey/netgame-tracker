'use strict';

const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })

function saveGame(lahdGameId) {
    const [_gameId, timestamp] = lahdGameId.split('_')

    const putParams = {
        TableName: 'hitsGames',
        Item: {
            gameId: lahdGameId,
            timestamp: parseInt(timestamp, 10),
        },
    }

    return documentClient.put(putParams).promise()
}

module.exports.initialiseHitsGame = async (event, context, callback) => {
    console.info(JSON.stringify(event))
    try {
        const { lahdGameId } = JSON.parse(event.body)

        if (!lahdGameId) {
            throw new Error('No lahdGameId id found')
        }

        await saveGame(lahdGameId)

        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://netgames.io',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                saved: lahdGameId
            }),
        };

        callback(null, response);
    } catch (e) {
        console.error(e)
    }
}
