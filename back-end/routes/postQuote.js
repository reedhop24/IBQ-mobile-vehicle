const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Model = require('../models/model');
require('dotenv/config')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}))

router.post('/getQuote', async (req, res) => {
    try {
        const post = await Model
            .find({quoteNumber: req.body.quoteNumber})
            .cache({quoteNumber: req.body.quoteNumber});
        res.json(post);
        
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;