const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const dbUpdates = require('./dbUpdates')
const getTasks = dbUpdates.getTasks
const addNewTask = dbUpdates.addNewTask
const markComplete = dbUpdates.markComplete
const deleteTask = dbUpdates.deleteTask

const cors = require('cors')
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(cors({origin: '*'}))
//could put in exact url of the react app disbales cors for get and post
app.options('*', cors({origin: '*'}))
//disable for "preflight" requests from put and delete requests

//Routes
app.get('/', async function(req, res) {
    //render the homepage
    //make req to get tasks

})

app.get('/completed', async function(req, res) {
    //render the completed page
    //make req to other
})



//API Paths

app.get('/task', getTasks)

app.post('/task', jsonParser, addNewTask)

app.put('/task/:id', markComplete)

app.delete('/task/:id', deleteTask)



app.listen(3001);


