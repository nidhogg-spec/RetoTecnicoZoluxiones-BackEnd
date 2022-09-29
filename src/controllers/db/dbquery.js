const { DynamoDB } = require('aws-sdk')
  // { newPilot } = require('./models/pilots');

export const  postPilots = async (event)=>{
  const dynamoDB = new DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);

  await dynamoDB.put({
    TableName: 'starWars',
    Item: newPilot
  }).promise()

  return {
    status: 200,
    body: JSON.stringify(newPilot)
  }
}

export const  postArtificial = async ()=>{

}