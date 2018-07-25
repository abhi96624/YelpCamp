var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
var middleware=require("../middleware/index.js");


//===================//
 //  COMMENTS ROUTES
 
//==================//


// NEW (TO SHOW FORM TO CREATE NEW COMMENT)
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
           req.flash("error","unable to find Campground");
           res.redirect("back");
        }
        else{
             res.render("comments/new",{campground:foundCampground});
        }
    });
   
});

// CREATE ROUTE
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    // find campground
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
             req.flash("error","Unable to find Campground");
            res.redirect("/campgrounds");
        }
        else{   // create a comment and connect to campground
               Comment.create(req.body.comment,function(err,createdComment){
                   if(err)
                   {   req.flash("error","Something went wrong");
                       console.log(err);
                   }
                   else{   // Associating user with the comment before creating the comment
                           // add username and user id to the comments and then save
                           createdComment.author.id=req.user._id;
                           createdComment.author.username=req.user.username;
                           createdComment.save();
                          
                           // after done with comment creation push in campgrounds comment array and save
                         foundCampground.comments.push(createdComment);
                         foundCampground.save();
                         req.flash("success","Successfully Created the Comment");
                         res.redirect("/campgrounds/"+req.params.id);
                   }
               });
            
        }
    });
});


//==============================//
// update n delete comments

//================================//

// edit form for comment
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
             req.flash("error","unable to find Campground");
             res.redirect("back");
        }
        else{
              Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err)
                {  
                    res.redirect("back");
                }
                else{
                     res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});

        }
    });
        }
    });
  
});

// update comment
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err||!foundCampground)
        {
            req.flash("error","Unable to find Campground");
            res.redirect("back");
        }
        else{
             Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err || !updatedComment)
        {   req.flash("error","Unable to finde Comment");
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully Updated the Comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
        }
    });
   
});

// Delete comment
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err ||!foundCampground)
        {
            req.flash("unable to find Campground");
            res.redirect("back");
        }
        else{
              Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else{req.flash("success","Successfully Deleted the Comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
        }
    });
  
});




module.exports=router;
