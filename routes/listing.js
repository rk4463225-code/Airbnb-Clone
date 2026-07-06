const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
// Yahan se validateListing aa raha hai
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); 

// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}));

// Baki routes niche...


// // INDEX
// router.get("/", wrapAsync(async (req, res) => {
//   const allListing = await Listing.find({});
//   res.render("listings/index.ejs", { allListing });
// }));

// NEW
router.get("/new", isLoggedIn, (req, res) => {
  // console.log(req.user);

  // if (!req.isAuthenticated()) {
  //   req.flash("error", "You must be logged in to create listing!");
  //   return res.redirect("/login");
  // }
  res.render("listings/new.ejs");
});


// SHOW (with reviews populate)
// router.get("/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;

//   const listing = await Listing.findById(id).populate("reviews").populate("owner");

//   if (!listing) {
//     throw new ExpressError(404, "Listing Not Found");
//   }

//   if(!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     res.redirect("/listings");
//   }
//   res.render("listings/show.ejs", { listing });
// }));


// router.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;

//     const listing = await Listing.findById(id)
//       .populate("reviews")
//       .populate("owner");

//     if (!listing) {
//       req.flash("error", "Listing you requested for does not exist!");
//       return res.redirect("/listings");
//     }

//     console.log(listing);

//     res.render("listings/show.ejs", { listing });
//   })
// );


// SHOW ROUTE (Corrected)
router.get(
  "/:id", // Yahan se /listings hata diya gaya hai
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/show.ejs", { listing });
  })
);



//  CREATE
router.post(
  "/", 
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    console.log(req.user);
    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
  })
);


// EDIT
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
}));

// UPDATE
router.put(
  "/:id", isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`); // Redirect to the updated listing's show page
  })
);


// DELETE
// router.delete("/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;

//   await Listing.findByIdAndDelete(id);

//   res.redirect("/listings");
// }));

router.delete(
  "/:id", isLoggedIn, isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);

    console.log(deletedListing);

    req.flash("success", "Listing Deleted successfully!");
    res.redirect("/listings");
  })
);

module.exports = router;