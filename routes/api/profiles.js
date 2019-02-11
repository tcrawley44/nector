const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');
//load profile model
const profile = require('../../models/Profile');
//load user profile
const User = require('../../models/User');
//load input validation
const validateProfileInput = require('../../validation/profiles');
const validateExperienceInput = require('../../validation/experience');

router.get('/test', (req, res) => res.json({msg: "profile works"}));

// @route   GET api/profile
// @desc    get current users profile
// @access  private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    profile.findOne({ user: req.user.id })
        .populate('user','name')
        .then(profile => {
            if(!profile){
                errors.noprofile = 'there is no profile for this user'
                return res.status(400).json(errors);
            }
            res.json(profile);
        })
        .catch(err=> res.status(404).json(err));
});





router.get('/all', (req,res) => {

    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);

        res.json(j);
    })

});

router.get('/network', (req,res) => {

    fs.readFile("network.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);

        res.json(j);
    })

});



router.post('/addFriendGroup', (req,res) => {

    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        console.log(req.body.userName, req.body.friendGroupName);
        console.log(j.people.indexOf("Tyler Crawley"));
        let found = false; 
        let i = 0; 
        
        while(!found && (i<j.people.length)){
            if(j.people[i].name === req.body.userName){
                found = true; 
            }else{
                i = i + 1; 
            }
        }
        let name = req.body.friendGroupName;
        let name2 = {name:name,friends:[]};
        j.people[i].friendGroups.push(name2);

        
        const sj = JSON.stringify(j);
        fs.writeFile('People.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });
            
    })

});

router.post('/getFriendGroups', (req,res) => {
    console.log("chere");
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        console.log("current",req.body.userName);
        let found = false; 
        let i = 0; 
        
        while(!found && (i<j.people.length)){
            if(j.people[i].name === req.body.userName){
                found = true; 
                console.log("found",i);
            }else{
                i = i + 1; 
            }
        }

        let groups = j.people[i].friendGroups;
        console.log(groups);
        res.json(groups);

        
        
            
    })

});

router.post('/deleteQuery', (req,res) => {
    
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);


        
        let found = false; 
        let i = 0; 
        console.log("delete running");
        console.log(req.body.id);
        while(!found && (i<j.people.length)){
            
            if(j.people[i].id === req.body.id){
                found = true; 
                console.log("found2",i);
            }else{
                i = i + 1; 
            }
        }

        if(found){
            let found2 = false; 
            let i2 = 0; 
            while(!found2 && i2<j.people[i].queries.length){
                console.log(j.people[i].queries[i2].name, req.body.query);
                if(j.people[i].queries[i2].name === req.body.query){
                    j.people[i].queries.splice(i2,1);
                    console.log("made it here");
                    found2 = true; 
                }
                else{
                    i2 = i2 + 1;
                }
            }
        }

        const sj = JSON.stringify(j);
        //save it back
        fs.writeFile('People.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });       

        res.json({"here":"here"});
        
            
    })

});

