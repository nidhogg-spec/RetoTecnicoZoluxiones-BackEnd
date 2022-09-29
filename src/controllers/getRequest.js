const getAllCharacters = async (event) =>{
  try {
    const result = await  dynamoDB.scan({
      TableName: "starWars"
    }).promise();

    const task = result.Items
    return {
      status: 200,
      body: task
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  getAllCharacters,
}