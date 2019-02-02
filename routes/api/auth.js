const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require('fs');

router.post('/register', (req, res) => {
    console.log("made it here");
    fs.readFile("logins.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        console.log(req.body.email, req.body.password);
        //console.log(j.people.indexOf("Tyler Crawley"));
        let cryptPass = req.body.password; 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(cryptPass, salt, (err,hash) => {
                if(err) throw err; 
                cryptPass = hash; 
                console.log(cryptPass, "cryptpass", hash, "hash")
                console.log(cryptPass, "crypt after");
                let name2 = {email:req.body.email,password:cryptPass};
                j.push(name2);

                
                const sj = JSON.stringify(j);
                fs.writeFile('logins.txt', sj, (err) => {  
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('saved!');
                });

            })
            
        })
        
        
    })
    console.log(req.body);
    res.json(req.body.email);
});


router.post('/login', (req, res) => {

    fs.readFile("logins.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        console.log(req.body.email, req.body.password);
        //console.log(j.people.indexOf("Tyler Crawley"));
        
        
        let i = 0; 
        let found = false; 
        let passMatch = false; 
        let wrong = false; 
        while(i<j.length && !found && !wrong){
            if((j[i].email === req.body.email)){
                if(bcrypt.compareSync(req.body.password, j[i].password)){
                    console.log("found");
                    found = true; 
                    
                }else{
                    wrong = true; 
                }
                
            }else{
                i = i + 1; 
            }
            console.log("loop");
        }

        if(found){
            console.log("made it here");
            console.log(j[i].id, "id");
            res.json(j[i].id);
        }else{
            res.status(404)
        }
        
        
        
        
            
    })
});

module.exports = router;