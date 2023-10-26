const express = require("express");
const router = express.Router();
const Restaurant = require("../controller/restaurant.controller");
const {authJWT} = require("../middleware");

//create a new Restaurant
// http://localhost:5000/RestaurantsShil3aiinu
router.post("/RestaurantShil3aiinu",[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  try {
    const newRestaurant = req.body;
    const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
    res.status(201).json(createRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Restaurant" });
  }
});

router.put("/RestaurantShil3aiinu/:id",[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  try {
    const restaurantId = Number.parseInt(req.params.id);
    const newRestaurant = req.body;

    const updateResult = await Restaurant.updateRestaurant(
      restaurantId,
      newRestaurant
    );
    if (updateResult[0] === 0) {
      return res.status(404).json({ error: "Restaurant not_found" });
    }
    res.status(201).json({ message: "Restaurant updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update restaurant" });
  }
});

router.get("/Restaurants", async (req, res) => {
  try {
    const ShowRestaurant = await Restaurant.getAll();
    res.status(201).json(ShowRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to Show Restaurant" });
  }
});

router.get("/Restaurants/:id",[authJWT.verifyToken], async (req, res) => {
  try {
    const restaurantId = Number.parseInt(req.params.id);

    const searchResult = await Restaurant.getOne(restaurantId);
    if (searchResult[0] === 0) {
      return res.status(404).json({ error: "Restaurant not_found" });
    }
    res.status(201).json(searchResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to Search restaurants" });
  }
});

router.delete("/RestaurantShil3aiinu/:id",[authJWT.verifyToken, authJWT.isAdmin], async (req, res) => {
  try {
    const restaurantId = Number.parseInt(req.params.id);

    const deleteIDResult = await Restaurant.Delete(restaurantId);

    res
      .status(201)
      .json({
        message: "Restaurant Delete successfully Menu NO." + restaurantId,
      });
  } catch (error) {
    if (error.kind === "not_found") {
      res.status(404).json({ error: "Restaurants is not_found" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Failed to Delete restaurants" });
    }
  }
});
module.exports = router;
