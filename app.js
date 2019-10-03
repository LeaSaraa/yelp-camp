var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create(
// {
//   name: "Salmon Creek",
//   image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?cs=srgb&dl=adventure-camping-feet-6757.jpg&fm=jpg",
//   description: "This is a perfect place for those who love to go fishing"
// },
//   function(err, campground){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Newly created campground: ");
//     console.log(campground);
//   }
// });

app.get("/", function(req, res){
  res.render("landing");
});


//INDEX routes - show all campgrounds
app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
    }
  });
});

//CREATE routes - add new data to Database
app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description}
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/show", {campgrounds: foundCampground});
    }
  });
});

// ==============
// COMMENT ROUTES
// ==============

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post(".campgrounds/:id/comments", function(req, res){
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


app.listen(3000, function() {
  console.log('Server listening on port 3000');
})

