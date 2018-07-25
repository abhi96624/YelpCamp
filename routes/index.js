var express=require("express");
var router=express.Router();
var User=require("../models/user.js");
var passport=require("passport");

 //================//
   // HOME ROUTE
//=================/

router.get("/",function(req,res) {
   res.render("landing");
});





//====================//
// AUTH ROUTES
//====================//

// SIGNUP

// show signup/register form
router.get("/register",function(req,res){
    res.render("register");
});

// handle signup logic 
router.post("/register",function(req,res){
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
           
            return res.render("register",{error:err.message});// explicitly passing error in case of render else use flash and then
                                                               //redirect("/regiser")
        }
        
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to Yelp Camp"+ user.username + "!");
           res.redirect("/campgrounds");
       })
    });
});


//LOGIN

// show login form 
router.get("/login",function(req,res){
    res.render("login");
});

//handle login logic
// using middleware
router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

//LOGOUT
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully logged out");
    res.redirect("/campgrounds");
});



module.exports=router;

