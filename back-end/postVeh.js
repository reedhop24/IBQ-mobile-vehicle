const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Model = require('./model');
require('dotenv/config')
router.use(bodyParser.json());

router.post('/postQuote', async(req, res) => {
    try {
        // Overwrite values in DB with values from request
        const newValues = {$set: {quoteNumber: req.body.quoteNumber, vehArr: req.body.vehObj}}
        Model.updateOne({quoteNumber: req.body.quoteNumber}, newValues, function(err, res) {
            if(err) console.log(err);
        })
        res.json({msg: "DB updated"});
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;