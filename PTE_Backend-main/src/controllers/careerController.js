const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Career = require("../models/career");

/* update career growth*/
module.exports.updateCareer =async function  (req, res, next) {
    try {
        const career = await Career.findByIdAndUpdate(
            req.params.id,
            { 
                status:  req.body.status, 
                devLevel : req.body.devLevel,
                feedBack : req.body.feedBack,
                files : req.body.files
            },
            {
                new: true
            })
            res.status(200).json(career);
            console.log(career);

        }catch (err) {
            res.status(500).json(err.message);
        }
    }

    //get all careers
    module.exports.getCareers =async function  (req, res, next) {
        try {
            const careers = await Career.find({})
               
                res.status(200).json(careers);
                console.log(careers);
    
            }catch (err) {
                res.status(500).json(err.message);
            }
    
    }

    //get career by user
    module.exports.getUserCareer =async function  (req, res, next) {
        const userId = req.params.id
        if(!ObjectId.isValid(userId)){
            return res.status(400).json("Invalid User ID")
        }
        try{
            const userCareer = await Career.find({ 
                user : userId
            })
            
            return res.status(200).json(userCareer);
        }catch (err) {
            res.status(500).json(err.message);
        }
    }

    

   