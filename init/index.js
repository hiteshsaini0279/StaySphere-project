const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");


const MONGO_URL="mongodb://127.0.0.1:27017/Staysphere";
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to our mongo Staysphere database");
}).catch((err)=>{
    console.log(err);
});

const initDB=async()=>{
    await Listing.deleteMany({});
     initData.data= initData.data.map((obj)=>({...obj,owner:"6952503d7a8af9c277863291",}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();