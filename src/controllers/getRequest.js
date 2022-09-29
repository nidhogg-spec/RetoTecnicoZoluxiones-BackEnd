const axios = require('axios');

function getRequest(){

  return new Promise((resolve,reject)=>{
    axios.get('https://swapi.py4e.com/api/people/')
      .then((response)=>{
        resolve(response.data)
      })
      .catch((err)=>{
        console.error(err);
        reject(err);
      })
  })
}
const getAllCharacters = async (event) =>{
  try {
    const result = await getRequest()
    console.log('-----------')
    console.log(result)
    return {
      status: 200,
      body: result
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  getAllCharacters,
}