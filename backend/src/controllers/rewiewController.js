const NotFoundErrorHaddler = require('../errors/NotFoundErrorHaddler');
const Reviews = require('../models/reviewsModel');
const asyncHaddler = require('../utils/asyncHaddler');

// get all reviews
const getAllReviews = asyncHaddler(async (req,res) => {
    //get parem data
    const {productId,userId} = req.query

    //query selectore
    let querySelectore = {}

    // find reviews with product id
    if(productId){
        querySelectore.productId = productId
    }

    //find reviews with userId
    if(userId){
        querySelectore.userId = userId
    }

    //product paging
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit

    //fetch reviews in db
    const allReviews = await Reviews.find(querySelectore).skip(skip).limit(limit).sort({createdAt: -1})
    res.status(200).json({
        success: true,
        all_result: allReviews.length,
        data: allReviews,
        page: page,
    })
})

//post reviews
const postReviews = asyncHaddler(async (req,res) => {
    req.body.userId = req.user._id
    const postReview = await Reviews.create(req.body)
    res.status(201).json({success: true, message: 'Review Created!', data: postReview})
})

// delete review
const deleteReview = asyncHaddler( async (req,res) => {
    const reviewId = req.params.id
    const deleteOne = await Reviews.findOneAndDelete({_id: reviewId})

    if(!deleteOne){
        throw new NotFoundErrorHaddler('Product not found!');
    }
    res.status(200).json({success: true, message: 'Review Deleted!', data: deleteOne})
})

module.exports = {
    getAllReviews,
    postReviews,
    deleteReview
};