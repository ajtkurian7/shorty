const AWS = require('aws-sdk');

const config = {
    region: process.env.AWS_REGION || 'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '1232',
    endpoint: process.env.DYNAMO_ENDPOINT || 'http://localhost:5001',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '12344',
    sessionToken: process.env.AWS_SESSION_TOKEN || '1234',
    tableName: process.env.DYNAMO_TABLE_NAME || 'ShortUrl',
    hashKey: process.env.DYNAMO_HASH_KEY || 'Slug',
    url: process.env.DYNAMO_URL_ATTRIBUTE || 'Url',
};

const docClient = new AWS.DynamoDB.DocumentClient(config);
const ddb = new AWS.DynamoDB(config)

exports.get = async key => {
    const params = {
        TableName: config.tableName,
        Key: {
            [config.hashKey]: key,
        },
    };

    try {
        const response = await docClient.get(params).promise();
        console.log(response);
        return {
            success: true,
            url: response.Item && response.Item[config.url],
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
        };
    }
};

exports.put = async (slug, url) => {
    const params = {
        TableName: config.tableName,
        Item: {
            [config.hashKey]: slug,
            [config.url]: url,
        },
        ConditionExpression: `attribute_not_exists(${config.hashKey})`,
    };
    try {
        await docClient.put(params).promise();
        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            isDuplicateKey: e.code === 'ConditionalCheckFailedException',
            errorMessage: e.message
        };
    }
};

exports.createTable = async (key, tableName) => {
    const params = {
        AttributeDefinitions: [
            {
                AttributeName: key,
                AttributeType: 'S',
            }
        ],
        KeySchema: [
            {
                AttributeName: key,
                KeyType: 'HASH',
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: process.env.DYNAMO_READ_UNITS || 5,
            WriteCapacityUnits: process.env.DYNAMO_WRITE_UNITS || 5,
        },
        TableName: tableName,
    };

    try {
        await ddb.createTable(params).promise()
        console.log(`Table Created: ${tableName}`)
        return {
            success: true,
            tableName
        }
    } catch(e) {
        console.log('Table Creation Failed')
        return {
            success: false,
            errorMessage: e.message
        }
    }
}
