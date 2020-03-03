const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Model = require('./model');
require('dotenv/config')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}))

router.post('/getQuote', async(req, res) => {
    try {
        const post = await Model.find({quoteNumber: req.body.quoteNumber});
        if(post.length > 0) {
            res.json(post[0].vehArr);
        } else {
            res.json({error: "Quote not found"})
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;