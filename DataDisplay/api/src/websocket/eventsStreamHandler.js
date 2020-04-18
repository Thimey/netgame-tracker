
const AWS = require('aws-sdk')
const { handlePromiseAll } = require('../../lib/handlePromiseAll')

const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-10-08' })
const connectionTableName = 'hitsConnections'

const apiGateway = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: 'https://f8n7r9ide8.execute-api.ap-southeast-2.amazonaws.com/dev'
})

async function getWebSocketConnections() {
    const queryParams = {
        TableName: connectionTableName,
    }
    const queryOutput = await documentClient.scan(queryParams).promise()

    return (queryOutput.Items || [])
}

function sendDataToWebsocketConnection(connectionId, data) {
    return apiGateway
        .postToConnection({ ConnectionId: connectionId, Data: JSON.stringify(data) })
        .promise()
        .catch (error => console.error(`Send error: connection id: ${connectionId}, error message: ${error.message}.`))
}

async function handleNewEvent(newEventImage) {
    // Get all websocket connections
    const connections = await getWebSocketConnections()
    const connectionIds = connections.map(c => c.connectionId)

    // Send the data to all the connections
    return handlePromiseAll(
        connectionIds.map(id => sendDataToWebsocketConnection(id, newEventImage)),
        'Handle websocket send'
    )
}


module.exports.eventsStreamHandler = (event, _context, callback) => {
    console.info('Received event:', JSON.stringify(event, null, 2))

    try {
        const events = event.Records.reduce((acc, record) => {
            if (record.eventName === 'INSERT') {
                const unmarshalledNewImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)

                acc.push(unmarshalledNewImage)

                return acc
            }

            return acc
        }, [])

        return handlePromiseAll(
            events.map(handleNewEvent),
            'Handle websocket send'
        )
    } catch (e) {
        throw new Error(`notificationProcessor error: ${error.message}`)
    }
}