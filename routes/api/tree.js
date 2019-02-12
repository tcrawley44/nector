const express = require('express');
const router = express.Router();
const serv = require('../../server');

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
    const db = serv.db2;
        const categories = db.collection("categories");
          //auth.insert({ "foo" : "bar" })
        categories.find({}).toArray(function(err, docs) {
            //assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            let j = docs[0];
            
        console.log(j.children[0].name);
        res.json(j);
        console.log(j);
        console.log("here");
    })
    //fs.close("input.txt");
});





module.exports = router;