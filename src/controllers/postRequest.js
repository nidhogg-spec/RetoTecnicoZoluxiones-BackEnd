const axios = require('axios'),
 { DynamoDB } = require('aws-sdk'),
  newPilot = require('./models/pilots'),
  newSpecie = require('./models/artificial'),
//  { newPilot } = require('./models/pilots'),
//  { artificial } = require('./models/artificial'),
 dynamoDB = new DynamoDB.DocumentClient();



const setNewPilot = async (event) =>{
  try {  
    const body = JSON.parse(event.body)
    const pilotData = await newPilot.newPilot(body.starshipNumber);

    await dynamoDB.put({
      TableName: 'DbStarWars',
      Item: pilotData
    }).promise()

    return {
      status: 200,
      body: pilotData
    }
  } catch (error) {
    console.error(error)
    return {
      status: 404,
      body: "Not found"
    }
  }
}

const setArtificialLife = async (event) =>{
  try {
    const specieData = await newSpecie.newSpecie();

    await dynamoDB.put({
      TableName: 'DbStarWars',
      Item: specieData
    }).promise()

    return {
      status: 200,
      body: specieData
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
  setNewPilot,
  setArtificialLife
}