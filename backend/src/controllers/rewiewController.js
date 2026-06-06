const Reviews = require('../models/reviewsModel');
const asyncHaddler = require('../utils/asyncHaddler');

// get all reviews
const getAllReviews = asyncHaddler(async (req,res) => {
    const getAllReviews = await Reviews.find({})
    res.status(200).json({success: true, data: getAllReviews})
})

//post reviews
const postReviews = asyncHaddler(async (req,res) => {
    req.body.userId = req.user._id
    const postReview = await Reviews.create(req.body)
    res.status(201).json({success: true, message: 'Review Created!', data: postReview})
})

module.exports = {
    getAllReviews,
    postReviews
};