const express = require('express');
const router = express.Router();


//load user model
const node = require('../../models/node');
const fs = require("fs");
//add node
router.post(
    '/', 
    
    //passport.authenticate('jwt', {session: false}), 
    (req, res) => {

        fs.readFile("input.txt", (err,data) => {
            if (err) {
                return console.error(err);
            }
            const str = data.toString();
            const j = JSON.parse(str);
            
            
            
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
            const sj = JSON.stringify(j);
            fs.writeFile('input.txt', sj, (err) => {  
                // throws an error, you could also catch it here
                if (err) throw err;
            
                // success case, the file was saved
                console.log('saved!');
            });

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