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
const auth = require("./routes/api/auth");
const app = express();

const fs = require("fs");

const dataEdits = require("./dataEdits/dataEdits");

//data edits
{
function addIds () {
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        let i = 0; 
        
        while(i < j.people.length){
            j.people[i]["id"] = i.toString();
            i = i + 1; 
        }
        

        
        const sj = JSON.stringify(j);
        fs.writeFile('People.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });
            
    })
    
}
function addQueries () {
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        let i = 0; 
        
        while(i < j.people.length){
            if((!j.people[i].hasOwnProperty("queries"))){
                j.people[i]["queries"] = []
                console.log(i);
            }
            
            i = i + 1; 
        }
        

        
        const sj = JSON.stringify(j);
        fs.writeFile('People.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });
        fs.writeFile('personbackup2.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });
            
    })
    
}

addQueries();
addIds();

}

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
// mongoose
//     .connect(db)
//     .then(() => console.log("mongoDB connected"))
//     .catch(err => console.log(err));


//connect to mongodb
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    
    // Connection URL
    const url = 'mongodb://tcrawley:sponge33@ds213513.mlab.com:13513/nector';
    
    // Database Name
    const dbName = 'nector';
    
    // Create a new MongoClient
    const client = new MongoClient(url);
    
    // Use connect method to connect to the Server
    client.connect(function(err) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
    
      const db = client.db(dbName);
      module.exports.db2 = db; 
        
      
      
      //client.close();
    });

    

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
app.use('/api/auth', auth);


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