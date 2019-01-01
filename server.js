const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const path = require("path");
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const nodes = require("./routes/api/nodes");
const tree = require("./routes/api/tree");
const app = express();

const fs = require("fs");

fs.readFile("input.txt", (err,data) => {
    if (err) {
        return console.error(err);
     }
     const str = data.toString();
     const j = JSON.parse(str);
     console.log(j.children[0].name);
})


//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
app.use('/api/nodes', nodes);
app.use('/api/tree', tree);

// server static assets if in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static('client/build'));

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runing on port ${port}`));
console.log("sup biches");