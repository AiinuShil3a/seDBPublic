const Restaurant = require("../models/restaurant.model");
//Insert Data
Restaurant.createRestaurant = async(newRestaurant)=>{
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("create restaurant" , createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err",err);
        throw err;
    }
}

Restaurant.updateRestaurant = async (restaurantId, newRestaurant) => {
  try {
    const updatedRestaurant = await Restaurant.update(
      newRestaurant,
      { where: { id: restaurantId } }
    );
    return updatedRestaurant;
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};


Restaurant.getAll = async() => {
  console.log("HelloPass1");
  try {
    const restaurants = await Restaurant.findAll();
    console.log("ShowAll restaurant");
    return restaurants.map(restaurant => restaurant.toJSON())
  } catch (error) {
      console.log("err", error);
      throw error;
  }
};

Restaurant.getOne = async (restaurantId) => {
  try {
    const searchByID = await Restaurant.findOne( //Or Restaurant.ByPk
      { where: { id: restaurantId } }
    );
    return searchByID.toJSON();
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

Restaurant.Delete = async (restaurantId) => {
  try {
    const DestroyMenu = await Restaurant.destroy(
      { where: { id: restaurantId } }
    );
    if(DestroyMenu === 0){
      throw{kind : "not_found"}
    }
    return DestroyMenu;
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};
  


module.exports = Restaurant;