const express=require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");


///INDEX ROUTE
router.get("/", wrapAsync (  async (req,res) =>{
  const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings})
}));

///NEW ROUTE
router.get("/new", isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs"); 
});


///SHOW ROUTE
router.get("/:id",  wrapAsync ( async (req,res)=>{
     let {id}= req.params;
    const listing =await Listing.findById(id).populate({path:"reviews",populate:{
    path: "author"},
  }).populate("owner");
    if(!listing){
       req.flash("error", " This Listing does not exist!!");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));

///CREATE NEW ROUTE
router.post("/", isLoggedIn,validateListing,
  wrapAsync(async (req,res) => {
    const newListing = new Listing(req.body.listing); 
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success", "New listing created!!");
    console.log("New Listing saved:", newListing);
    res.redirect("/listings");
  })
);

///edit ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync ( async (req,res)=>{
    let {id}= req.params;
    const listing =await Listing.findById(id);
    if(!listing){
       req.flash("error", " This Listing does not exist!!");
       res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}));

///update ROUTE
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync ( async (req, res) => {
    let { id } = req.params;
     await Listing.findByIdAndUpdate(id, req.body.listing);
      req.flash("success", " Listing updated!!");
    res.redirect(`/listings/${id}`);
}));

///delete ROUTE
router.delete("/:id", isLoggedIn,isOwner,wrapAsync (  async (req, res) => {
    let { id } = req.params;
  let deletedListing=  await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!!");
  console.log(deletedListing);
  res.redirect("/listings");
}));


module.exports= router;