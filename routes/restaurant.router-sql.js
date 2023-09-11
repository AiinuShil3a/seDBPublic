const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.model-sql.js");

//Insert restaurant to DB MySQL
router.post("/restaurants" , (req,res) => {
// http://localhost:5000/RestaurantsMenu
    //Create restaurant instance
    const newRestaurant = new Restaurant({
        name : req.body.name,
        type : req.body.type,
        Img  : req.body.Img,
    });
    //Insert to DB MySQL
    Restaurant.create(newRestaurant,(err , data) =>{
        if(err){
            res.status(500).send({
                message:err.message || "Some Error Insert"
            })
        }else{
            res.send(data);
        };
    });

});

//get all restaurant
router.get("/restaurants" ,(req,res) => {
    // http://localhost:5000/restaurants
    Restaurant.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:err.message || "Some Error Insert"
            })
        }else{
            res.send(data);
        };
    });
});

router.get("/restaurants/:id",(req,res) => {
    // http://localhost:5000/restaurants/3
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId,(err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message: "Not found ID" + restaurantId
                })
            }else{
                res.status(500).send({
                    message:err.message || "Error Search ID MENU Check ID ?"
                })
            }
        }else{
            res.send(data);
        };
    });
});

//Update
router.put("/restaurants/:id",(req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            message : "Empty!"
        })
    }
    Restaurant.updaraById(restaurantId,new Restaurant(req.body),(err,data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message: "Not found ID" + restaurantId
                })
            }else{
                res.status(500).send({
                    message:err.message || "Error Search ID MENU Check ID ?"
                })
            }
        }else{
            res.send(data);
        };
    })
})

//Delete
router.delete("/restaurants/:id",(req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.deleteById(restaurantId,(err,data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message: "Not found ID" + restaurantId
                })
            }else{
                res.status(500).send({
                    message:err.message || "Error Delete ID MENU Check ID ?"
                })
            }
        }else{
            res.send(data);
        };
    })
})

module.exports = router;