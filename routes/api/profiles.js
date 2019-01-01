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

router.post('/search', (req,res) => {

    fs.readFile("People.txt", (err,data) => {
        if (err) {
            return console.error(err);
        }
        const str = data.toString();
        const j = JSON.parse(str);
        console.log(req.body.interests[0][1][1], "routeInterests");
        console.log(j.people[0].interests);
        res.json(j);
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