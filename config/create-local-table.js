const AWS = require('aws-sdk');
const DYNAMO_DB_PORT = process.env.DYNAMO_DB_PORT || '5001'
const endpoint = `http://localhost:${DYNAMO_DB_PORT}`

const dynamoDb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    endpoint,
    region: 'us-west-2',
    accessKeyId: '1232',
    secretAccessKey: '12344',
    sessionToken: '1234'
});

const params = {
    AttributeDefinitions: [
        {
            AttributeName: 'Slug',
            AttributeType: 'S',
        }
    ],
    KeySchema: [
        {
            AttributeName: 'Slug',
            KeyType: 'HASH',
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: 'ShortUrl',
};

dynamoDb.createTable(params).promise()
    .then(() => {
        console.log('Table Created: ShortUrl')
    })
    .catch(() => {
        console.log('Table Creation Failed')
    })
