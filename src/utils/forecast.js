const request = require('request')

const weather_key = 'dcc1f3118c3ff4e95a5efcee5233676d'

const forecast = (longitude, latitude, callback) => {
    const weather_url = `http://api.weatherstack.com/current?access_key=${weather_key}&query=${latitude},${longitude}&units=m`

    request({url: weather_url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })
}

module.exports = forecast