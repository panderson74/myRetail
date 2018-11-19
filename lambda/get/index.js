const AWS = require('aws-sdk');
const DYN = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log('getProduct Invoke: ', JSON.stringify(event, null, 2));
    if (event.id === undefined) {
        callback("400 Invalid Input: Missing {id} parameter.");
        return;
    }
    else
    {
        return getDataFromDynamo(event, callback);
    }
};

function getDataFromDynamo(event, callback) {
    // Sets up a parameters object for retrieval by productId
    var itemParams = null;
        if (event.id !== null) {
        itemParams = {
            TableName: 'products',
            Key: {
                'productId' : parseInt(event.id, 0),
            },
        };
    }
    
    DYN.get(itemParams, function(err, data) {
        if (err) {
            console.log("500 Server Error: Problem retrieving product from DynamoDB.", err);
        } else {
            console.log("200 Success: Product returned!", data);
            callback(null, data);
        }
    });
}