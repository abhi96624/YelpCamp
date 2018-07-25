var Campground= require("../models/campground.js");
var Comment  =require("../models/comment.js");

// All middleware goes here

var middlewareObj ={};

middlewareObj.isLoggedIn     =  function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged in to do that");
    res.redirect("/login");
}


middlewareObj.checkCampgroundOwnership   =  function(req,res,next){
    // check if user is logged in or not
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err || !foundCampground)
            {   req.flash("error","Unable to find the Campground");
                res.redirect("back");
            }
            else{
                // check if that campground belongs to that logged in user
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else{ req.flash("error","You don't have the permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{    req.flash("error","You need to be Logged in to do that");
        res.redirect("back");
    }
}



middlewareObj.checkCommentOwnership   =   function(req,res,next){
    // check if user is logged in or not
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err || !foundComment)
            {  req.flash("error","Unable to find the Comment");
                res.redirect("back");
            }
            else{
                // check if that comment belongs to that logged in user
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else{req.flash("error","You don't have the permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{req.flash("error","You need to be Logged in to do that");
        res.redirect("back");
    }
}



module.exports=middlewareObj;