var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleware=require("../middleware/index.js");

// ====================//
  //CAMPGROUND ROUTES
//=====================//

// INDEX (THAT CONTAINS ALL THE CAMPGROUNDS LIST)

router.get("/campgrounds",function(req,res){
      
        Campground.find({},function(err,allCampgrounds){
            if(err)
            {   req.flash("error","something went wrong");
                  res.redirect("back");
                //  console.log(err);
            }
            else{
            
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
            }
    });
});

// CREATE   (CREATES A NEW CAMPGROUND IN OUR DB)
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name= req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc= req.body.description;
    
    var author={
        id: req.user._id,
        username:req.user.username
        
    };
    var newCampground={name:name,price:price,image:image,description:desc,author:author};
    Campground.create(newCampground,function(err,addedcampground){
        if(err)
        {
            console.log(err);
        }
        
        else{
               req.flash("success","Successfully Added the Campground");
               res.redirect("/campgrounds");
        }
        
    });

});

//  NEW (CONTAINS FORM FOR CREATING A NEW CAMPGROUND,FORM LATER TRIGGERS CREATE ROUTE )

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});


// SHOW   (SHOWS THE DETAILED INFO ABOUT ONE PARTICULAR CAMPGROUND) TRIGGERED BY BUTTON HREF

router.get("/campgrounds/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err || !foundCampground)
      {
         req.flash("error","Unable to find Campground");
         res.redirect("back");
      }
      else{
          
          res.render("campgrounds/show",{showCampground:foundCampground});
      }
       
   });
   
});

// EDIT ROUTE FORM SHOW
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {   req.flash("error","Unable to find Campground");
            res.redirect("/campgrounds");
        }
        else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    });
});

//==============================//
// update n delete campground
//================================//

// UPDATE CAMPGROUND
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
     Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
         if(err || !updatedCampground)
         {   req.flash("Unable to find Campground");
             res.redirect("/campgrounds");
         }
         else{
             req.flash("success","Successfully Updated the Campground");
             res.redirect("/campgrounds/"+req.params.id);
         }
     });
});


//DELETE ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
           res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Successfully Deleted the Campground");
            res.redirect("/campgrounds");
        }
    });
});








module.exports=router;
