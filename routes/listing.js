const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingsController= require("../controllers/listings.js");

///INDEX ROUTE
router.get("/", wrapAsync (listingsController.index));

///NEW ROUTE
router.get("/new", isLoggedIn, listingsController.renderNewForm);


///SHOW ROUTE
router.get("/:id",  wrapAsync ( listingsController.showListing));

///CREATE NEW ROUTE
router.post("/", isLoggedIn,validateListing,
  wrapAsync(listingsController.createNewListing)
);

///edit ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync (listingsController.renderEditForm)); 

///update ROUTE
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync (listingsController.updateListing));

///delete ROUTE
router.delete("/:id", isLoggedIn,isOwner,wrapAsync ( listingsController.deleteListing));


module.exports= router;