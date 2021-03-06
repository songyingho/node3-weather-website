const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Song'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Song'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'What help do you need',
        name: 'Song'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No location selected'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: 'No location selected'
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error: 'No location selected'
                        })
                    } else {
                        res.send({
                            address: req.query.address,
                            forecast: forecastData.description,
                            location: forecastData.location,
                            temperature: forecastData.temperature,
                            humidity: forecastData.humidity,
                            feelslike: forecastData.feels_like,
                            message: `It's ${forecastData.description}. It is currently ${forecastData.temperature} degrees out. It feels like ${forecastData.feels_like} degrees out. The humidity is ${forecastData.humidity}`
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'No search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Song',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Song',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})