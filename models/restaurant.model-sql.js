const sql = require("./db-sql.js");
// Constucter ผู้สร้าง
const Restaurant = function (restaurant){
    //Atrributes
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.Img = restaurant.Img;
};

//Methods
Restaurant.create = (newRestaurant, result) => {
    //INSERT INTO NAMETABLE SET NAME , TYPE , IMG VALUE ("Test1" , "Test2" , "Test3");
    sql.query("INSERT INTO restaurants SET ?", newRestaurant,(err,res) =>{
        //CHEACK ERROR
        if(err){
            console.log("err" , err);
            result(err, null);
            return;
        };
        //NO ERROR
        console.log("new restaurant created");
        result(null,{id : res.id, ...newRestaurant})
    });
};

//Get all restaurant
Restaurant.getAll = (result) => {
    // Select * FROM restaurants
    sql.query("Select * FROM restaurants" ,(err, res)=>{
    //CHEACK ERROR
        if(err){
            console.log("err" , err);
            result(err, null);
            return;
        };
        //NO ERROR
        console.log("See MENU");
        result(null,res)
    });
};

Restaurant.getById = (restaurantId, result) =>  {
    
    // Select * FROM restaurants where id = restaurantID
    sql.query(`Select * FROM restaurants WHERE id = ${restaurantId}  ` , 
    (err,res) => {
        //Have ERROR
        if(err){
            console.log("err" , err);
            result(err, null);
            console.log("1")
            return;
        }
        //NO ERROR
        if(res.length){
            console.log("get restaurant ByID");
            result(null,res[0])
            console.log("2")
            return;
        }
            //Not found
            console.log("3")
            result({kind : "not_found"} , null);
    
        });
    }

    //Update
Restaurant.updaraById = (id , restaurant,result) => {
    // Update restaurants SET name = "name" , type ="type" , Img = "Img" WHERE id = "id"
    sql.query("Update restaurants SET name = ? , type =? , Img = ? WHERE id = ?",
    [
    restaurant.name,
    restaurant.type,
    restaurant.Img,
    id
    ],(err,res) => {
        if(err){
            result(err, null)
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"} ,null)
            return;
        }
        result(null,{id:id, ...restaurant});
    }
    )
}

//Delete
Restaurant.deleteById = (restaurantId, result) =>{
    //DELETE FROM restaurants WHERE id = 6
    sql.query("DELETE FROM restaurants WHERE id = ?",restaurantId,(err,res) =>{
        if(err){
            result(err, null)
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"} ,null)
            return;
        }
        console.log("Delete Ready")
        result(null,res);
    })
    
}

module.exports = Restaurant;