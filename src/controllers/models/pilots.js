const { v4 } = require('uuid'),
  id = v4(),
  createdAt = new Date();

module.exports = newPilot = {
  id,
  pilotName,
  pilotStarship,
  characteristics: {
    hair_color,
    skin_color,
    eye_color,
    gender
  },
  createdAt,
}