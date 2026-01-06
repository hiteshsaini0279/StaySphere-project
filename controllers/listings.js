const Listing= require ("../models/listing");






module.exports.index= async (req,res) =>{
  const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings})
};


module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs"); 
};

module.exports.showListing= async (req,res)=>{
     let {id}= req.params;
    const listing =await Listing.findById(id).populate({path:"reviews",populate:{
    path: "author"},
  }).populate("owner");
    if(!listing){
       req.flash("error", " This Listing does not exist!!");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createNewListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);

    // ✅ owner (safe)
    newListing.owner = req.user._id;

    // ✅ image (CRITICAL FIX)
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      req.flash("error", "Image upload failed. Please try again.");
      return res.redirect("/listings/new");
    }

    await newListing.save();

    console.log("New Listing saved:", newListing);
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while creating listing");
    res.redirect("/listings");
  }
};


  module.exports.renderEditForm= async (req,res)=>{
      let {id}= req.params;
      const listing =await Listing.findById(id);
      if(!listing){
         req.flash("error", " This Listing does not exist!!");
         res.redirect("/listings");
      }
      res.render("listings/edit.ejs", {listing});
  };

  module.exports.updateListing= async (req, res) => {
      let { id } = req.params;
       await Listing.findByIdAndUpdate(id, req.body.listing);
        req.flash("success", " Listing updated!!");
      res.redirect(`/listings/${id}`);
  };
  module.exports.deleteListing=  async (req, res) => {
      let { id } = req.params;
    let deletedListing=  await Listing.findByIdAndDelete(id);
      req.flash("success", "Listing deleted!!");
    console.log(deletedListing);
    res.redirect("/listings");
  };