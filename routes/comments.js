var express = require("express");
var router  = express.Router({mergeParams: true});
var Event = require("../models/event");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Event.findById(req.params.id, function(err, event){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {event: event});
        }
    })
});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
   //lookup campground using ID
   Event.findById(req.params.id, function(err, event){
       if(err){
           console.log(err);
           res.redirect("/events");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               event.comments.push(comment);
               event.save();
               console.log(comment);
               res.redirect('/events/' + event._id);
           }
        });
       }
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