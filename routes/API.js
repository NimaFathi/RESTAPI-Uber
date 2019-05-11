const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');

// get a list of drivers from the db
router.get('/drivers', function(req,res,next){

    Driver.find({}).then(function(drivers){
        console.log(drivers);
    });

    Driver.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ parseFloat(req.query.lng) , parseFloat(req.query.lat) ] },
             key: "geometry",
             distanceField: "dist.calculated"
          }
        }
     ]).then(function(drivers){
         res.send(drivers);
     });
});
// add a new driver to the db
router.post('/drivers', function(req,res,next){
    //var drvier = new Driver(req.body);
    //Driver.save();
    // we can use buttom line instead:
    Driver.create(req.body).then(function(driver){
        res.send(driver);
    }).catch(next);
    // we want to make sure that create method finished successfuly.   
});

// update a driver in the db 
router.put('/drivers/:id', function(req,res,next){
    Driver.findByIdAndUpdate({_id : req.params.id},req.body).then(function(){
        Driver.findOne({_id : req.params.id}).then(function(driver){
            res.send(driver);
        });
    });
});
// delete a driver from the db
router.delete('/drivers/:id', function(req,res,next){
    //console.log(req.params.id);
    Driver.findByIdAndRemove({_id: req.params.id}).then(function(driver){
        res.send(driver);
    });  
});

module.exports = router;