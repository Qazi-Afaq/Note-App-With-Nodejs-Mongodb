const express  = require('express');
const app = express();
const port = 3000;

const mongoConnect = require('./util/sql-database').mongoConnect;

const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')

const nodemailer = require('nodemailer');

// routes
const addTopicRoute = require('./routes/addTopic-route')
const seeNotesRoute = require("./routes/seeNotes-route")
const addNotesRoute = require('./routes/addNote-route');
const editNoteRoute = require('./routes/editNote-route');
const deleteNoteRoute = require('./routes/deleteNote-route')

// app.use(cors({
//     origin:"https://youtu.be",
//     // methods: ["GET" , "POST"]
// }))
app.set('view engine' , 'ejs')
app.set('views' , 'views');

app.use(express.static(path.join(__dirname  , "public")))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use((req ,res , next) => {
    // UserModel.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next()
    // })
    // .catch(err => console.log(err))
    next()
})

app.use(editNoteRoute)
app.use(addNotesRoute)
app.use(deleteNoteRoute);
app.use(seeNotesRoute)
app.use(addTopicRoute)

mongoConnect(() => {
    console.log('listening...')
    app.listen(port);
})

// app.listen(4000)