import express from 'express'
import mongoose from 'mongoose'
import apiRoutes from './routes/apiRoutes.js'

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const dbURI = 'mongodb+srv://node1user:qwerty132@node1.44ayzka.mongodb.net/restapi'
mongoose.connect(dbURI)
    .then(result => app.listen(3003))
    .catch(err => console.log(err))
// dinamiskas turinys, views default ziuri
app.set('view engine', 'ejs')

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/new', (req, res) => res.render('new'))

app.use('/api', apiRoutes)