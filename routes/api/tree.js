const express = require('express');
const router = express.Router();


const db = require('../../config/keys').mongoURI;

const fs = require("fs");



router.get('/', (req,res) => {
    /* db.collection('tree').find().toArray((err, results) => {
        console.log(results)
        // send HTML file populated with quotes here
        
      })
    
      res.json(tree); */
      const test = {"hello": "hello"}
      res.json(test);
      console.log(test);
});


router.get('/test', (req,res) => {
    /* db.collection('tree').find().toArray((err, results) => {
        console.log(results)
        // send HTML file populated with quotes here
         
      })
    
      res.json(tree); */
      
      
    console.log("route");
    fs.readFile("input.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);
        console.log(j.children[0].name);
        res.json(j);
        console.log(j);
        console.log("here");
    })
    //fs.close("input.txt");
});





module.exports = router;