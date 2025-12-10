const express=require("express");
const app=express();
const mongoose=require ("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to our mongo StaySphere database");
}).catch((err)=>{
    console.log(err);
});

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.send("this is home root");
}); 
///INDEX ROUTE
app.get("/listings", async (req,res) =>{
  const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings})
});

///NEW ROUTE
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs"); 
});


///create ROUTE
app.post("/listings", async (req,res)=>{
     const newlisting= new Listing(req.body.listing);
     await newlisting.save();
        res.redirect("/listings");
 console.log(listing);
});

///SHOW ROUTE
app.get("/listings/:id", async (req,res)=>{
     let {id}= req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

///edit ROUTE
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}= req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

///update ROUTE
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
});

///delete ROUTE
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
  let deletedListing=  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});
// app.get("/testListing", async (req,res)=>{
//  let sampleListing=new Listing({
//     title: "my new villa",
//     description:"by the beach",
//     price:1200,
//     location:"goa",
//     country:"india",
// });
 
//     await sampleListing.save();
//     console.log("sample listing saved");
//     res.send("sample listing created");
// });


app.listen(8080,()=>{
    console.log("server is running on port 8080");
});