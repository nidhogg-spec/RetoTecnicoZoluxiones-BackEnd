const axios = require('axios'),
  { v4 } = require('uuid');

function getPiloInfo(starshipNumber){
  var pilotData = []
  return new Promise((resolve,reject)=>{
    axios.get(`https://swapi.py4e.com/api/starships/${starshipNumber}/`)
      .then((response)=>{
        const numberPilots = response.data.pilots.length;
        pilotData.push({starship: response.data});
        if (numberPilots != 0) {
          var random = Math.floor(Math.random() * numberPilots)
          axios.get(response.data.pilots[random])
            .then((response)=>{
              pilotData.push({pilot:response.data})
              resolve(pilotData)
            })
            .catch((err)=>{
              console.error(err);
              reject(err);
            })
        } else {
          pilotData.push({pilot:{
            name:"",
            hair_color:"",
            skin_color:"",
            eye_color:"",
            gender:""
          }})
          resolve(pilotData)
        }        
      })
      .catch((err)=>{
        console.error(err);
        reject(err);
      })
  })
}

const newPilot = async (starshipNumber) =>{

  const result = await getPiloInfo(starshipNumber);

  const pilotData = {
    id: v4(),
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

  return pilotData
}

exports.newPilot = newPilot