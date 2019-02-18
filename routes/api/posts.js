const express = require('express');
const router = express.Router();
const serv = require('../../server');

router.post('/', (req,res) => {

    console.log(req.body.post);

    const db = serv.db2;
    const posts = db.collection("posts");
      //auth.insert({ "foo" : "bar" })
    posts.find({}).toArray(function(err, docs) {
        //assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        let j = docs[0];
        j.posts.push({"id": j.posts.length, "body": req.body.post})
        posts.updateOne(
            { }, {$set: j}
            
        ) 
        res.json(j);
        
           
    })
});

router.get('/', (req,res) => {

    

    const db = serv.db2;
    const posts = db.collection("posts");
      //auth.insert({ "foo" : "bar" })
    posts.find({}).toArray(function(err, docs) {
        //assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        let j = docs[0];
        
        
        res.json(j);
        
           
    })
});

module.exports = router;