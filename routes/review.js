const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
// ✅ Models import correct
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");
// ================== VALIDATION ==================
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
};



// ================== CREATE REVIEW ==================
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }

    const newReview = new Review(req.body.review);
    await newReview.save();

    listing.reviews.push(newReview._id);
    await listing.save();

    console.log("✅ New review saved");


    req.flash("success", "New Review successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// ================== DELETE REVIEW ==================
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;