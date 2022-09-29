const { v4 } = require('uuid'),
  id = v4(),
  createdAt = new Date();

modulr.exports = artificial = {
  id,
  className,
  designation,
  language,
  people: {
    peopleName,
    skin_color,
    eye_color,
    gender
  },
  createdAt,
}