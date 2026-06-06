const Reviews = require('../models/reviewsModel');
const asyncHaddler = require('../utils/asyncHaddler');

// get all reviews
const getAllReviews = asyncHaddler(async (req,res) => {
    const getAllReviews = res.status(200).json({success: true, messaage: 'Get all rewiews!'})
    console.log(getAllReviews)
})

module.exports = getAllReviews;