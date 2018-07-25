//  CAMPGROUND MODEL

var mongoose =require("mongoose");


// create a Schema
var campgroundSchema= new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author:{
        id:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User"
        },
        username:String
        
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }]
});

// Model the Schema 

var Campground= mongoose.model("Campground",campgroundSchema);

// RETURN  MODEL FROM THIS FILE
module.exports=Campground;