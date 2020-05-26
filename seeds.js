var mongoose = require("mongoose");
var Event = require("./models/event");
var Comment   = require("./models/comment");

function seedDB(){
   //Remove all events
   Event.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed events!");
         //add a few events
        data.forEach(function(seed){
            Event.create(seed, function(err, event){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a event");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                event.comments.push(comment);
                                event.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;