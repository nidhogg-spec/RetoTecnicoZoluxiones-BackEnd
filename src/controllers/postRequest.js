const axios = require('axios'),
 { DynamoDB } = require('aws-sdk'),
 { v4 } = require('uuid'),
 id = v4(),
//  { newPilot } = require('./models/pilots'),
//  { artificial } = require('./models/artificial'),

 dynamoDB = new DynamoDB.DocumentClient();

function getPiloInfo(){
  var pilotData = []
  return new Promise((resolve,reject)=>{
    axios.get('https://swapi.py4e.com/api/starships/10/')
      .then((response)=>{
        pilotData.push({starship: response.data})
        axios.get(response.data.pilots[1])
        .then((response)=>{
          pilotData.push({pilot:response.data})
          resolve(pilotData)
        })
        .catch((err)=>{
          console.error(err);
          reject(err);
        })
      })
      .catch((err)=>{
        console.error(err);
        reject(err);
      })
  })
}

function getArtificialCharacter(){
  var specieData = []
  return new Promise((resolve,reject)=>{
    axios.get('https://swapi.py4e.com/api/species/2/')
      .then((response)=>{
        specieData.push({specie: response.data})
        axios.get(response.data.people[1])
        .then((response)=>{
          specieData.push({person:response.data})
          axios.get(response.data.homeworld)
          .then((response)=>{
            specieData.push({homeworld:response.data})
            resolve(specieData)
          })
          .catch((err)=>{
            console.error(err);
            reject(err);
          })
        })
        .catch((err)=>{
          console.error(err);
          reject(err);
        })
      })
      .catch((err)=>{
        console.error(err);
        reject(err);
      })
  })
}

const setNewPilot = async (event) =>{
  try {
    const result = await getPiloInfo()

    const pilotData = {
      id,
      pilotName: result[1].pilot.name,
      pilotStarship: result[0].starship.name,
      characteristics: {
        hair_color: result[1].pilot.hair_color,
        skin_color: result[1].pilot.skin_color,
        eye_color: result[1].pilot.eye_color,
        gender: result[1].pilot.gender
      },
      createdAt: Date.now(),
    }

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
  }
}

const setArtificialLife = async (event) =>{
  try {
    const result = await getArtificialCharacter()
    const artificialLifeData = {
      id,
      specieName: result[0].specie.name,
      personName: result[1].person.name,
      planetName: result[2].homeworld.name,
      average_lifespan: result[2].homeworld.average_lifespan,
      characteristics: {
        hair_color: result[1].person.hair_color,
        skin_color: result[1].person.skin_color,
        eye_color: result[1].person.eye_color,
        gender: result[1].person.gender
      },
      createdAt: Date.now(),
    }

    await dynamoDB.put({
      TableName: 'DbStarWars',
      Item: artificialLifeData
    }).promise()

    return {
      status: 200,
      body: artificialLifeData
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  setNewPilot,
  setArtificialLife
}