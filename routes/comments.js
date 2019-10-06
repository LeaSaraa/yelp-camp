var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment");


//comments new
router.get("/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//comments create
router.post("/", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      redirect("/campgrounds");
    } else{
      Comment.create(req.body.comments, function(err, comment){
        if(err){
          console.log(err);
        } else {
          campgrounds.comments.push(comment);
          campground.save();
          res.redirect("campground/" + campground._id );
        }
      });
    };
  });
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
