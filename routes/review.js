const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedin,
  isreviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
//Reviews

router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete review route

router.delete(
  "/:reviewId",
  isLoggedin,
  isreviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