router.post('/search', (req,res) => {
    console.log("made it here?")
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);
        let matches;
        console.log(req.body.interests);
        if(req.body.interests.length>0){

        
        
            
            //define function that looks in master tree for node. 
            matches = [];
            const searchTree = (parentTree, childTree) => {
                
                let found1= false; 
                let i2 = 1; 
                while(i2 < parentTree.length && !found1){
                    if(parentTree[i2][0] === childTree[0]){
                        if(childTree.length>1 && parentTree.length>1){
                            searchTree(parentTree[i2], childTree[1]);
                        }else{
                            found1 = true; 
                            matches.push(j.people[i]);
                        }
                    }
                    i2 = i2+1; 
                }

            }


            //iterate through profiles based on interests
            console.log(req.body.interests,"body interests");
            let i = 0; 
            while((i<j.people.length)){
                
                
                
                searchTree(j.people[i].interests[0], req.body.interests[0][1]);


                
                i = i + 1;
            }
        }else{
            matches = j.people;
        }

        
            let matches2 = []    
            //gender check
            if((req.body.sex === "male") || (req.body.sex === "female") ){

            
                
                let i3 = 0; 
                while((i3<matches.length)){
                    
                    if(matches[i3].hasOwnProperty('sex')){
                        if(matches[i3]["sex"] === req.body.sex){
                            matches2.push(matches[i3].name);
                        }
                    }
                    
                    


                    
                    i3 = i3 + 1;
                }
            }else{
                for(let i4 = 0; i4 < matches.length; i4++){
                    matches2.push(matches[i4].name);
                }
            }
        
        
        //save and write
        console.log(matches2, "matches");
        res.json(matches2);
        let currentUserId = req.body.currentUserId; 
        console.log("current user id: ", currentUserId);
        j.people[currentUserId]["queries"].push({name:req.body.queryName, results: matches2});
        const sj = JSON.stringify(j);
         //save it back
        fs.writeFile('People.txt', sj, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('saved!');
        });       
        
    })


});
//search by name, return id
router.post('/searchByName', (req,res) => {
    console.log('its here');
    fs.readFile("People.txt", (err,data) => {
        //search for the person by name
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);
        console.log("body name", req.body.name)
        let id; 
        let i = 0; 
        let found = false; 
        while((i<j.people.length && !found)){
            console.log(j.people[i].name);
            if(j.people[i].name === req.body.name){
                id = j.people[i].id
                found = true; 
            }else{
                i = i + 1;
            }
            
            
        }
        if(!found){
            id = j.people.length
            j.people.push({"name": req.body.name, "id": j.people.length, interests:[["Interests"]]})
            
            const sj = JSON.stringify(j);
                //save it back
                fs.writeFile('people.txt', sj, (err) => {  
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('saved!');
                });
        }

        fs.readFile("logins.txt", (err,data) => {
            if (err) {
                return console.error(err);
            }
            const str = data.toString();
            const k = JSON.parse(str);
            let i2 = 0; 
            let found2 = false; 
            console.log(k.length);
            while((i2<k.length && !found2)){
                console.log(k[i2].email);
                if(k[i2].email === req.body.email){
                    
                    found2 = true; 
                }else{
                    i2 = i2 + 1;
                }
                
                
            }
            k[i2]["id"] = id;
            

            const sj = JSON.stringify(k);
                //save it back
                fs.writeFile('logins.txt', sj, (err) => {  
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('saved!');
                });
        })
        
        res.json({id:id, existed: found});
    })

});



//adds the new interests to current tree, i think currently it is only able to add a single node at at time. 
router.post('/update', (req,res) => {

    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);

        
        //search to find the person
        let found = false; 
        let i = 0; 
        while(!found && i<j.people.length){
            //console.log(j.people[i].name, j.people[i].interests,"name from request", req.body.interests, "end");

            //search to find the person
            console.log(j.people[i].name, req.body.name);
            if(j.people[i].name === req.body.name){
                console.log("match");
                found = true; 
                if(!j.people[i].hasOwnProperty("age")){
                    j.people[i].age = req.body.age; 
                }
                if(!j.people[i].hasOwnProperty("sex")){
                    j.people[i].sex = req.body.sex;
                }
                if(!j.people[i].hasOwnProperty("city")){
                    j.people[i].city = req.body.city;
                }
                if(!j.people[i].hasOwnProperty("state")){
                    j.people[i].state = req.body.state; 
                }
                
                 
                
                
                
                j.people[i].queries = [];
                //define the mergetree function
                if(req.body.interests.length>0){

                
                    const mergeTrees = (parentTree, childTree) => {

                        
                        
                        
                        
                        console.log("childtree length", childTree.length);
                        //for each child at the current level of child tree
                        for(let i2 = 1; i2 < childTree.length; i2++){
                            let found = false; 
                            let i = 1; 
                            let searchedAllChildren = false; 
                            let atTheEnd = false; 
                            console.log(parentTree, childTree);
                            //check if at the end of a tree
                            if(childTree[1] === undefined || parentTree[i] === undefined){
                                atTheEnd = true; 
                                
                            }
                            console.log(childTree[i2][0], "child 1 0");
                            //search children of parent tree at that level
                            while(!found && !searchedAllChildren && !atTheEnd){
                                
                                //check for a match 
                                if(childTree[i2][0] === parentTree[i][0]){
                                    found = true; 
                                }
                                //conditional iteration
                                if((parentTree.length != 1)&&(i != (parentTree.length-1))&&(!found)){
                                    i = i + 1; 
                                }else{
                                    searchedAllChildren = true; 
                                }
                
                            }
                            if((atTheEnd)&&(childTree[0]==parentTree[0])){
                                parentTree.push(childTree[i2]);
                            }else{
                                if(found){
                                    //if there was a match, then send the next layer of both trees down
                                    mergeTrees(parentTree[i],childTree[i2]);
                                }else{//otherwise append the childtree node onto the parent tree
                                        /*for(let k = 1; k < childTree.length; k++){
                                            parentTree.push(childTree[k]);
                                        }*/
                                        parentTree.push(childTree[i2]);
                                        
                                    
                                    
                                }        
                            }
                        }
                    }
                    
                    //if interest tree is blank then push the child tree
                    if(j.people[i].interests === undefined){
                        j.people[i].interests.push(req.body.interests[0]);
                    }else{//otherwise merge the trees
                        mergeTrees(j.people[i].interests[0],req.body.interests[0])
                        
                    }

                }

                let finalId = j.people[i].id;

                const sj = JSON.stringify(j);
                //save it back
                fs.writeFile('People.txt', sj, (err) => {  
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('saved!');
                });
                console.log(finalId, "finid");
                res.json(finalId);
            }
            i = i + 1; 
            

        }
        

        
    })

});


// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  public

router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
        .populate('user','name')
        .then(profile => {
            if(!profile){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    get profile by user id
// @access  public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user','name')
        .then(profile => {
            if(!profile){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   POST api/profile
// @desc    create or edit user profile
// @access  private
router.post(
    '/', 
    //passport.authenticate('jwt', {session: false}), 
    (req, res) => {

        const {errors, isValid} = validateProfileInput(req.body);

        //check validation

        if(!isValid){
            //return errors
            return res.status(400).json(errors);

        }
        //get fields
        const profileFields = {};
        
        if(req.body.name) profileFields.name = req.body.name;
        if(req.body.sex) profileFields.sex = req.body.sex;
        if(req.body.age) profileFields.age = req.body.age;
        if(req.body.city) profileFields.city = req.body.city;
        if(req.body.state) profileFields.state = req.body.state;
        //skills split into array
        if(typeof req.body.interests !== 'undefined'){
            profileFields.interests = req.body.interests.split(',');
        }

        
        profile.findOne({ name: req.body.name})
            .then(profile => {
                if(profile){
                    //update
                    Profile.findOneAndUpdate(
                        { name: req.user.name}, 
                        { $set: profileFields},
                        { new: true}
                    )
                    .then(profile => res.json(profile));
                }else{
                    //create

                    

                    new Profile(profileFields).save().then(profile => res.json(profile));
                        
                         
                }
            })
    }
    
);



// @route   POST api/profile/txt
// @desc    create or edit user profile
// @access  private
router.post(
    '/txt', 
    //passport.authenticate('jwt', {session: false}), 
    (req, res) => {

        
        //get fields
        const profileFields = {};
        
        if(req.body.name) profileFields.name = req.body.name;
        if(req.body.sex) profileFields.sex = req.body.sex;
        if(req.body.age) profileFields.age = req.body.age;
        if(req.body.city) profileFields.city = req.body.city;
        if(req.body.state) profileFields.state = req.body.state;
        if(req.body.interests) profileFields.interests = req.body.interests; 
        
        fs.readFile("People.txt", (err,data) => {
            if (err) {
                return console.error(err);
            }
            const str = data.toString();
            const j = JSON.parse(str);
            profileFields.id = j.people.length; 
            j.people.push(profileFields);
            const sj = JSON.stringify(j);

            fs.writeFile('People.txt', sj, (err) => {  
                // throws an error, you could also catch it here
                if (err) throw err;
            
                // success case, the file was saved
                console.log('saved!');
            });
        })
        res.json(profileFields.id);

    }
    
);

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  private

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body);
    

    if(!isValid){
        //return errors
        return res.status(400).json(errors);

    }

    Profile.findOne({ user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location

            }

            //add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })
});


// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), 
    (req, res) => {
    
    

    

    Profile.findOne({ user: req.user.id})
        .then(profile => {
            //get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);

            //splice out of array
            profile.experience.splice(removeIndex, 1);

            //save
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});


// @route   DELETE api/profile/
// @desc    delete profile
// @access  private

router.delete('/', passport.authenticate('jwt', {session: false}), 
    (req, res) => {
    
    
    Profile.findOneAndRemove({ user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => {
                    res.json({success: true})
                })
        })
        
});

module.exports = router;