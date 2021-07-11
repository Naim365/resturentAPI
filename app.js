//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Mongoose Connection with database

 mongoose.connect("mongodb://localhost:27017/resturentDB", {useNewUrlParser: true, useUnifiedTopology: true} );



//Create Model and schma

const categorySchma = {

    ObjectId : Object,
    category_id : String,
    category_name : String,
    dish : Array
};

const Category = mongoose.model("Category", categorySchma);

//Request targeting all categories

app.route("/categories")

.get(function(req, res){  
    Category.find(function(err, foundCategories){  //Database Read
      if (!err){                                // Err check
      res.send(foundCategories);
       } else {
         res.send(err);
       }
  
    });
  })
  
  .post(function(req,res){
 
    const newCategories = new Category({

    ObjectId: req.body.ObjectId,
    category_id: req.body.category_id,
    category_name: req.body.category_name,
    dish: req.body.dish

    });
 
    newCategories.save(function(err){

        if(!err){
            res.send("Successfully added a new category.");
        } else {
            res.send(err);
        }

    });   //See robo3T new collection insert

    })

    .delete(function(req, res){

     Category.deleteMany(function(err){
            if (!err){
                res.send("Successfully deleted all categories");
            } else {
                res.send(err);
            }
        });
    });

  // Request Targeting a specific article
  
    app.route("/categories/:categoryName")

    .get(function(req, res){

        Category.findOne({category_name: req.params.categoryName}, function(err, foundCategorie){  //Singular one document

            if (foundCategorie) {
                res.send(foundCategorie)
            } else {
                res.send("No cateogory name matching that category was found.")
            }
        });
    })
    

    .put(function(req, res){

        Category.update(

            {category_name: req.params.categoryName},
            {category_name: req.body.category_name, dish: req.body.dish},
            {overwrite: true},
            function(err){
                res.send("Successfully updated category name.");
            }
        )
    })

    .patch(function(req, res){

        Category.update(
            {category_name: req.params.categoryName},
            {$set: req.body},
            function(err){
                if(!err){
                    res.send("Successfully updated category name.");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .delete(function(req, res){

        Category.deleteOne(
            {category_name: req.params.categoryName},
            function(err){
                if(!err){
                    res.send("Successfully deleted the category.")
                } else{
                    res.send(err);
                }
            }
        );
    });

    app.listen(3000, function() {
    console.log("Server started on port 3000");
    });

    

// Get ALL Category remove multiple line repeting app.get using express route

//Using Express Route Handelar

// app.get("/categories", function(req, res){  
//   Category.find(function(err, foundCategories){  //Database Read
//     if (!err){                                // Err check
//     res.send(foundCategories);
//      } else {
//        res.send(err);
//      }

//   });
// });

// app.post("/categories", function(req,res){
 
//     const newCategories = new Category({

//     ObjectId: req.body.ObjectId,
//     category_id: req.body.category_id,
//     category_name: req.body.category_name,
//     dish: req.body.dish

// // console.log(req.body.ObjectId);
//     // console.log(req.body.category_id);
//     // console.log(req.body.category_name);
//     // console.log(req.body.dish);

//     });
 
//     newCategories.save(function(err){

//         if(!err){
//             res.send("Successfully added a new category.");
//         } else {
//             res.send(err);
//         }

//     });   //See robo3T new collection insert

// });



//    app.delete("/categories", function(req, res){
//        Category.deleteMany(function(err){
//            if (!err){
//                res.send("Successfully deleted all categories");
//            } else {
//                res.send(err);
//            }
//        });
//    });
