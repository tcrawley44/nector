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




// old get all from mongo
/* router.get('/all', (req,res) => {
    const errors = {};
    Profile.find()
    .populate('user','name')
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'there are no profiles'
            return res.status(404).json();
        }

        res.json(profiles);
    
    })
    .catch(err =>
        res.status(404).json({profile: 'there are no profiles'})    
    )

}); */

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

router.post('/search', (req,res) => {
    console.log("made it here?")
    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);
        let matches = [];
         
        let i = 0; 
        while((i<j.people.length)){
            if(j.people[i].interests[0].length > 1){
                if(j.people[i].interests[0][1][0]===req.body.interests[0][1][0]){
                
                    matches.push(j.people[i].name);
                }
            }
            
            i = i + 1;
        }
        

        console.log(matches);
        res.json(matches);
    })

});

router.post('/update', (req,res) => {

    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);

        
        
        let found = false; 
        let i = 0; 
        while(!found){
            console.log("name from database", j.people[i].interests,"name from request", req.body.interests, "end");
            if(j.people[i].name === req.body.name){
                console.log("found");
                found = true; 
                console.log(j.people[i].interests[0][1]);
                //j.people[i].interests[0]  parent, req.body.interests[0] child
                const mergeTrees = (parentTree, childTree) => {
                    let found = false; 
                    let searchedAllChildren = false; 
                    let i = 1; 
                    let atTheEnd = false; 
                    console.log(childTree, parentTree);
                    if(childTree[1] === undefined || parentTree[i] === undefined){
                        atTheEnd = true; 
                        console.log("true");
                    }
                    while(!found && !searchedAllChildren && !atTheEnd){
                        console.log("childtree", childTree[1][0], "parenttree", parentTree[i][0])
                        console.log("makes it here?")
                        if(childTree[1][0] === parentTree[i][0]){
                            found = true; 
                        }
                        if((parentTree.length != 1)&&(i != (parentTree.length-1))&&(!found)){
                            i = i + 1; 
                        }else{
                            searchedAllChildren = true; 
                        }
        
                    }
                    console.log("makes it here2?")
                    if(found){
                        console.log("i",i);
                        mergeTrees(parentTree[i],childTree[1]);
                    }else{
                        
                            parentTree.push(childTree[1]);
                        
                        
                    }
                }
                //console.log("child being sent: ", dataFromChild)
                if(j.people[i].interests === undefined){
                    j.people[i].interests.push(req.body.interests[0]);
                }else{
                    mergeTrees(j.people[i].interests[0],req.body.interests[0])
                    //console.log(this.state.interests, "after mergeTree");
                }

                const sj = JSON.stringify(j);

                fs.writeFile('People.txt', sj, (err) => {  
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('saved!');
                });
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

            j.people.push(profileFields);
            const sj = JSON.stringify(j);

            fs.writeFile('People.txt', sj, (err) => {  
                // throws an error, you could also catch it here
                if (err) throw err;
            
                // success case, the file was saved
                console.log('saved!');
            });
        })
        

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