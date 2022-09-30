 const { DynamoDB } = require('aws-sdk'),
  dynamoDB = new DynamoDB.DocumentClient();

const getAllData = async () =>{
  try {
    const result = await  dynamoDB.scan({
      TableName: "DbStarWars"
    }).promise();

    const task = result.Items
    return {
      status: 200,
      body: task
    }
  } catch (error) {
    console.error(error)
    return {
      status: 400,
      body: "unexpected Error"
    }
  }
}

const getElementById = async (event) =>{
  try {
    const {id} = event.pathParameters
    const result = await  dynamoDB.get({
      TableName: "DbStarWars",
      Key:{
        id
      }
    }).promise();

    const task = result.Item
    return {
      status: 200,
      body: task
    }
  } catch (error) {
    console.error(error)
    return {
      status: 400,
      body: "unexpected Error"
    }
  }
}

module.exports = {
  getAllData,
  getElementById
}