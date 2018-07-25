//===================//
   // REQUIRE
//===================//

var express                     =require("express");
var app=express();
var request                     = require("request");
var bodyParser                  =require("body-parser");
var Campground                  =require("./models/campground.js"); // THIS IS A CAMPGROUND MODEL RETURNED BY OTHER FILE(CONTAINING SCHEMA AND MODEL) 
var seedDB                      =require("./seeds.js");
var Comment                     =require("./models/comment.js")
var passport                    =require("passport");
var localStrategy               =require("passport-local");
var expressSession              =require("express-session");
var passportLocalMongoose       =require("passport-local-mongoose");
var User                        =require("./models/user.js");
var methodOverride              =require("method-override");
app.use(methodOverride("_method"));
var flash                       = require("connect-flash");
app.use(flash());

// requiring routes
var indexRoutes=require("./routes/index");
var campgroundRoutes=require("./routes/campground");
var commentRoutes=require("./routes/comment");

// seedDB();

//==================//
// PASSPORT CONFIG
//====================//


app.use(expressSession({
    secret:"this is my campground app",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());  //passport setup
app.use(passport.session());     //passport setup
passport.use(new localStrategy(User.authenticate())); // telling passport to use local strategy for login
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE THAT IS RUN FOR EVERY ROUTE
// for passing info about currentUser to every template
// for passing error(if any) and success(if any)  message to every template 
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});




//======================//
// mongoose setup
//=====================//

 var mongoose=require("mongoose");
 mongoose.connect("mongodb://localhost/yelp_camp"); // connect to the mongo server and create/use the yelp_camp db
// seedDB();// removes all campgrounds and add 3 new ones
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));


// ================//
//  USING ROUTES
//================//
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



// start the server
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp has Started");
});