const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const URL = require("../models/shortURL");
const checkAuth = require("../middleware/chek-auth");

//Get URL's posted by particular user
router.get('',(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "longer_secret_key");
    const userid = decode.userId;
    User.findOne({ _id:userid }).populate("url").select('url')
    .then(results => {
        res.status(200).json(results);
    })
    .catch(function(err) {
        res.status(500).json({
            error:err
        });
    });
});

//To post URL of Authenticated Users
router.post('', (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "longer_secret_key");
    const userid = decode.userId;
    const url =new URL({
        full: req.body.fullURL
    });

    url.save()
    .then(result =>{

        return User.findOneAndUpdate({ _id: userid }, {$push:{url: result._id}} ,{new: true}).populate("url").select('url')
        .then(updatedUser => {
            res.status(201).json({
                message: 'URL Posted Successfully',
                result: updatedUser
            });
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

//To post URL of Unauthenticated Users. From Homepage
router.post('/unauth', (req, res, next) => {
    const url =new URL({
        full: req.body.fullURL
    });

    url.save()
    .then(result =>{
        res.status(201).json({
            url: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;