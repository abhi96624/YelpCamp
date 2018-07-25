var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var Comment= require("./models/comment.js");
// Remove all the campgrounds and fill the db with 3 campgrounds each having one post

var data=[
   {
        name: "Cloud's Rest", 
        image: "https://source.unsplash.com/y8Ngwq34_Ak",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
      {
        name: "Cloud's Rest", 
        image: "https://source.unsplash.com/EnCaUE4QNOw",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
      {
        name: "Cloud's Rest", 
        image: "https://source.unsplash.com/V7uP-XzqX18",        
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
        ];
function seedDB(){
Campground.remove({},function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else{  console.log("removed all campgrounds");
//         // till now all the campgrounds  are removed
//           // looping through the data array to create campground
//           data.forEach(function(campground){
//               Campground.create(campground,function(err,createdCampground){
//                   if(err)
//                   {
//                       console.log(err);
//                   }
                   
//                   else{   console.log("added a campground");
//                       // if a campground is created -> create a new comment and associate with this campground
//                           Comment.create({
//                                  text:"this is a great comment",
//                                  author:"camila cabello"
//                               }
//                           ,function(err,comment){
//                                 if(err)
//                                 {
//                                     console.log(err);
//                                 }
//                                 else{  
//                                     createdCampground.comments.push(comment);
//                                     createdCampground.save();
//                                     console.log("created new comment inside the campground");
//                                 }
//                           });
//                   }
//               });
//           });
//     }
    
 });
}

// RETURN THE SEEDDB function TO APPJS TO EXECUTE
module.exports=seedDB;