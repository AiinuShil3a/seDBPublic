const db = require("../models");
const ROLES = db.ROLES;
const user = db.user;

checkUserOrEmail = (req, res, next) => {
  // Check if username exists
  user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).send({ message: "Failed: Username is already in use" });
        return;
      }

      // Check if email exists
      user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((existingEmail) => {
          if (existingEmail) {
            res.status(400).send({ message: "Failed: Email is already in use" });
            return;
          }
          next();
        });
    });
};


checkROLES = (req, res, next) => {
    //add next
    // checkROLES
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({ message: "Failed isn't Roles" + req.body.roles[i] });
            }
        } 
    }
    next();
}

const verifySingUp = {
    checkUserOrEmail : checkUserOrEmail,
    checkROLES: checkROLES,
}

module.exports = verifySingUp