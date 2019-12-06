const adapterPairs = {
    dynamo: require('./dynamodb')
}

module.exports = adapterPairs[process.env.DB_ADAPTERS] || adapterPairs.dynamo
