const express = require('express');
const router = express.Router();
const serv = require('../../server');

//load user model
const node = require('../../models/node');
const fs = require("fs");
//add node
router.post(
    '/', 
    
    //passport.authenticate('jwt', {session: false}), 
    (req, res) => {

        const db = serv.db2;
        const categories = db.collection("categories");
          //auth.insert({ "foo" : "bar" })
        categories.find({}).toArray(function(err, docs) {
            //assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            let j = docs[0];
            
            
            
            //j.children[0].children.push({"name": req.body.name, "children": []})
            let isPlaced = false;
             
            console.log(req.body.parent);
            function place(currentNode){
               
                endNode = false; 
                console.log("function called");
                while(!isPlaced && !endNode){
                    console.log(
                        currentNode.name
                    )
                    if(currentNode.name === req.body.parent){
                        currentNode.children.push({"name": req.body.name, "children":[]})
                        console.log("yep");
                        isPlaced = true;
                    }else{
                        let i; 
                        console.log(currentNode.children.length);
                        if(currentNode.children.length === 0){
                            endNode = true; 
                        }
                        for(i = 0; i < currentNode.children.length; i++){
                            //console.log(currentNode.children[i]);
                            place(currentNode.children[i])
                            
                        }
                        
                    }

                }
                return("");
            }
            place(j)

            //save
            categories.updateOne(
                { }, {$set: j}
                
            ) 

            res.json({"complete":"complete"});
        })           
            
            
            
    }
    
);

// @route   GET api/profile/all
// @desc    get all profiles
// @access  public
router.get('/', (req,res) => {
    
    node.findOne({name: { $eq: "Interests"}})
    
    .then(nodes => {
        
        node.findOne({name: {$eq: nodes.children[0]}})
        res.json(nodes);
    
    })
    .catch(err =>
        res.status(404).json({profile: 'there are no profiles'})    
    )

});






module.exports = router;