const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const { listingSchema } = require("../schema.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listings.js");

router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

// create route
router.post(
  "/",
  isLoggedin,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));
// Edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// update route
router.put(
  "/:id",
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.updateListing)
);

// DELETE ROUTE

router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
