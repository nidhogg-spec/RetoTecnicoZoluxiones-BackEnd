const axios = require('axios'),
 { v4 } = require('uuid');

  function getArtificialCharacterInfo(){
    var specieData = []
    return new Promise((resolve,reject)=>{
      axios.get('https://swapi.py4e.com/api/species/2/')
        .then((response)=>{
          const numberPeople = response.data.people.length;
          var random = Math.floor(Math.random() * numberPeople)
          specieData.push({specie: response.data})
          axios.get(response.data.people[random])
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
  const newSpecie = async () =>{

    const result = await getArtificialCharacterInfo()
    const artificialLifeData = {
      id: v4(),
      specieName: result[0].specie.name,
      droidName: result[1].person.name,
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
  
    return artificialLifeData
  }

exports.newSpecie = newSpecie