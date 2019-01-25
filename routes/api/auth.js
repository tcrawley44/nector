const express = require('express');
const router = express.Router();

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
       
        
        let name2 = {email:req.body.email,password:req.body.password};
        j.push(name2);

        
        const sj = JSON.stringify(j);
        fs.writeFile('logins.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });
        
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

        while(i<j.length && !found){
            if((j[i].email === req.body.email) && (j[i].password === req.body.password)){
                console.log("found");
                found = true; 
                res.json(j[i].id);
            }else{
                i = i + 1; 
            }
        }

        
        console.log(j[i].id);
        
        
            
    })
});

module.exports = router;