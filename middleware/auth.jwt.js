const { role } = require("../models");

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const{TokenExpiretionError} = jwt

const catesError = (err , res) => {
    if(err instanceof TokenExpiretionError){
        return res.status(401).send({ message: "Unauthorized Access Token"});
    }
    return res.status(401).send({ message: "Unauthorized"});
}

verifyToken = (req, res , next) => {
    let token = req.header['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: "Invalid Token"});
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if(err) {
            return catesError(err,res);
        }
        req.userId = decode.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    // select * from users where id = req.userId
    User.findByPk(req.userId).then(user => {
        // select * from Roles where userId = User_roles.userId and roleId = User_roles.roleId
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin roles"});
            return
        })
    })
}

isModerator = (req, res, next) => {
    // select * from users where id = req.userId
    User.findByPk(req.userId).then(user => {
        // select * from Roles where userId = User_roles.userId and roleId = User_roles.roleId
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "moderator"){
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator roles"});
            return
        })
    })
}

isUser = (req, res, next) => {
    // select * from users where id = req.userId
    User.findByPk(req.userId).then(user => {
        // select * from Roles where userId = User_roles.userId and roleId = User_roles.roleId
        user.getRoles().then((roles) => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "user"){
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require User roles"});
            return
        })
    })
}

isModeratorAdmin = (req, res, next) => {
    // SELECT * FROM user WHERE id = req.body.userId
    User.findByPk(req.userId).then((user) => {
        // SELECT * FROM role, user, user_roles WHERE  user.id = users_roles.userId and role.id = users_roles.roleId
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role" });
            return;
        });
    });
};

const authJWT = {
    verifyToken: verifyToken,
    isModerator: isModerator,
    isUser: isUser,
    isAdmin: isAdmin,
    isModeratorAdmin: this.isModeratorAdmin,
}

module.exports = authJWT;